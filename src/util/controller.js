'use strict';

export class Controller {
	
	constructor(app) {
		
		var routing = this.routing();

		for (var r in routing) {
			let method = routing[r];
			
			app.get(this.namespace() + r, (req, res) => {
				this.callRoute(method, req, res);				
			});

			app.post(this.namespace() + r, (req, res) => {
				this.callRoute(method, req, res);
			});
		}
	}
	
	namespace() {
		return '';
	}

	callRoute(method, req, res) {
		var result;
		try {
			result = this[method](req, res);
		} catch(e) {
			console.error(e.message + '\n' + e.stack);
			this.applyResult(req, res, this.error(e));
			return;
		}
		
		if (result && typeof result.then == 'function') {
			result
				.then(data => this.applyResult(req, res, data))
				.catch(e => {
					console.error(typeof e == 'string' ? e : e.message + '\n' + e.stack);
					this.applyResult(req, res, this.error(e))
				});
			return;
		}
		
		this.applyResult(req, res, result);
	}
	
	applyResult(req, res, result) {
		var output;
		if (!result) {
			output = {
				success: false,
				message: 'Empty result',
				details: result,
				data: null
			};
		} else if (result.status == 'ERROR') {
			output = {
				success: false,
				message: result.message,
				details: result,
				data: null
			};
		} else {
			output = {
				success: true,
				message: result.message,
				data: result.result
			};
		}
		
		res.setHeader('Content-Type', 'application/json');
		res.write(JSON.stringify(output));
		res.end();
	}	
	
	error(message)  {
		if (typeof message == 'string') {
			return {
				status: 'ERROR',
				message: message
			};
		}
		if (message.message && typeof message.stack == 'string') {
			return {
				status: 'ERROR',
				result: {
					message: message.message,
					stack: message.stack.split('\n')
				}
			};
		}
		
		message.status = 'ERROR';
		return message;
	}
	
}
