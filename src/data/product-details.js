'use strict';

const mongoose = require('mongoose');

export class Product extends mongoose.Schema {
	
	constructor() {
		super({
			product_name: String,
			color: String,
			type: String,
			size: String,
			qty: Number,
			code: Number
		});
	}
	
}