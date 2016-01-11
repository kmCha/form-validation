# Form Validation
---
## Usage
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>form validation</title>
	</head>
	<body>
		<form action="#" id="registerForm" method="post">
			用户名：<input type="text" name="userName"/ >
			密码：<input type="text" name="password"/ >
			<button>提交</button>
		</form>
		<script type="text/javascript" src="src/form-validation.js"></script>
		<script type="text/javascript">
			var registerForm = document.getElementById( 'registerForm' );
			var validataFunc = function(){
				var validator = new Validator();
				validator.add( registerForm.userName, [{
					strategy: 'notEmpty',
					errMsg: '用户名不能为空'
				}, {
					strategy: 'maxLength:6',
					errMsg: '用户名长度不能大于6位'
				}]);
				var errorMsg = validator.start();
				return errorMsg;
			};
			registerForm.onsubmit = function(){
				var errorMsg = validataFunc();
				if ( errorMsg ){
					alert ( errorMsg );
					return false;
				}

			};
		</script>
	</body>
	</html>