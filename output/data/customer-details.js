'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mongoose = require('mongoose');

var Customer = exports.Customer = function (_mongoose$Schema) {
	_inherits(Customer, _mongoose$Schema);

	function Customer(manager) {
		_classCallCheck(this, Customer);

		var order_details = {
			order_id: String,
			placed_on: Date,
			amount: Number,
			items: Number,
			item_id: Number
		};

		return _possibleConstructorReturn(this, (Customer.__proto__ || Object.getPrototypeOf(Customer)).call(this, {
			first_name: String,
			last_name: String,
			gender: String,
			date_of_birth: Date,
			mobile_number: Number,
			location: String,
			email_id: String,
			order: [order_details]
		}));
	}

	return Customer;
}(mongoose.Schema);