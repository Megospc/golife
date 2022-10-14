var colors_sheet = new Array();
colors_sheet = [0,0,0, 255,0,0, 255,128,0, 255,255,0, 128,128,0, 0,255,0, 0,255,128, 0,255,255, 0,0,255, 128,0,255, 255,0,255, 255,0,128, 255,255,255, 128,128,128, 207,207,207, 128,144,160];
var frame_byte = new Array();
var frame_red = new Array();
var frame_green = new Array();
var frame_blue = new Array();
var color_new = new Array();
var colors_red = new Array();
var colors_green = new Array();
var colors_blue = new Array();
var alive = new Array();
var age_colors = new Array();
var mono_color = "#ffffff";
var render_type = "rainbow";
var alive_now;
var generation;
var cells;
var run = 0;
var mili_time;
var calc_time;
age_colors = ["black", "red", "orange", "yellow", "lime", "aqua", "blue", "magenta", "white"]
function first_frame(){
	stop_run();
	cells = 0;
	generation = 1;
	frame_byte = [];
	for (let i = 0; i < size; i++) {
		color_new[i] = new Array();
	}
	alive = [];
	for (let i = 0; i < size; i++) {
		alive[i] = new Array();
	} 
	frame_byte = [];
	for (let i = 0; i < size; i++) {
		frame_byte[i] = new Array();
	}
	for (x = 0; x < size; x++) {
		for (y = 0; y < size; y++) {
			if (pixels[x][y] == 0) {
				frame_byte[x][y] = 0;
			} 
			else {
				frame_byte[x][y] = 1;
				cells++;
			}
		}
	}
	frame_red = [];
	for (let i = 0; i < size; i++) {
		frame_red[i] = new Array();
	}
	frame_green = [];
	for (let i = 0; i < size; i++) {
		frame_green[i] = new Array();
	}
	frame_blue = [];
	for (let i = 0; i < size; i++) {
		frame_blue[i] = new Array();
	}
	for (x = 0; x < size; x++) {
		for (y = 0; y < size; y++) {
			frame_red[x][y] = colors_sheet[pixels[x][y]*3];
			frame_green[x][y] = colors_sheet[pixels[x][y]*3+1] ;
			frame_blue[x][y] = colors_sheet[pixels[x][y]*3+2];
			if (pixels[x][y] != 0 ) {
				if(render_type == "rainbow"){
					ctx.fillStyle = rgbToHex(frame_red[x][y], frame_green[x][y], frame_blue[x][y]);
					fill_rect(x,y);
				} 
				if(render_type == "age"){
					ctx.fillStyle = age_colors[1];
					fill_rect(x,y);
				} 
				if(render_type == "mono"){
					ctx.fillStyle = mono_color;
					fill_rect(x,y);
				} 
			} 
			else {
				ctx.fillStyle = "black";
				fill_rect(x,y);
			}
		}
	}
	statistic();
}
function one_step(){
	calculate();
	for (x = 0; x < size; x++) {
		for (y = 0; y < size; y++) {
			if (frame_byte[x][y] == 0) {
				if (alive[x][y] == 3) {
					frame_byte[x][y] = 1;	
					frame_red[x][y] = color_new[x][y][0];
					frame_green[x][y] = color_new[x][y][1];
					frame_blue[x][y] = color_new[x][y][2];
					if (render_type == "rainbow") {	
						ctx.fillStyle = rgbToHex(color_new[x][y][0],color_new[x][y][1],color_new[x][y][2]);
					} 
					if (render_type == "age") {	
						ctx.fillStyle = age_colors[1];
					} 
					if (render_type == "mono") {	
						ctx.fillStyle = "white";
					} 
					fill_rect(x,y);
					cells++;
				}
			}
			else {
				if (alive[x][y] == 2 || alive[x][y] == 3) {
					if (frame_byte[x][y] != age_colors.length-1) {
						frame_byte[x][y] = frame_byte[x][y]+1;
						if (render_type == "age") {	
							ctx.fillStyle = age_colors[frame_byte[x][y]];
							fill_rect(x,y);
						} 
					}
				} 
				else {
					frame_byte[x][y] = 0;
					frame_red[x][y] = 0;
					frame_green[x][y] = 0;
					frame_blue[x][y] = 0;
					ctx.fillStyle = "black"
					fill_rect(x,y);
					cells--;
				}
			}
		} 
	}
	generation++;
	statistic();
}
function calculate(){
	for (x = 0; x < size; x++) {
		for (y = 0; y < size; y++) {
			alive_now = 0;
			colors_red = [];
			colors_green = [];
			colors_blue = [];
			if (x != 0) {
				is_alive(x-1, y);
				if (y != 0) {
					 is_alive(x-1, y-1);
				}
				if (y != size-1) {
					 is_alive(x-1, y+1);
				}
			}
			if (x != size-1) {
				is_alive(x+1, y);
				if (y != 0) {
					 is_alive(x+1, y-1);
				}
				if (y != size-1) {
					 is_alive(x+1, y+1);
				}
			}
			if (y != 0) {
					 is_alive(x, y-1);
			}
			if (y != size-1) {
					is_alive(x, y+1);
			}
			alive[x][y] = alive_now;
			if (alive_now == 3) {
				color_new[x][y] = new Uint8Array([Math.floor((colors_red[0] + colors_red[1] + colors_red[2])/3), Math.floor((colors_green[0] + colors_green[1] + colors_green[2])/3), Math.floor((colors_blue[0] + colors_blue[1] + colors_blue[2])/3)]);
			}
		} 
	} 
}
function is_alive(x_pixel, y_pixel){
	if(frame_byte[x_pixel][y_pixel]){
		alive_now++;
		colors_red[colors_red.length] = frame_red[x_pixel][y_pixel];
		colors_green[colors_green.length] = frame_green[x_pixel][y_pixel];
		colors_blue[colors_blue.length] = frame_blue[x_pixel][y_pixel]; 
	}
}
function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function run_life(){
	run = 1;
	document.getElementById('stop').style.display='block';
	document.getElementById('run').style.display='none';
	run_step();
}
function stop_run(){
	document.getElementById('stop').style.display='none';
	document.getElementById('run').style.display='block';
	run = 0;
}
function run_step(){
	calc_time = performance.now();
	one_step(); 
	calc_time = performance.now() - calc_time;
	document.getElementById('fps').innerHTML=`Max FPS: ${Math.floor(1000/calc_time)}`;
	setTimeout(() => { if (run == 1) {run_step();} }, 1000/document.getElementById('run_delay').value);
	
}
function rainbow(){
	stop_run();
	render_type = "rainbow";
	document.getElementById('render_type_shower').innerHTML='радужный';
	for (x = 0; x < size; x++) {
		for (y = 0; y < size; y++) {
			ctx.fillStyle = rgbToHex(frame_red[x][y], frame_green[x][y], frame_blue[x][y]);
			fill_rect(x,y);
		}
	} 
}
function age(){
	stop_run();
	render_type = "age";
	document.getElementById('render_type_shower').innerHTML='возраст';
	for (x = 0; x < size; x++) {
		for (y = 0; y < size; y++) {
			ctx.fillStyle = age_colors[frame_byte[x][y]];
			fill_rect(x,y);
		}
	} 
		
}
function mono(){
	stop_run();
	render_type = "mono";
	document.getElementById('render_type_shower').innerHTML='монотон';
	for (x = 0; x < size; x++) {
		for (y = 0; y < size; y++) {
			if (frame_byte[x][y] != 0 ) {
				ctx.fillStyle = mono_color;
				fill_rect(x,y);
			} 
		}
	} 
}
function statistic(){
  document.getElementById('statistic').innerHTML=`ПОКОЛЕНИЕ: ${generation} ЯЧЕЙКИ: ${cells}`;
}
