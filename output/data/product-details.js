'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mongoose = require('mongoose');

var Product = exports.Product = function (_mongoose$Schema) {
	_inherits(Product, _mongoose$Schema);

	function Product() {
		_classCallCheck(this, Product);

		return _possibleConstructorReturn(this, (Product.__proto__ || Object.getPrototypeOf(Product)).call(this, {
			product_name: String,
			color: String,
			type: String,
			size: String,
			qty: Number,
			code: Number
		}));
	}

	return Product;
}(mongoose.Schema);