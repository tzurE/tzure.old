
// this loads on the start document ready phase.
var coded_string = ""
var str = "";
// global collection of the json
var items = {};
var phrase_list = $("#phrases");
var push = $('#push').on("click", get_another_phrase);
var push = $('#member').on("click", update_list);
$.getJSON("stuff.json", parse_sentence);


function parse_sentence(data){
	// global items now holds all of the items
	items = data;
	str = "";

	// Did we get a new address or should we parse an existing string?
	if (!check_if_url_parse_needed()){
		$.each(data, choose_randome_item);
		// if this is a new string - code it into the URL.
		update_url(coded_string, true);
	}
	else{
		// we got a coded string. parse it.
		parse_current_url();
	}
	update_phrase_on_page();
}

// new string - build it from scratch.
function choose_randome_item(key, val){
	// build the string, one item at a time
	var index = Math.floor(Math.random()*val.length);
	var item = val[index];
	// use & as the delimiter between indices
	coded_string += index + "&";
	str += " " + item;
}


function get_another_phrase(){
	// neat trick
	$("#phrase").fadeOut();
	
	coded_string = ""
	window.setTimeout(function(){
		str = "";
		$.each(items, choose_randome_item);
		update_phrase_on_page();
		update_url(coded_string, false)
	}, 500);
}

function update_phrase_on_page(){
	$("#phrase").html(str);
	$("#phrase").fadeIn(1000);
}


function check_if_url_parse_needed(){
	return !(window.location.href.indexOf("#") == -1)
}


// we got a url in the link - parse it and present it.
function parse_current_url() {
	// array of indices. each one represents a word in the collection.
	var p_index = (window.location.href.split("#")[1]).split("&");
	// console.log(p_index);
	var i = 0;
	$.each(items, function(key, val){
		str += " " + val[p_index[i]];
		i++
	});
}


function update_url(coded_string, is_first) {
	// get current location.
	var loc = window.location.href;
	var i = loc.length;
	if (!is_first){
		i = loc.indexOf("#");
	}
	var subs = loc.substring(0,i);
	window.history.pushState(" ff ", "phrase", subs+="#"+coded_string);
}

function update_list(){
	phrase_list.append('<a href="#" class="list-group-item">' + str + '</a>');
}
