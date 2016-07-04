'use strict'

const app = require('./app');
const request = require('request');
const cheerio = require('cheerio');

const spots = app.service('spots');
const forecasts = app.service('forecasts');

var rootURL = 'http://api.windfinder.com/v2/spots/',
    limit = '24' // 8 per days, default is 3 days

// Get a token
var token;

request('https://www.windfinder.com/forecast/renesse_brouwersdam', (err, res, body) => {
	let $ = cheerio.load(body),
		text = $('script:contains(API_TOKEN = )').text();

	token = text.split("'")[1];
	console.log('Windfinder token: ', token);

	spots.find()
		 .then(res => {
		 	res['data'].forEach(spot => {
		 		let forecastURL = `${rootURL}${spot.windfinder_id}/forecasts/?customer=wfweb&version=1.0&token=${token}&limit=${limit}`;
		 		
		 		console.log('Spot name + id: ', spot.name, spot.windfinder_id);
		 		console.log('Spot url: ', forecastURL);
		 		request(forecastURL, (err, res, body) => {
					if (!err && res.statusCode == 200) {
						let json = JSON.parse(body);
						json.forEach(forecast => {
							spot.createForecast({
								time: new Date(forecast.dtl),
								clouds: forecast.cl,
								temperature: forecast.at,
								wind_speed: forecast.ws,
								wind_direction: forecast.wd,
								wind_gusts: forecast.wg,
								waves_height: forecast.wah,
								waves_period: forecast.wap,
								waves_direction: forecast.wad
							});
						});
					}
		 		});
		 	});
		 });
});

