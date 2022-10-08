var view_mode_turn = 0;
function mouse(e){
	if (e.pageX > 5 && e.pageX < size*20+5 && e.pageY > 80 && e.pageY < size*20+80 && view_mode_turn == 0) {
		x = e.pageX;
		y = e.pageY;
		edit();
	}
}
addEventListener('click', mouse, false); 
