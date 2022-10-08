function save_life() {
	var name = prompt("Введите имя файла:", );
	var file_name = `${name}.golife` ;
	var file_text = 22;
	var file = new Blob([`${file_text}`],{ type: "text/plain;charset=utf-8" });
	document.getElementById("download").href = URL.createObjectURL(file);
	document.getElementById("download").download = `${file_name}`;
	document.getElementById("download").click();
} 
