<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Breakout Game</title>
  <link rel="stylesheet" type="text/css" href="styles.css">
    <script src="game.js"></script>


</head>

<body>

  <canvas id="breakoutCanvas" width="640" height="480"></canvas>



<div style="color:white">
  <div class="">
		<div>
			<div>
				<div class="" style="font-family: Arial, Helvetica, sans-serif;">
					<label for="username" class="auth-label">Username:</label>
					<input style="padding: 5px 15px" type="text" id="username" name="username" class="">
				</div>
				<div class="" style="font-family: Arial, Helvetica, sans-serif; padding-left: 3px;">
					<label  for="password" class="auth-label">Password:</label>
					<input style="padding: 5px 15px" type="password" id="password" name="password" class="">
				</div>
			</div>
		</div>
	</div>

	<div class="" style="padding-top: 10px;">
		<div >
			<div id="login-box" class="">
				<input style="background-color: blue; border: none; color: white; padding: 15px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 12px;" type="button" id="login" class="buttons" value="LOGIN" onclick="login();"></input>
			
				<input style="background-color: blue; border: none; color: white; padding: 15px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 12px;" type="button" id="register" class="buttons" value="REGISTER" onclick="register();"></input>
			</div>
		</div>
	</div>
</div>


</body>


</html>
