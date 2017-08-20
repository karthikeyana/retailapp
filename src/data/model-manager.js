'use strict';

import { Config } from '../util/config';
import { Customer } from './customer-details';
import { Product } from './product-details';
import { 
	CUSTOMER_MODEL,
	PRODUCT_MODEL
} from './model-constants';

const mongoose = require('mongoose');

export class ModelManager {

	constructor() {
		this.models = {};
		mongoose.Promise = global.Promise;
		mongoose.connect(Config.mongoURL);
		this.db = mongoose.connection;
		this.db.on('error', console.error.bind(console, 'connection error:'));
		this.initModels();
	}

	initModels() {
		this.addModel(CUSTOMER_MODEL, Customer);
		this.addModel(PRODUCT_MODEL, Product);
	}

	addModel(name, schemaClass) {
		this.models[name] = mongoose.model(name, new schemaClass(this));
	}

	getModel(name) {
		return this.models[name];
	}
	
}

export const modelManager = new ModelManager();
