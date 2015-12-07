var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');

var drawmenu = function () {
	ctx.font = '50px Georgia';
	ctx.textAlign = 'center';
	ctx.fillText('tetris',300,50);
	ctx.font = '35px  arial';
	ctx.fillText('s: sound on/off',300,400);
	ctx.fillText('p: pause',300,440);
	ctx.fillText('Enter To Start',300,500);
	ctx.beginPath();


	function roundRect(ctx, x, y) {
		var side = 86;
		var radius = 20;
		ctx.fillStyle='black';

		ctx.beginPath();
		ctx.moveTo(x + radius, y);
		ctx.lineTo(x + side - radius, y);
		ctx.quadraticCurveTo(x + side, y, x + side, y + radius);
		ctx.lineTo(x + side, y + side - radius);
		ctx.quadraticCurveTo(x + side, y + side, x + side - radius, y + side);
		ctx.lineTo(x + radius, y + side);
		ctx.quadraticCurveTo(x, y + side, x, y + side - radius);
		ctx.lineTo(x, y + radius);
		ctx.quadraticCurveTo(x, y, x + radius, y);
		ctx.closePath();
		
		ctx.stroke();
		ctx.fill();
	}


	//top x:300 - 43 y:120
	roundRect(ctx, x = 300 - 43, y = 120);
	
	ctx.beginPath();
	ctx.moveTo(300, 133);
	ctx.lineTo(300 + 15, 133 + 15);
	ctx.lineTo(300 + 8, 133 + 15);
	ctx.lineTo(300 + 8, 178 + 15);
	ctx.lineTo(300 - 8, 178 + 15);
	ctx.lineTo(300 - 8, 133 + 15);
	ctx.lineTo(300 - 15, 133 + 15);
	ctx.closePath();
	ctx.fillStyle = 'white';
	ctx.fill();

	//left x:200 - 43 y:220
	roundRect(ctx, x = 200 - 43, y = 220);

	ctx.beginPath();
	ctx.moveTo(170, 263);
	ctx.lineTo(170 + 15, 263 - 15);
	ctx.lineTo(170 + 15, 263 - 8);
	ctx.lineTo(215 + 15, 263 - 8);
	ctx.lineTo(215 + 15, 263 + 8);
	ctx.lineTo(170 + 15, 263 + 8);
	ctx.lineTo(170 + 15, 263 + 15);
	ctx.closePath();
	ctx.stroke();
	ctx.fillStyle = 'white';
	ctx.fill();


	//down x:300 - 43 y:220
	roundRect(ctx, x = 300 - 43, y = 220);

	ctx.beginPath();
	ctx.moveTo(300, 293);
	ctx.lineTo(300 - 15, 293 - 15);
	ctx.lineTo(300 - 8, 293 - 15);
	ctx.lineTo(300 - 8, 248 - 15);
	ctx.lineTo(300 + 8, 248 - 15);
	ctx.lineTo(300 + 8, 293 - 15);
	ctx.lineTo(300 + 15, 293 - 15);
	ctx.closePath();
	ctx.fillStyle = 'white';
	ctx.fill();

	//right x:400 - 43 y:220
	roundRect(ctx, x = 400 - 43, y = 220);

	ctx.beginPath();
	ctx.moveTo(430, 263);
	ctx.lineTo(430 - 15, 263 + 15);
	ctx.lineTo(430 - 15, 263 + 8);
	ctx.lineTo(385 - 15, 263 + 8);
	ctx.lineTo(385 - 15, 263 - 8);
	ctx.lineTo(430 - 15, 263 - 8);
	ctx.lineTo(430 - 15, 263 - 15);
	ctx.closePath();
	ctx.fillStyle = 'white';
	ctx.fill();
}
drawmenu();