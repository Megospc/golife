var save_pixels = new Array();
var _return;
var left_x;
var right_x;
var down_y;
var up_y; 
function save_life() {
	if (pi) {
	create_box();
	save_pixels = [];
	for(let i = 0; i < right_x-left_x+1 ; i++){
		save_pixels[i] = new Array();
	}
	for(x = 0 ; x < right_x-left_x+1 ; x++){
		for(y = 0; y < down_y-up_y+1 ; y++){
			save_pixels[x][y] = pixels[x+left_x][y+up_y];
		}
	}
	close_canvas(); 
	document.getElementById('canvas').height=`${(down_y-up_y+1)*20}`;
	document.getElementById('canvas').widht=`${(right_x-left_x+1)*20}`;
	document.getElementById('canvas').style.display='block';
	let pattern_name = `life`;
	//name = prompt("Введите имя файла:", );
	//file_name = `${name}.golife` ;
	download(`${pattern_name}.golife` , );
	
} 
function create_box(){
	left_x = size;
	right_x = 0;
	up_y = size;
	down_y = 0;
	for(let i = 0; i < size ; i++){
		x_alive(i);
		if (_return && i < left_x ) {
			left_x = i;
		}
	}
	for(let i = size-1; i > -1; i--){
		x_alive(i);
		if (_return && i > right_x ) {
			right_x = i;
		}
	}
	for(let i = 0; i < size ; i++){
		y_alive(i);
		if (_return && i < up_y ) {
			up_y = i;
		}
	}
	for(let i = size-1; i > -1; i--){
		x_alive(i);
		if (_return && i > down_y ) {
			down_y = i;
		}
	}
}
function x_alive(x_line){
	let args = new Array();
	_return = false;
	for (let i = 0; i < size; i++) {
		 if (pixels[x_line][i] == 0) {
				args[i] = false;
		 }
		 else {
				args[i] = true;
		 }
	}
	for( let i = 0; i < size; i++) {
			if (args[i]) {
				_return = true;
			} 
	} 
}
function y_alive(y_line){
	let args = new Array();
	_return = false;
	for (let i = 0; i < size; i++) {
		 if (pixels[i][y_line] == 0) {
				args[i] = false;
		 }
		 else {
				args[i] = true;
		 }
	}
	for( let i = 0; i < size; i++) {
			if (args[i]) {
				_return = true;
			} 
	} 
}
} 