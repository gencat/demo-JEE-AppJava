/**
 * **********************************************
 * File: uiEvents.js
 * Description: Framework of simple events and effects.
 * 				Contains the interface class and Events class.
 * Author: David P. Luna (dprados@oesia.com)
 * Date creation: 22 12 2009
 * Date modified: 26 01 2010 
 * **********************************************
 */
var uiInterface = function(){
	return {
		klass: {
			visible: "opened",
			hidden: "closed"
		},
		event: {
			type: null,
			target: null,
			eventDOM: null,
			event: null
		},
		show: function(){
			var element = this.event.target,
				toElementClass = element.className.split("-").last(),
				toElement = $("."+toElementClass)[0];
				
			if($(toElement).hasClass(this.klass.hidden))
				$(toElement).removeClass(this.klass.hidden)
				
			$(toElement).addClass(this.klass.visible);
			return false;
		},
		hide: function(){
			var element = this.event.target,
				toElementClass = element.className.split("-").last(),
				toElement = $("."+toElementClass)[0];
			if ($(toElement).hasClass(this.klass.visible)) {
				$(toElement).removeClass(this.klass.visible)
			}
			$(toElement).addClass(this.klass.hidden);
			
			return false;
		},
		toggle: function(){
			var element = this.event.target,
				toElementClass = element.className.split("-").last(),
				toElement = $("."+toElementClass)[0];
				
			if($(toElement).hasClass(this.klass.hidden) || $(toElement).hasClass(this.klass.visible))
				$(toElement).toggleClass(this.klass.hidden).toggleClass(this.klass.visible);
			else if($(toElement).is(":visible"))
				$(toElement).toggleClass(this.klass.hidden);
			else
				$(toElement).toggleClass(this.klass.visible);
		},
		enable: function(){
			var element = this.event.target,
				toElementClass = element.className.split("-").last(),
				toElement = $("."+toElementClass)[0],
				labelledby = ($("LABEL[for='"+$(toElement).attr("id")+"']") || false);
				
			if ($(element).is(":checked")) {
				$(toElement).attr("disabled", "");
				if($(toElement).hasClass("disabled"))
					$(toElement).removeClass("disabled").addClass("enabled");
				if(labelledby)
					$(labelledby).removeClass("disabled").addClass("enabled");
			}
		},
		disable: function(){
			var element = this.event.target,
				toElementClass = element.className.split("-").last(),
				toElement = $("."+toElementClass)[0],
				labelledby = ($("LABEL[for='"+$(toElement).attr("id")+"']") || false);
				
			if (!$(element).is(":checked")) {
				$(toElement).attr("disabled", "disabled");
				if($(toElement).hasClass("disabled"))
					$(toElement).removeClass("disabled").addClass("enabled");
				if(labelledby)
					$(labelledby).addClass("disabled").removeClass("enabled");
			}
		},
		checkAll: function(){
			var element = this.event.target,
				toElementClass = element.className.split("-").last(),
				toElement = $(element).parents("TABLE");
			toElement.find("TBODY :checkbox:enabled").attr("checked", "checked");
			
			if(toElement.find("THEAD :checkbox").attr("checked") == false) toElement.find("THEAD :checkbox").attr("checked", "checked");
			return false;
		},
		uncheckAll: function(){
			var element = this.event.target,
				toElementClass = element.className.split("-").last(),
				toElement = $(element).parents("TABLE");
			toElement.find("TBODY :checkbox:enabled").removeAttr("checked");
			if(toElement.find("THEAD :checkbox").attr("checked") == true) toElement.find("THEAD :checkbox").attr("checked");
			return false;
		},
		toggleCheckAll: function(){
			var element = this.event.target;
			
			if(element.checked)
				this.checkAll();
			else
				this.uncheckAll();
		},
		remove: function(){
			var element = this.event.target,
				toElementClass = element.className.split("-").last(),
				toElement = null;
			switch(toElementClass){
				case 'rows': 
					toElement = $(element).parents("TABLE").find("TBODY TR");
					break;
				case 'row':
					toElement = $(element).parents("TR:first");
					break;
				case 'selectedRows':
					 toElement = $(element).parent().parent().prev().find("TBODY TR:has(:checkbox:checked)");
					break;
				default:
					toElement = $("."+toElementClass);
			}
			
			toElement.each(function(index, element){
				if(this.tagName.toUpperCase() == "TR")
					toElement.children().fadeOut("normal", function(){$(this).parent().remove()});
				else
					toElement.fadeOut("normal", function(){$(this).remove()});
			});
			return false;
		}
	}
}
uiEvents = function(){};
uiEvents.prototype = {
	events: {},
	cacheEvents: [],
	addEvent: function(selector, ev, ty/*, extraOptions*/){
		if($(selector).length < 1) return false;
			
		var name = selector,
			response = false,
			args = $A(arguments);
			callback = function(){},
			klasses = {};
			
		if (typeof args.last() == "object") {
			callback = 'callback' in args.last() ? args.last().callback : function(){};
			klasses = 'classes' in args.last() ? args.last().classes : {};
		}
		
		/**
		 * Si el selector tiene varios elementos...
		 */
		if($(selector).length > 1 || selector in this.events){
			$(selector).each(function(index, item){
				var _args = args,
					klass = extract(item.className, "ui_");
					_args[0] = "."+klass+":eq("+index+")";
				this.addEvent.apply(this, _args);
			}.bind(this));
		}
		else if(typeof ty == "string" && ty.split(",").length > 1) {
			var fxs = ty.split(",");
			$.each(fxs, function(index, fx){
				var _args = args;
					_args[2] = fx.trim();
				this.addEvent.apply(this, _args);
			}.bind(this));
		}
		else {
			this.events[name] = {};
			
			extend(new uiInterface(), this.events[name]);
			extend(klasses, this.events[name].klass);
			
			this.events[name].name = name;
			this.events[name].event.initialTarget = $(selector)[0];
			this.events[name].event.target = null;
			this.events[name].event.type = ev;
			this.events[name].callback = callback;

			this.events[name].event.effect = ty;
			var noCancel = true;
			
			$(selector).bind(ev + ".uiEvent", function(event){
				this.event.eventDOM = event;
				this.event.target = $(event.target || event.srcElement)[0];
				
				if(typeof this.event.effect != "function" && !this.event.effect.match(/\./g))
					noCancel = this[this.event.effect]();
				else if(typeof this.event.effect != "function" && this.event.effect.match(/\./g))
					noCancel = this[this.event.effect.split(".")[0]][this.event.effect.split(".")[1]].call(this);
				else
					noCancel = this.event.effect.call(event.target, this.event.eventDOM, this);
				
				this.callback();
				
				return noCancel;
			}.bind(this.events[name]));
			
			response = this.events[name];
		}
		
		return response;
	},
	fire: function(selector){
		if (this.events[selector]) {
			$(this.events[selector].name).trigger(this.events[selector].event.type + ".uiEvent");
			this.cacheEvent(selector); //Para saber qué eventos se han disparado automáticamente al cargar la página
		}
		else {
			var parsedEventName = "";
			for(var eventName in this.events) {
				parsedEventName = eventName.replace(/(:\S+)/, "");
				if (parsedEventName == selector && !(selector in this.firedEvents))
					this.fire(eventName);
			}
			
		}
	},
	cacheEvent: function(selector){
		this.cacheEvents.push(selector);
	}
}