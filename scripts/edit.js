var pixels = new Array();
var color = 7;
var color_name = "white";
var instrument = "reformer";
var count = new Array();
var x;
var y;
function create_array(){
	pixels = [];
	for (let i = 0; i < size; i++) {
		pixels[i] = new Array();
	}
	for (x = 0; x < size; x++) {
		for (y = 0; y < size; y++) {
			pixels[x][y] = '0';
		}
	}
	count = [];
	for (let i = 0; i < size; i++) {
		count[i] = new Array();
	}
	for (x = 0; x < size; x++) {
		for (y = 0; y < size; y++) {
			count[x][y] = '0';
		}
	}
}
function pencil() {
	instrument = "pencil" ;
	document.getElementById('instrument').src=`assects/buttons/pencil.png`;
}
function eraser() {
	instrument = "eraser" ;
	document.getElementById('instrument').src=`assects/buttons/eraser.png`;
}
function reformer() {
	instrument = "reformer" ;
	document.getElementById('instrument').src=`assects/buttons/reformer.png`;
}
function edit() {
	x = Math.floor((x-5)/20);
	y = Math.floor((y-80)/20);
	if (instrument == "pencil") {
		pixels[x][y] = color;
		ctx.fillStyle = color_name;
		ctx.fillRect(x*20+1,y*20+1,19,19); 
	}
	if (instrument == "eraser") {
		pixels[x][y] = 0;
		ctx.fillStyle = "black";
		ctx.fillRect(x*20+1,y*20+1,19,19); 
	}
	if (instrument == "reformer") {
		if (pixels[x][y] == 0 || pixels[x][y] != color) {
			pixels[x][y] = color;
			ctx.fillStyle = color_name;
		} 
		else {
			pixels[x][y] = 0;
			ctx.fillStyle = "black";
		}
		ctx.fillRect(x*20+1,y*20+1,19,19); 
	}
}
function set_color() {
	if (color == 1) {
		color_name = "red";
	}
	if (color == 2) {
		color_name = "yellow";
	}
	if (color == 3) {
		color_name = "lime";
	}
	if (color == 4) {
		color_name = "aqua";
	}
	if (color == 5) {
		color_name = "blue";
	}
	if (color == 6) {
		color_name = "magenta";
	}
	if (color == 7) {
		color_name = "white";
	}
	if (color == 8) {
		color_name = "grey";
	}
	document.getElementById('color_now').style.background=color_name;
}
function clear_life() {
	if (confirm('Вы уверены что хотите убрать все живые клетки?')) {
		ctx.fillStyle = "black"; 
		for (x = 0; x < size; x++) {
			for (y = 0; y < size; y++) {
				pixels[x][y] = '0';
				ctx.fillRect(x*20+1,y*20+1,19,19);
			}
		}
	} 
}
