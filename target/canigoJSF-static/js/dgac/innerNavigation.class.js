/**
 * **********************************************
 * File: innerNavigation.js
 * Description: Inner navigation class. Expand and collapse submenus.
 * Author: David P. Luna (dprados@oesia.com)
 * Date creation: 28 12 2009
 * Date modified: 26 01 2010
 * **********************************************
 */
function InnerNavigation(){};
InnerNavigation.prototype = {
	klass: {
		currentItem: 'selected',
		currentTarget: 'opened',
		closeTarget: 'closed'
	},
	targetedItems: [], 
	init: function(selector){
		this.navigation = $(selector);
		this.targetedItems = this.navigation.find("LI:has(UL) > A");
		
		extend(arguments[1], this.klass);
		
		this.fire();
		return this;
	},
	fire: function(){
		this.targetedItems.click(function(event){ this.toggleNav(event) }.bind(this));
		this.navigation.find("LI:not(.selected)").find("UL").addClass("closed");
		this.navigation.find("LI.selected > UL").addClass("opened");
	},
	toggleNav: function(event){
		var target = event.target.parentNode || event.srcElement.parentNode,
			that = this;
		$(target).toggleClass("selected");
		if(!$(target).children("div").children().children("ul").is(":visible"))
			$(target).children("div").children().children("ul").slideDown(function(){
				$(this).addClass(that.klass.currentTarget).removeClass(that.klass.closeTarget);
				$(this).removeAttr("style");
			});
		else
			$(target).children("div").children().children("ul").slideUp(function(){
				$(this).addClass(that.klass.closeTarget).removeClass(that.klass.currentTarget);
				$(this).removeAttr("style");
			});
		return false;
	}
}