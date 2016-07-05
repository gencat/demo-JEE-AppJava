/**
 * **********************************************
 * File: guia-aplicacions.js
 * Description: Document.ready
 * Author: David P. Luna (dprados@oesia.com)
 * Date creation: 22 12 2009
 * Date modified: 26 01 2010
 * **********************************************
 */

(function(){
    var isSupported = document.getElementById && document.getElementsByTagName;
    if(isSupported){
        document.documentElement.className = "js";
    }
	
})();
$(document).ready(function(){
	
	js();
	
	try {
		/**
		 * Sortables se inicializan en el archivos sorttable.class.js
		 **/
		
	}
	catch (e) {}
	try {
		var mainNav = new MainNavigation().init("#navMain>UL", { options: "LI", optionsWrapper: "UL", toggleClass: "FW_subNav-visible" });
	} 
	catch (e) {}
	
	try {
		var collapsable = new Collapsable().init("collapsibleOpen", "collapsibleClose",".collapsible H6, .collapsible H5, .collapsible H4, .collapsible .itemCollapsible");
	} 
	catch (e) {}
	
	try {
		var innerNav = new InnerNavigation().init("#nav UL:first");
	} 
	catch (e) {}
		
	try {
		var mixedSelects = new MixedSelects().init(".ui_mixedSelect:eq(0)", ".ui_mixedSelect:eq(1)");
	}
	catch(e){}
	
	try {
		var tab1 = new Tab().init(".navTabs");
	}
	catch(e){}
	
	try {
		$.datepicker.setDefaults($.datepicker['regional']['ca']);
		$('.ui_Datepicker').datepicker({
			changeMonth: true,
			changeYear: true,
			showOn: 'button',
			/*buttonImage: '../css/imgs/icoCalendar.gif',*/
			/*buttonImageOnly: true,*/
			showButtonPanel: true
		});
	}
	catch(e){}
	
	try {
		var events = new uiEvents();
			events.addEvent(".ui_toggle-showList", 'click', 'toggle', { callback: toggleLlistaText });
			events.addEvent(".ui_hide-showList", 'click', 'hide', { callback: toggleLlistaText });
			events.addEvent(".uihelp", 'click', function(e){return openHelp(e);});
			events.addEvent(".uiglossary", 'click', function(e){return openGlossary(e);});
	
			events.addEvent(".ui_enable-uieMobil4", 'click', 'enable, disable');
			events.addEvent(".ui_enable-uieNumTelf4", 'click', 'enable, disable');
			events.addEvent(".ui_enable-uieAdresa4", 'click', 'enable, disable');
			events.addEvent(".ui_toggle-uiAdresaEnv", 'click', function(){ return toggleAdressEnv(); });
	
			events.addEvent(".ui_show-showCaracteristiques", 'click', 'show');
			events.addEvent(".ui_hide-showCaracteristiques", 'click', 'hide');
			
			events.addEvent("input[type=checkbox].ui_checkAll", 'click', 'toggleCheckAll');
			events.addEvent("A.ui_checkAll", 'click', 'checkAll');
			events.addEvent(".ui_uncheckAll", 'click', 'uncheckAll');
			events.addEvent(".ui_remove-selectedRows", 'click', 'remove');
			events.addEvent(".ui_remove-row", 'click', 'remove');
			
			/*events.addEvent(".ui_hide-uihelpInfoG", 'click', 'hide', {classes: { visible: "openedAbsolute" }});
			events.addEvent(".ui_show-uihelpInfoG", 'click', 'show', {classes: { visible: "openedAbsolute" }});*/
	}
	catch(e){
		//throw "Clase uiEvents no está cargada.";
	}
});

function js(){
	$(".uieAdresa4, .uieMobil4, .uieNumTelf4, .uiAddFile").attr("disabled","disabled");
	$("label[for='eAdresa4'], label[for='eMobil4'], label[for='eNumTelf4']").addClass("disabled");
	
	$(".uiAdresaEnv").parent().removeClass("closed").addClass("opened");
	$("#adrecaEnviament").removeClass("opened").addClass("closed");
	$("span.help").removeClass("help").addClass("helpClose");
	$("span.glossary").removeClass("glossary").addClass("glossaryClose");
	
	//No lo hacemos con CSS puesto que al desaparecer la columna también tiene que desaparecer cada td corresponiendo y repetiriamos muchísimo la clase.
	$(".ui_showHiddenCells").find("td.hidden, th.hidden").removeClass("hidden");
	
	//createLinkSelectAll();
	createCloseHelp();
	createCloseGlossary();
	createAddFile();
	$(".ui_files-group:not(:last-child)").remove();
	
	if($("#formulari").length > 0){
		var _style = document.createElement("style");
			_style.setAttribute("type", "text/css");
			_style.appendChild(document.createTextNode(".overlay {opacity: .7;filter: alpha(Opacity='70');}"));
		document.getElementsByTagName("head")[0].appendChild(_style);
	}
	$("#formulari").submit(function(){
		var modal = document.createElement("div"),
			overlay = document.createElement("div"),
			modalWrapper = document.createElement("div"),
			_blockquote = document.createElement("blockquote"),
			_p = document.createElement("p"),
			_pText = document.createTextNode("Processant informació");
			modal.setAttribute("id", "modalWindow");
			overlay.setAttribute("id", "overlay");
			overlay.className = "overlay";
			modalWrapper.setAttribute("id", "processing");
			modalWrapper.className = "processing";
				_p.appendChild(_pText);
				_blockquote.appendChild(_p);
				modalWrapper.appendChild(_blockquote);
				modal.appendChild(overlay);
				modal.appendChild(modalWrapper);
			document.getElementsByTagName("body")[0].appendChild(modal);
		return false;
	});
	
	/*INPUT FILE*/
	/*if($.browser.msie && $.browser.version >= 8.0)
		$(".inputFile").addClass("hidden");
		*/
	//$(".pseudoInputFile").click(function(){
		//$(this).parents(".ui_files-group").find(".inputFile")[0].click();
	//});
	$(".inputFile").change(function(){
		$(this).next().val(this.value);
		$(this).parents(".ui_files-group").find(".submitButtons .disabled").removeAttr("disabled").removeClass("disabled");
	});
	
}