'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = exports.Controller = function () {
	function Controller(app) {
		var _this = this;

		_classCallCheck(this, Controller);

		var routing = this.routing();

		var _loop = function _loop() {
			var method = routing[r];

			app.get(_this.namespace() + r, function (req, res) {
				_this.callRoute(method, req, res);
			});

			app.post(_this.namespace() + r, function (req, res) {
				_this.callRoute(method, req, res);
			});
		};

		for (var r in routing) {
			_loop();
		}
	}

	_createClass(Controller, [{
		key: 'namespace',
		value: function namespace() {
			return '';
		}
	}, {
		key: 'callRoute',
		value: function callRoute(method, req, res) {
			var _this2 = this;

			var result;
			try {
				result = this[method](req, res);
			} catch (e) {
				console.error(e.message + '\n' + e.stack);
				this.applyResult(req, res, this.error(e));
				return;
			}

			if (result && typeof result.then == 'function') {
				result.then(function (data) {
					return _this2.applyResult(req, res, data);
				}).catch(function (e) {
					console.error(typeof e == 'string' ? e : e.message + '\n' + e.stack);
					_this2.applyResult(req, res, _this2.error(e));
				});
				return;
			}

			this.applyResult(req, res, result);
		}
	}, {
		key: 'applyResult',
		value: function applyResult(req, res, result) {
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
	}, {
		key: 'error',
		value: function error(message) {
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
	}]);

	return Controller;
}();