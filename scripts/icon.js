icon() ;
function icon () {
	setTimeout(() => { document.getElementById('icon').href='assects/icons/iconGliderSecond.png' ;  }, 500);
	setTimeout(() => { document.getElementById('icon').href='assects/icons/iconGliderfirst.png' ;  }, 1000);
	setTimeout(() => { icon() ; }, 1000);
}
