'use strict';

const mongoose = require('mongoose');

export class Customer extends mongoose.Schema {
	
	constructor(manager) {

		var order_details = {
				order_id: String,
				placed_on: Date,
				amount: Number,
				items: Number,
				item_id: Number
			}
		
		super({
			first_name: String,
			last_name: String,
			gender: String,
			date_of_birth: Date,
			mobile_number: Number,
			location: String,
			email_id: String,
			order: [order_details]
		});
	}
	
}
