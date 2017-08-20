'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.RetailApi = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _controller = require('../util/controller');

var _modelManager = require('../data/model-manager');

var _modelConstants = require('../data/model-constants');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var uuid = require('node-uuid');

var RetailApi = exports.RetailApi = function (_Controller) {
	_inherits(RetailApi, _Controller);

	function RetailApi() {
		_classCallCheck(this, RetailApi);

		return _possibleConstructorReturn(this, (RetailApi.__proto__ || Object.getPrototypeOf(RetailApi)).apply(this, arguments));
	}

	_createClass(RetailApi, [{
		key: 'namespace',
		value: function namespace() {
			return '/retail';
		}
	}, {
		key: 'routing',
		value: function routing() {
			return {
				'/create-customer': 'createCustomer',
				'/create-product': 'createProduct',
				'/place-order': 'placeOrder'
			};
		}
	}, {
		key: 'createCustomer',
		value: function createCustomer(req, res) {
			var args = req.body;
			return new this.CustomerModel(args).save().then(function (data) {
				return {
					message: 'customer created successfully'
				};
			});
		}
	}, {
		key: 'createProduct',
		value: function createProduct(req, res) {
			var args = req.body;
			return new this.ProductModel(args).save().then(function (data) {
				return {
					message: 'product created successfully'
				};
			});
		}
	}, {
		key: 'placeOrder',
		value: function placeOrder(req, res) {
			var args = req.body;
			args.order["order_id"] = uuid.v4();
			args.order["placed_on"] = new Date();
			return this.CustomerModel.findOne({ email_id: args.email_id }).exec().then(function (data) {
				data.order.push(args.order);
				return data.save().then(function (o) {
					var o_id = o.order.filter(function (d) {
						return d.order_id == args.order.order_id;
					})[0];
					return {
						result: { reference_id: o_id.order_id },
						message: "order placed successfully"
					};
				});
			});
		}
	}, {
		key: 'CustomerModel',
		get: function get() {
			return _modelManager.modelManager.getModel(_modelConstants.CUSTOMER_MODEL);
		}
	}, {
		key: 'ProductModel',
		get: function get() {
			return _modelManager.modelManager.getModel(_modelConstants.PRODUCT_MODEL);
		}
	}]);

	return RetailApi;
}(_controller.Controller);