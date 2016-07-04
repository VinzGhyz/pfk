'use strict';

const app = require('./app');
const scrapeIt = require("scrape-it");

const spots = app.service('spots');

scrapeIt("https://www.windfinder.com/forecast/renesse_brouwersdam", {
    title: ".page-main-headline",
  	current_wind: ".current__wind .current__wind__speed",
  	sunrise: "#sunrise",
  	sunset: "#sunset",
  	days: {
  		listItem: ".weathertable.forecast-day.forecast",
  		data: {
  			date: {
  				selector: ".weathertable__header",
  				convert: x => new Date(`${x} ${new Date().getFullYear()}`)
  			},
  			forecasts: {
  				listItem: ".weathertable__row",
  				data: {
  					time: ".data-time:not(.data-tidefreq)",
  					wind_direction: {
  						selector: ".data-direction-arrow.weathertable__cell .directionarrow",
  						attr: 'title',
  						convert: x => parseFloat(x)
  					},
  					wind_speed: {
  						selector: ".speed .units-ws",
  						convert: x => parseFloat(x)
  					},
  					wind_gusts: {
  						selector: ".data-gusts .units-ws",
  						convert: x => parseFloat(x)
  					},
  					rain: {
  						selector: ".data-rain .units-pr",
  						convert: x => parseFloat(x)
  					},
  					temp: {
  						selector: ".data-temp .units-at",
  						convert: x => parseFloat(x)
  					},
  					wave_height: {
  						selector: ".data-waveheight .units-wh",
  						convert: x => parseFloat(x)
  					},
  					wave_freq: {
  						selector: ".data-wavefreq",
  						convert: x => parseFloat(x)
  					},
  					tide_direction: {
  						selector: ".data-tidedirection div",
  						attr: "class",
  						convert: x => x.split('-').reverse()[0]
  					},
  					tide_freq: {
  						selector: ".data-tidefreq .value",
  						convert: x => parseFloat(x)
  					},
  					tide_height: {
  						selector: ".data-tideheight .units-wh",
  						convert: x => parseFloat(x)
  					}
  				}
  			}
  		}
  	}
}).then(page => {
    console.log(page);
    page['days'].forEach(day => {
    	day['forecasts'].forEach(forecast => {
    		console.log(forecast);
    	});
    });
});


console.log('Checking the data');