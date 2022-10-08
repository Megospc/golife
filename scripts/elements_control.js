var size = 0;
var sizPx = 0;
close_canvas();
document.getElementById('view_buttons').style.display='none' ;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
function set_size(s) {
	size = s;
	sizeUpload() ;
}
function selectSize(){
	stop_run();
	close_canvas();
	size = 0;
	editor_turn = 0;
	document.getElementById('size').style.display='block' ; 
	document.getElementById('view_buttons').style.display='none' ;
	reformer();
}
function sizeUpload(){
	setTimeout(() => { editor_turn = 1; }, 1000);
	create_array();
	close_sizes();
	document.getElementById('view').style.display='block' ;
	document.getElementById('life_buttons').style.display='block' ; 
	document.getElementById('color_now').style.display='block' ;
	document.getElementById('canvas').style.display='block' ;
	document.getElementById('life').style.display='block' ;
	document.getElementById('instrument').style.display='block' ;
	document.getElementById('save').style.display='block' ;
	document.getElementById('clear').style.display='block' ;
	document.getElementById('canvas').height=`${size * 20}`; 
	document.getElementById('canvas').width=`${size * 20}`;
	ctx.fillStyle = "grey";
	for (let i = 1; i < size; i++) {
		ctx.fillRect(20*i,0,1,20*size);
	}
	for (let i = 1; i < size+1; i++) {
		ctx.fillRect(0,20*i,20*size,1);
	}
}
function close_canvas(){
	document.getElementById('stop').style.display='none' ; 
	document.getElementById('render_type_shower').style.display='none' ; 
	document.getElementById('render_type_buttons').style.display='none' ; 
	document.getElementById('canvas').style.display='none' ;
	document.getElementById('life').style.display='none' ;
	document.getElementById('run').style.display='none' ;
	document.getElementById('life_buttons').style.display='none' ;
	document.getElementById('instrument').style.display='none' ;
	document.getElementById('color_now').style.display='none' ;
	document.getElementById('clear').style.display='none' ;
	document.getElementById('save').style.display='none' ;
	document.getElementById('view').style.display='none' ;
	
}
function close_sizes(){
	document.getElementById('size').style.display='none' ;
}
function view_mode(){
	first_frame();
	editor_turn = 0;
	document.getElementById('render_type_shower').style.display='block' ; 
	document.getElementById('render_type_buttons').style.display='block' ; 
	document.getElementById('view_buttons').style.display='block' ;
	document.getElementById('life_buttons').style.display='none' ;
	document.getElementById('instrument').style.display='none' ;
	document.getElementById('color_now').style.display='none' ;
	document.getElementById('clear').style.display='none' ;
	document.getElementById('save').style.display='none' ;
	document.getElementById('view').style.display='none' ;
	document.getElementById('run').style.display='block' ;
}
function back_to_editor(){
	rainbow();
	stop_run();
	editor_turn = 1;
	first_frame();
	document.getElementById('render_type_shower').style.display='none' ; 
	document.getElementById('render_type_buttons').style.display='none' ; 
	document.getElementById('view_buttons').style.display='none' ;
	document.getElementById('run').style.display='none' ;
	document.getElementById('life_buttons').style.display='block' ;
	document.getElementById('instrument').style.display='block' ;
	document.getElementById('color_now').style.display='block' ;
	document.getElementById('clear').style.display='block' ;
	document.getElementById('save').style.display='block' ;
	document.getElementById('view').style.display='block' ;
}
