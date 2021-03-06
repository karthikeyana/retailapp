'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.modelManager = exports.ModelManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('../util/config');

var _customerDetails = require('./customer-details');

var _productDetails = require('./product-details');

var _modelConstants = require('./model-constants');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mongoose = require('mongoose');

var ModelManager = exports.ModelManager = function () {
	function ModelManager() {
		_classCallCheck(this, ModelManager);

		this.models = {};
		mongoose.Promise = global.Promise;
		mongoose.connect(_config.Config.mongoURL);
		this.db = mongoose.connection;
		this.db.on('error', console.error.bind(console, 'connection error:'));
		this.initModels();
	}

	_createClass(ModelManager, [{
		key: 'initModels',
		value: function initModels() {
			this.addModel(_modelConstants.CUSTOMER_MODEL, _customerDetails.Customer);
			this.addModel(_modelConstants.PRODUCT_MODEL, _productDetails.Product);
		}
	}, {
		key: 'addModel',
		value: function addModel(name, schemaClass) {
			this.models[name] = mongoose.model(name, new schemaClass(this));
		}
	}, {
		key: 'getModel',
		value: function getModel(name) {
			return this.models[name];
		}
	}]);

	return ModelManager;
}();

var modelManager = exports.modelManager = new ModelManager();