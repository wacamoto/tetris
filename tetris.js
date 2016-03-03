//block
base_block = [
	[
		[1,1],
		[1,1],
	],
	[
		[0,1,0],
		[1,1,1],
		[0,0,0],
	],
	[
		[0,1,0],
		[1,1,0],
		[1,0,0],
	],
	[
		[0,1,0],
		[0,1,1],
		[0,0,1],
	],
	[
		[0,1,0],
		[0,1,0],
		[0,1,1],
	],
	[
		[0,1,0],
		[0,1,0],
		[1,1,0],
	],
	[
		[0,0,1,0],
		[0,0,1,0],
		[0,0,1,0],
		[0,0,1,0],
	],
	[
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
	]
]

colors = ['#FF0000','#E70082','#FF7400','#B602D5','#01BECF','#0B42D7','#0CE800','#A8F700','#FFFD00','#FFB300'];

//setting
var ck = 20;
var speed = 2;
var fps = 20;

var map;
var tetris_width = 10;
var tetris_height = 20;
var width = tetris_width;
var height = tetris_height + 5;

var default_block = {state:'empty',color:'white'};
var sit,size;
var t1 = 0,t2 = 0;

var now = 'intro';
var s = true;
var score = 0;


/*************************************************
觸發事件
*************************************************/
//timecount
function gameloop () {
	t1 += 1;
	if (t1 >= ck/fps && now == 'playing') {
		drawmap();
		t1 = 0;
	}
	t2 += 1;
	if (t2 >= ck/speed && now == 'playing') {
		movedown();
		t2 = 0;
	}
	if (now != 'gameover') {
		setTimeout('gameloop()',1000/ck);
	}
}


//keyboard event
document.onkeydown = keyCodevent;
function keyCodevent () {
	switch (event.keyCode) {
		case 13:
			if (now == 'intro') {
				start();
			}
			if (now == 'gameover') {
				intro();
			}
			break;
		case 39:
			if (now == 'playing') {
				moveright();
				sound1();
			}
			break;
		case 37:
			if (now == 'playing') {
				moveleft();
				sound1();
			}
			break;
		case 38:
			if (now == 'playing') {
				turnblock();
				sound1();
			}
			break;
		case 40:
			if (now == 'playing') {
				movedown();
				sound1();
			}
			break;
		case 83:  		//s
			if (now == 'playing'||now =='pause') {
				sounds();
			}
			break;
		case 80: 		//p
			if (now == 'playing'||now == 'pause') {
				pause();
			}
			break;
	}
}


//intro
function intro () {
	now = 'intro';
	ctx.clearRect(0, 0, 600, 600);
	drawmenu();	
}


//startgame
function start () {
	now = 'playing';
	createmap();
	loadnewblock();
	gameloop();	
}


//pause
function pause () {
	if (now == 'pause') {
		now = 'playing';
	}
	else if (now == 'playing') {
		now = 'pause';
		drawpause();
	}
}


//gameover
function gameover () {
	now = 'gameover';
	bg.pause();
	sound3();
	drawgameover();
}


//sounds
function sounds () {
	s = !s;
	if (!s) {
		bg.pause();		
	}else{
		bg.play();
	}
	drawsound();
}


//audio
 function sound1 () {
 	if (s) {
		var audio1 = document.createElement('audio');
		audio1.src = "mp3/1.mp3" ;
		audio1.play();
	}
}

 function sound2 () {
 	if (s) {
		var audio1 = document.createElement('audio');
		audio1.src = "mp3/2.mp3" ;
		audio1.play();
	}
}

 function sound3 () {
 	if (s) {
		var audio1 = document.createElement('audio');
		audio1.src = "mp3/gameover.mp3" ;
		audio1.play();
	}
}


/************************************************************
地圖初始化
************************************************************/
function createmap () {
	var bg = document.getElementById('bg');
	if (s) {bg.currentTime = 0;bg.play()};
	score = 0;
	map = [];
	for (var c1 = 0; c1 < height; c1++) {
		map[c1] = [];
		for (var c2 = 0; c2 < width; c2++) {
			map[c1][c2] = default_block;
		}
	}
	drawwall();
	drawsound();
	drawscore();
}


//create new block
function loadnewblock () {
	var ran_shape = base_block[Math.floor(Math.random()*base_block.length)];
	var ran_color = colors[Math.floor(Math.random()*colors.length)];
	sit = {h:0,w:2};
	size = ran_shape.length;
	for (var c1 = 0; c1 < size; c1++) {
		for (var c2 = 0; c2 < size; c2++) {
			if (ran_shape[c1][c2] == 1){
				map[c1][c2 + 2] = {state:'moving',color:ran_color};
			}
		}
	}
}


/**********************************************************
方塊移動控制
***********************************************************/
//down
function movedown () {
	//check
	var move = true;
	for (var c1 = 0; c1 < width; c1++) {
		for (var c2 = height - 2; c2 >= 0; c2--) {
			if (map[c2][c1].state == 'moving' && map[c2 + 1][c1].state == 'stuck') {
				move = false;
			}
		}
		if (map[height - 1][c1].state == 'moving') {
			move = false;
		}
	}
	//move or stuck
	if (move) {
		for (var c1 = height - 2; c1 >= 0; c1--) {
			for (var c2 = 0; c2 < width; c2++) {
				if (map[c1][c2].state == 'moving') {
					map[c1+1][c2] = map[c1][c2];
					map[c1][c2] = default_block;
				}
			}
		}
		sit.h += 1;
	}
	else {
		for (var c1 = 0; c1 < height; c1++) {
			for (var c2 = 0; c2 < width; c2++) {
				if (map[c1][c2].state == 'moving') {
					map[c1][c2].state = 'stuck';
				}
			}
		}
		//check	
		for (var c1 = 0; c1 < width; c1 ++) {
			if (map[4][c1].state == 'stuck') {
				gameover();
			}
		}
		getscore();
		loadnewblock();
	}
}


//move right
function moveright () {
	//check
	var move = true;
	for (var c1 = 0; c1 < height; c1++) {
		for (var c2 = width - 2; c2 >= 0; c2--) {
			if (map[c1][c2].state == 'moving' && map[c1][c2 + 1].state == 'stuck') {
				move = false;
			}
		}
		if (map[c1][tetris_width - 1].state == 'moving') {
			move = false;
		}
	}
	//move
	if (move) {
		for (var c1 = 0; c1 < tetris_height + 5; c1++) {
			for (var c2 = tetris_width - 1; c2 >= 0; c2--) {
				if (map[c1][c2].state == 'moving') {
					map[c1][c2 + 1] = map[c1][c2];
					map[c1][c2] = default_block;
				}
			}
		}
		sit.w += 1;
	}
}


//move left
function moveleft () {
	//check
	var move = true;
	for (var c1 = 0; c1 < tetris_height + 5; c1++) {
		for (var c2 = tetris_width - 1; c2 >= 1; c2--) {
			if (map[c1][c2].state == 'moving' && map[c1][c2 - 1].state == 'stuck') {
				move = false;
			}
		}
		if (map[c1][0].state == 'moving') {
			move = false;
		}
	}
	//move
	if (move) {
		for (var c1 = 0; c1 < tetris_height + 5; c1++) {
			for (var c2 = 1; c2 < tetris_width; c2++) {
				if (map[c1][c2].state == 'moving') {
					map[c1][c2 - 1] = map[c1][c2];
					map[c1][c2] = default_block; 
				}
			}
		}
		sit.w -= 1;
	}
}


//turn the block
function turnblock() {
	var move = true;
	var temp = [];
	if (sit.w < 0||sit.w + size > width) {
		move = false;
	}
	//turn
	for (var c1 = 0; c1 < size; c1++) {
		temp [c1] = [];
		for (var c2 = 0; c2 < size; c2++) {
			temp[c1][c2] = map[sit.h + size -1 - c2][c1 + sit.w];
		}
	}
	//check
	for (var c1 = 0; c1 < size; c1++) {
		for (var c2 = 0; c2 < size; c2++) {
			if (map[c1 + sit.h][c2 + sit.w].state == 'stuck' && temp[c1][c2].state == 'moving') {
				move = false;
				break;
			}
		}
	}
	//move
	if (move) {
		for (var c1 = 0; c1 < size; c1++) {
			for (var c2 = 0; c2 < size; c2++) {
				if (map[c1 + sit.h][c2 + sit.w].state == 'moving') {
					map[c1 + sit.h][c2 + sit.w] = default_block;
				}
				if (temp[c1][c2].state == 'moving') {
					map[c1 + sit.h][c2 + sit.w] =  temp[c1][c2];
				}
			}
		}
	}
}


//score
function getscore () {
	var f = 0;
	for (var c1 = 0; c1 < height; c1++) {
		var b = 0;
		for (var c2 = 0; c2 < width; c2 ++) {
			if (map[c1][c2].state == 'stuck') {
				b += 1;
			}else {
				break;
			}
		}
		if (b == width) {
			for (i = c1; i > 0; i--) {
				map[i] = map[i - 1]; 
				//小bug 臨時法
				map[i - 1] = [default_block,default_block,default_block,
				default_block,default_block,default_block,default_block,
				default_block,default_block,default_block];
			} 
			f += 1;
		}
	}
	if (f > 0) {sound2();}
	score += f*f;
	drawscore();
}


/*********************************************************
drawing
*********************************************************/
var cvs = document.getElementById('myCanvas');
var ctx = cvs.getContext('2d');


//draw map
function drawmap () {
	for (var c1 = 5; c1 < tetris_height + 5; c1++) {
		for (var c2 = 0; c2 < tetris_width; c2++) {
			var b = map[c1][c2];
			ctx.fillStyle = b.color;
			ctx.strokeStyle = 'white';
			ctx.fillRect(c2*30 + 150 - 0.5, (c1 - 5)*30 - 0.5, 29.5, 29.5);
			ctx.strokeRect(c2*30 + 150 - 0.5, (c1 - 5)*30 - 0.5, 29.5, 29.5);
		}
	}
}


//wall
function drawwall () {
	ctx.moveTo(150,600);
	ctx.lineTo(450,600);
	ctx.strokeStyle = 'black';
	ctx.lineWidth = 15;
	ctx.stroke();
	ctx.lineWidth = 1;
}

//score
function drawscore () {
	ctx.clearRect(460, 0, 600, 60);
	ctx.font = '30px Georgia';
	ctx.textAlign = 'right';
	ctx.fillStyle = 'orange';
	ctx.fillText('score:' + score,600,50);
}


//sounds
function drawsound () {
	ctx.clearRect(460, 60, 600, 100);
	ctx.font = '30px Georgia';
	ctx.textAlign = 'right';
	ctx.fillStyle = 'orange';
	// on/off
	if(s){
		ctx.fillText('sound: on',600,100);
	}else{
		ctx.fillText('sound: off',600,100)
	}
}


//pause
function drawpause () {
	ctx.font = '150px Georgia';
	ctx.textAlign = 'center';
	ctx.fillStyle = 'green';
	ctx.fillText('p',300,325);
}


//gameover
function drawgameover () {
	ctx.font = '100px Georgia';
	ctx.textAlign = 'center';
	ctx.fillStyle = 'red';
	ctx.fillText('GAME OVER',300,325);
}


//intro
var drawmenu = function () {
	ctx.clearRect(0,0,600,610)
	//tetris style
	var gradient = ctx.createLinearGradient(220,0,380,0);
	gradient.addColorStop("0","magenta");
	gradient.addColorStop("0.5","blue");
	gradient.addColorStop("1.0","red");
	// Fill with gradient
	ctx.font = '60px Georgia'
	ctx.textAlign = 'center';
	ctx.fillStyle = gradient;
	ctx.fillText("Tetris",300,50);



	ctx.textAlign = 'center';
	ctx.fillStyle = 'black';
	ctx.font = '30px  arial';
	ctx.fillText('s: sounds on/off',300,400);
	ctx.fillText('p: pause',300,440);
	ctx.fillText('>>Enter',300,500);
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
	ctx.lineTo(300 + 7, 133 + 15);
	ctx.lineTo(300 + 7, 175 + 15);
	ctx.lineTo(300 - 7, 175 + 15);
	ctx.lineTo(300 - 7, 133 + 15);
	ctx.lineTo(300 - 15, 133 + 15);
	ctx.closePath();
	ctx.fillStyle = 'white';
	ctx.fill();

	//left x:200 - 43 y:220
	roundRect(ctx, x = 200 - 43, y = 220);

	ctx.beginPath();
	ctx.moveTo(170, 263);
	ctx.lineTo(170 + 15, 263 - 15);
	ctx.lineTo(170 + 15, 263 - 7);
	ctx.lineTo(212 + 15, 263 - 7);
	ctx.lineTo(212 + 15, 263 + 7);
	ctx.lineTo(170 + 15, 263 + 7);
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
	ctx.lineTo(300 - 7, 293 - 15);
	ctx.lineTo(300 - 7, 251 - 15);
	ctx.lineTo(300 + 7, 251 - 15);
	ctx.lineTo(300 + 7, 293 - 15);
	ctx.lineTo(300 + 15, 293 - 15);
	ctx.closePath();
	ctx.fillStyle = 'white';
	ctx.fill();

	//right x:400 - 43 y:220
	roundRect(ctx, x = 400 - 43, y = 220);

	ctx.beginPath();
	ctx.moveTo(430, 263);
	ctx.lineTo(430 - 15, 263 + 15);
	ctx.lineTo(430 - 15, 263 + 7);
	ctx.lineTo(388 - 15, 263 + 7);
	ctx.lineTo(388 - 15, 263 - 7);
	ctx.lineTo(430 - 15, 263 - 7);
	ctx.lineTo(430 - 15, 263 - 15);
	ctx.closePath();
	ctx.fillStyle = 'white';
	ctx.fill();
}

intro();
