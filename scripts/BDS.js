//megospace_library

var binary_arrays = new Array();
var binary_arrays_data = new Array();
binary_arrays_data[0] = new Array();
binary_arrays_data[1] = new Array();
binary_arrays_data[2] = new Array();
binary_arrays_data[3] = 0;

function string(number, system){
  return number.toString(system);
}

function unicode_to_bytes(text){
	encoder = new TextEncoder();
	let encoded = new Uint8Array();
	let outdata = new Array();
	encoded = encoder.encode(text);
	for (let j = 0; j < encoded.length; j++) {
	  outdata[j] = string(encoded[j], 2);
	}
  return outdata;
}

function bytes_to_unicode(bytes){
	let indata = new Uint8Array(bytes);
	return new TextDecoder().decode(indata);
}

function array_to_system(array, system){
	let indata = new Array();
  let outdata = new Array();
  indata = array;
  for(let k = 0; k < array.length; k++){
     outdata[k] = string(indata[k], system) ;
  }
  return outdata;
}

function download(name, text){
	let file = new Blob([text],{ type: "text/plain;charset=utf-8" })
	document.getElementById('download').href = URL.createObjectURL(file);
	document.getElementById('download').download = `${name}`;
	document.getElementById('download').click(); 
} 

function bits_to_bytes(bits, system){
  let indata = new Array();
  let outdata = new Array();
  for (let k = 0; k < bits.length; k++) {
    indata[k] = bits[k];
  }
  for (let k = 0; k < indata.length % 8; k++) {
    indata[indata.length] = 0;
  }
  for (let k = 0; k < indata.length/8; k++) {
			let h;
			let byte_now = "";
			for (h = k*8; h < k*8+8; h++) {
      byte_now = `${byte_now}${indata[h]}`
			}
			outdata[k] = string(Number("0b" + byte_now) , system);
  }
  return outdata;
}

function download_bits(name, bits_array){
  download(name, bytes_to_unicode(bits_to_bytes(bits_array)))
}

function numbers_of_element(array, element){
  let outdata = new Array();
  let indata = new Array();
  outdata = [];
  indata = array;
  for (let k = 0, h = 0; k < indata.length; k++) {
    if (indata[k] == element) {
      outdata[h] = k;
      h++
    }
  }
  return outdata;
}

function is_array_on(array, element){
  return numbers_of_element(array, element).length != 0;
}

function create_new_binary_array(name){
  if (! is_array_on(binary_arrays_data[0], name)) {
    binary_arrays_data[0][binary_arrays_data[3]] = name;
    binary_arrays_data[1][binary_arrays_data[3]] = ""; 
    binary_arrays_data[2][binary_arrays_data[3]] = 0;
    binary_arrays[binary_arrays_data[3]] = new Array();
    binary_arrays_data[3]++;
  }
}

function add_bit_to(name, bit){
  let name_number = numbers_of_element(binary_arrays_data[0], name)[0];
  if (name_number.length != 0) {
    if (binary_arrays_data[1][name_number].length == 7) {
      binary_arrays[name_number][binary_arrays_data[2][name_number]] = Number("0b" + binary_arrays_data[1][name_number] + bit) ;
      binary_arrays_data[1][name_number] = "";
      binary_arrays_data[2][name_number]++;
    }
    else {
      binary_arrays_data[1][name_number] = binary_arrays_data[1][name_number] + bit;
    }
  }
} 

function add_bits_to(name, bits_array){
  for(let j = 0; j < bits_array.length; j++){
    add_bit_to(name, bits_array[j]);
  }
}

function byte_from(name_of_array, number_of_byte, system){
  let name_number = numbers_of_element(binary_arrays_data[0], name_of_array)[0];
  if (number_of_byte == binary_arrays_data[2][name_number]) {
    return bits_to_bytes(binary_arrays_data[1][name_number], system);
  }
  else {
    return string(binary_arrays[name_number][number_of_byte], system)
  }
}

function binary_array(name, system){
  let name_number = numbers_of_element(binary_arrays_data[0], name)[0];
  return array_to_system(binary_arrays[name_number], system);
}

function binary_array_how_bytes(name){
  let name_number = numbers_of_element(binary_arrays_data[0], name)[0];
  let outdata = new Array();
  for(let j = 0; j < binary_arrays[name_number].length; j++){
    if (`${string(binary_arrays[name_number][j], 2)}`.length == 8) {
      outdata[j] = string(binary_arrays[name_number][j], 2);
    }
    else {
      outdata[j] = "";
      for (let k = 0; k < 8 - `${string(binary_arrays[name_number][j], 2)}`.length % 8; k++) {
        outdata[j] = "0" + outdata[j];
      }
      outdata[j] = outdata[j] + string(binary_arrays[name_number][j], 2);
    }
  }
  if (binary_arrays_data[1][name_number] != "") {
    outdata[outdata.length] = bits_to_bytes(binary_arrays_data[1][name_number], 2);
  }
  return outdata;
}

function byte_from_as_8_bits(name, number){
  return binary_array_how_bytes(name)[number];
}

function size_of(name){
  let name_number = numbers_of_element(binary_arrays_data[0], name)[0];
  if (binary_arrays_data[1][name_number] == "") {
    return binary_arrays_data[2][name_number];
  }
  else {
    return binary_arrays_data[2][name_number]+1;
  }
}

function clear_binary_array(name){
  let name_number = numbers_of_element(binary_arrays_data[0], name)[0];
  binary_arrays_data[1][name_number] = ""; 
  binary_arrays_data[2][name_number] = 0;
  binary_arrays[name_number] = new Array();
}
