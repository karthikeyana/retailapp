'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (app) {

	new _retailApi.RetailApi(app);
};

var _retailApi = require('./retail-api');