var editor_turn = 0;
function mouse(e){
	if (e.pageX > document.getElementById('canvas').offsetLeft && e.pageX < size*20+document.getElementById('canvas').offsetLeft && e.pageY > document.getElementById('canvas').offsetTop && e.pageY < size*20+document.getElementById('canvas').offsetTop && editor_turn == 1 && size != 0 && is_not_button(e)) {
		x = e.pageX;
		y = e.pageY;
		edit();
	}
}
addEventListener('mousedown', mouse, false); 

function is_not_button(e){
  return e.pageY-window.pageYOffset > 275 || e.pageX-window.pageXOffset > 185;
}