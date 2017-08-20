'use strict';

import { Controller } from '../util/controller';
import { modelManager } from '../data/model-manager';
import { 
	CUSTOMER_MODEL,
	PRODUCT_MODEL
} from '../data/model-constants';

const uuid = require('node-uuid');

export class RetailApi extends Controller {

	namespace() {
		return '/retail';
	}
	
	routing() {
		return {
			'/create-customer': 'createCustomer',
			'/create-product': 'createProduct',
			'/place-order': 'placeOrder'
		};
	}

	get CustomerModel() {
		return modelManager.getModel(CUSTOMER_MODEL);
	}

	get ProductModel() {
		return modelManager.getModel(PRODUCT_MODEL);
	}

	createCustomer(req, res) {
		let args = req.body;
		return new this.CustomerModel(args)
			.save()
			.then(data =>{
				return {
				message: 'customer created successfully'
			};
		});
	}

	createProduct(req, res) {
		let args = req.body;
		return new this.ProductModel(args)
			.save()
			.then(data =>{
				return {
				message: 'product created successfully'
			};
		});
	}

	placeOrder(req,res) {
		var args = req.body;
			args.order["order_id"] = uuid.v4();
			args.order["placed_on"] = new Date;
		return this.CustomerModel
			.findOne({ email_id: args.email_id })
			.exec()
			.then(data => {	
				data.order.push(args.order)
			return	data
					.save()
					.then(o => {
						var o_id = o.order.filter(d =>{ return d.order_id == args.order.order_id })[0]
						return  {
							result:{ reference_id :o_id.order_id},
							message: "order placed successfully"
						}
					})
				
			})
	}
}
