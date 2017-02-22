/*
 *		Fluxx Services Client Library
 *
 *				Tue  3 May 12:52:08 2016
 *
 */

// TODO: add error handling
// TODO: implement some aspects of filter handling inside methods
// TODO: add fetch and delete methods

/**
 *	Fluxx API client constructor
 */

function FluxxService(instance, clientId, clientSecret) {
	var _baseUrl = 'https://' + instance + '.fluxx.io/';

	// instance URL variables
	this.authUrl = _baseUrl + 'oauth/authorize';	// oauth 2.0 authorize url
	this.tokenUrl = _baseUrl + 'oauth/token';	// oauth 2.0 token url
	this.baseUrl = _baseUrl + 'api/rest/v1/';	// REST base url

	// identification parameters
	this.clientId = clientId;
	this.clientSecret = clientSecret;

	// mandatory request headers
	this.headers = {
		'Authorization': 'Bearer ' + this.refreshToken()
	};
}

FluxxService.prototype = {

	/**
	 *		refresh authentication token
	 */

	refreshToken : function() {
		var options = {
			'method': 'POST',
			'muteHttpExceptions': true,
			'payload': {
				'grant_type': 'client_credentials',
				'client_id': this.clientId,
				'client_secret': this.clientSecret
			}
		};
		var resp = UrlFetchApp.fetch(this.tokenUrl, options);
		var data = JSON.parse(resp.getContentText());
		return data.access_token;
	},


	/**
	 *		create fluxx object
	 */

	create : function(model, data) {
		var url = this.baseUrl + model;
		var options = {
			'method': 'POST',
			'headers': this.headers,
			'muteHttpExceptions': true,
			'payload': data
		}

		var resp = UrlFetchApp.fetch(model, options)
		return JSON.parse(resp.getContentText());
	},


	/**
	 *		list fluxx objects with optional filters
	 */

	list : function(model, data) {
		this.refreshToken();
		var options = {
			'method': 'GET',
			'headers': this.headers,
			'muteHttpExceptions': true
		};
		var url = this.baseUrl + model;

		if (typeof data !== 'undefined') {		// determine HTTP method
			options.method = 'POST';	
			options.payload = data;		// add payload if data parameter is present
			url = url + '/list';
		};

		var resp = UrlFetchApp.fetch(url, options)
		Logger.log(resp);
		var data = JSON.parse(resp.getContentText());
		return data.records[model]
	}
}
