/**
 * **********************************************
 * File: globals.js
 * Description: common and generic functions.
 * Author: David P. Luna (dprados@oesia.com)
 * Date creation: 28 12 2009
 * Date modified: 26 01 2010
 * **********************************************
 */

function createCloseHelp(){
	var link = document.createElement("a"),
		linkText = document.createTextNode("Tancar");

		link.setAttribute("href","#");
		link.setAttribute("title","Tanca");
		link.className = "closeHelp";
		link.appendChild(linkText);
		
	$(".uihelp ~ .tooltip").append(link);
	$(".uihelp ~ .tooltip .closeHelp").click(function(){
		$(this).parent().parent().removeClass("help helpOpen").addClass("helpClose");
		return false;
	});
}
function openHelp(e){
	var target = e.target || e.srcElement;
	if ($(target).parent().hasClass("helpClose")) {
		$(target).parent().removeClass("helpClose").addClass("helpOpen");
	}
	else 
		$(target).parent().removeClass("helpOpen").addClass("helpClose");
	return false;
}
function createCloseGlossary(){
	var link = document.createElement("a"),
		linkText = document.createTextNode("Tancar");

		link.setAttribute("href","#");
		link.setAttribute("title","Tanca");
		link.className = "closeGlossary";
		link.appendChild(linkText);
		
	$(".uiglossary ~ .tooltip").append(link);
	$(".uiglossary ~ .tooltip .closeGlossary").click(function(){
		$(this).parent().parent().removeClass("glossary glossaryOpen").addClass("glossaryClose");
		return false;
	});
}
function openGlossary(e){
	var target = e.target || e.srcElement;
	if ($(target).parent().hasClass("glossaryClose")) {
		$(target).parent().removeClass("glossaryClose").addClass("glossaryOpen");
	}
	else 
		$(target).parent().removeClass("glossaryOpen").addClass("glossaryClose");
	return false;
}
function createLinkSelectAll(){
	var link = document.createElement("A"),
		linkText = $(".uiTableActionable .ui_remove-rows").val();
		
		link.setAttribute("href", "#");
		link.className = "ui_remove-rows";
		link.appendChild(document.createTextNode(linkText));
	$(".uiTableActionable").find("TR.actions .submitButtons").before(link).find(".ui_remove-rows").remove();
}
function createAddFile(){
	var button = document.createElement("input");
		button.setAttribute("type","button");
		button.setAttribute("disabled","disabled");
		button.setAttribute("value","Afegeix arxiu");
		button.className = "disabled";
	$(".ui_files-group:last-child .submitButtons").append(button);
		
}
function toggleLlistaText(){
	if ($(".ui_toggle-showList").html() == "Mostra llista") 
		$(".ui_toggle-showList").html("Oculta llista");
	else 
		$(".ui_toggle-showList").html("Mostra llista");
}

function toggleAdressEnv(){
	var link = $(".uiAdresaEnv");
	
	
	if($(".uiAdresaEnv")[0].tagName.toLowerCase() == "span"){
		adressEnvCreate(link);
	}
	else {
		adressEnvRemove(link);
	}
}
		function adressEnvRemove(link){
			var newLink = document.createElement("SPAN"),
				newLinkText = document.createTextNode(link.text());
				newLink.className = "disabled uiAdresaEnv";
				newLink.appendChild(newLinkText);
				
				$("#adrecaEnviament").addClass("closed").removeClass("opened");
				$(link).parent().removeClass("closed").append(newLink);
				$(link).remove();
		}
		function adressEnvCreate(link){
			var newLink = document.createElement("A"),
				newLinkText = document.createTextNode(link.text());
				newLink.className = "enabled uiAdresaEnv";
				newLink.setAttribute("href", "#adrecaEnviament");
				newLink.appendChild(newLinkText);
				
			$(link).parent().append(newLink);
			$(link).remove();
			
			$(newLink).one("click", function(){
				$(this).parent().removeClass("opened").addClass("closed");
				$("#adrecaEnviament").addClass("opened").removeClass("closed");
				return false;
			});
		}

function expandCollapsible(e){
	
	var element = e.target || e.srcElement,
		toElementClass = element.className.split("-").last(),
		toElement = $("."+toElementClass)[0];
		
	$(toElement).find(".closed").addClass("opened").removeClass("closed");
	
	//$(element).removeClass("ui_expand-collapsibleMore").addClass("ui_collapse-collapsibleLess");
	$(element).before("<a href='#' class='ui_collapse-collapsibleLess'>"+element.innerHTML+"</a>");
	$(element).remove();
	var events = new uiEvents();
		events.addEvent(".ui_collapse-collapsibleLess", 'click', function(e){ collapseCollapsible(e) });
	$(toElement).removeClass("collapsibleMore").addClass("collapsibleLess");
	return false;
}

function collapseCollapsible(e){
	var element =  e.target || e.srcElement,
		toElementClass = element.className.split("-").last(),
		toElement = $("."+toElementClass)[0];
		
	$(toElement).find(".opened").addClass("closed").removeClass("opened");
	
	$(element).before("<a href='#' class='ui_expand-collapsibleMore'>"+element.innerHTML+"</a>");
	$(element).remove();
	$(toElement).removeClass("collapsibleLess").addClass("collapsibleMore");
	return false;
}

/**
 * Metodos prototipados personales
 */
function extend(source, destination){
    var destination = destination || this;
    for (var _method in source) destination[_method] = source[_method];
    return destination;
}
Function.prototype.bind = function(scope){
	var _funtion = this;
	return function(){
		return _funtion.apply(scope, arguments);	
	}
}
String.prototype.trim = function(){
	return this.replace(/^\s+|\s+$/gi,"");
}
function extract(str1, str){
	var response = str1,
		indexOfString = str1.indexOf(str),
		indexOfFirstWhiteSpace = -1;
		
	if(str1.split(" ").length > 1 && indexOfString != -1){
		indexOfFirstWhiteSpace = str1.substring(indexOfString).indexOf(" ");
		if(indexOfFirstWhiteSpace == -1)
			response = str1.substring(indexOfString).substring(0);
		else
			response = str1.substring(indexOfString).substring(0, indexOfFirstWhiteSpace);
	}
	
	return response;
}
$.fn.last = function(){
	return this[this.length-1];
}
$.fn.toggleClasses = function(klass1, klass2){
	$(this).toggleClass(klass2).toggleClass(klass1);
}

Array.prototype.last = function(){
	return this[this.length-1];
}
var $A = function(iterable){
	var length = iterable.length || 0, 
		response = new Array(length);
	while (length--) response[length] = iterable[length];
	return response;
}
/*
function getRelativePath(){
	var src = document.getElementsByTagName("script");
	for(var i=0;i>src.length;i++){
		if(src[i].getAttribute("src").match(""))
	} 
}*/