function sayHi(){
		alert("hellllooor");

}

var str = "";
var items = {};
var done = false;
var push = $('#push').on("click", another);
$.getJSON("stuff.json", parse_sentence);

function parse_sentence(data){
	// global items now holds all of the items
	items = data;
	str = "";
	$.each(data, choose_randome_item);
	// console.log(str);
	done = true;
	update_phrase_on_page();

}

function choose_randome_item(key, val){
	// build the string, one item at a time
	var item = val[Math.floor(Math.random()*val.length)];
	// console.log(item)
	str += " " + item;
}


function another(){
	if (done = true){
		str = "";
		done = false;
	}
	$.each(items, choose_randome_item);
	update_phrase_on_page();
}

function update_phrase_on_page(){
	$("#phrase").html(str);
}