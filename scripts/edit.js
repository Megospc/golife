var pixels = new Array();
var color = 12;
var color_name = "white";
var instrument = "reformer";
var count = new Array();
var x;
var y;
const grid = 5;
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
	document.getElementById('instrument').src=`assets/buttons/pencil.png`;
}
function eraser() {
	instrument = "eraser" ;
	document.getElementById('instrument').src=`assets/buttons/eraser.png`;
}
function reformer() {
	instrument = "reformer" ;
	document.getElementById('instrument').src=`assets/buttons/reformer.png`;
}
function edit() {
	x = Math.floor((x-document.getElementById('canvas').offsetLeft)/20);
	y = Math.floor((y-document.getElementById('canvas').offsetTop)/20);
	if (instrument == "pencil") {
		pixels[x][y] = color;
		ctx.fillStyle = color_name;
		fill_rect(x,y); 
	}
	if (instrument == "eraser") {
		pixels[x][y] = 0;
		ctx.fillStyle = "black";
		fill_rect(x,y); 
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
		fill_rect(x,y); 
	}
}
function set_color() {
	color_name = rgbToHex(colors_sheet[color*3+0], colors_sheet[color*3+1], colors_sheet[color*3+2]);
	document.getElementById('color_now').style.background=color_name;
}
function clear_life() {
	if (confirm('Вы уверены что хотите убрать все живые клетки?')) {
		ctx.fillStyle = "black"; 
		for (x = 0; x < size; x++) {
			for (y = 0; y < size; y++) {
				pixels[x][y] = '0';
				fill_rect(x,y);
			}
		}
	} 
}
function fill_rect(x_fill,y_fill){
	if (x_fill % grid == 0) {
		if(y_fill % grid == 0) {
			ctx.fillRect(x*20+1,y_fill*20+1,19,19);
		}
		else {
			if (y_fill % grid == grid-1) {
				ctx.fillRect(x*20+1,y_fill*20+1,19,18);
			}
			else {
				ctx.fillRect(x*20+1,y_fill*20+1,19,19);
			}
		} 
	}
	else {
		if(x_fill % grid == grid-1) {
			if (y_fill % grid == 0) {
			  ctx.fillRect(x*20+1,y_fill*20+1,18,19);
			}
			else {
				if(y_fill % grid == grid-1) {
					ctx.fillRect(x*20+1,y_fill*20+1,18,18);
				} 
				else {
					ctx.fillRect(x*20+1,y_fill*20+1,18,19);
				}
			}
		} 
		else {
			if (y_fill % grid == 0) {
				ctx.fillRect(x*20+1,y_fill*20+1,19,19);
			} 
			else {
				if (y_fill % grid == grid-1) {
					ctx.fillRect(x*20+1,y_fill*20+1,19,18);
				}
				else {
					ctx.fillRect(x*20+1,y_fill*20+1,19,19);
				}
			}
		}
	}
}