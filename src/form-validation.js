
var strategies = {
	notEmpty: function(value, errMsg) {
		if(value === "") {
			return errMsg;
		}
	},
	maxLength: function(value, length, errMsg) {
		if(value.length > length) {
			return errMsg;
		}
	},
	minLength: function(value, length, errMsg) {
		if(value.length < length) {
			return errMsg;
		}
	}
};

var Validator = function() {
	this.cache = [];
};

// vali.add(form.name, [{strategy: "maxLength:6", errMsg: "blabla"}, {strategy: "notEmpty", errMsg: "aaaa"}])
Validator.prototype.add = function(elem, rules) {
	var value = elem.value,
		that = this;
	for(var i = 0; i < rules.length; i++) {
		(function(strategy) {
			var ruleArr = strategy.strategy.split(":"),
				errMsg = strategy.errMsg;
			that.cache.push(function() {
				var rule = ruleArr.shift();
				ruleArr.unshift(value);
				ruleArr.push(errMsg);
				return strategies[rule].apply(elem, ruleArr);
			});
		})(rules[i]);
	}
};

Validator.prototype.start = function() {
	for(var i = 0, l = this.cache.length; i < l; i++) {
		var msg = this.cache[i]();
		if(msg) {
			return msg;
		}
	}
};