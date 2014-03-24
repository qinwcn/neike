var SideMenuView = function (store,where){

	this.initialize = function() {
	
		
	  switch(where)
	  {
	     case "home":
		 this.el = $('<div/>');
		 break;
		 
		 case "sub":
		 this.el = $('<div/>');
		 break;
	  }

	};
	
	this.render = function() {
	  var self=this;
	  switch(where)
	  {
	     case "home":
			store.findAll(function(clean_list){
				self.el.html(SideMenuView.homeTemplate(clean_list));
			});
			return this;
		 break;
		 
		 case "sub":
			this.el.html(SideMenuView.subTemplate());
			return this;
		 break;
	  }
	};
	
	this.setFilterMenu=function(){
	    var self=this;
		store.findAllFilter(function(items){
			self.el.find(".filter_items").html(SideMenuView.filterMenu(items));
		});
		
		return self;
	}

		
	this.setSubMenu = function(){
		var self=this;
		store.findByNameWithFilter(window.keyWord, window.filterIds,function(items) {
			self.el.find(".subMenu-list").html(SideMenuView.liTemplate(items));
			//set up highlight
			self.el.find(".subMenu-list>li").each(function(){
				var hash = window.location.hash;
				if(hash==$(this).children("a").attr('href')){
					$(this).addClass("selected");
				}
			});
			
		});
		
		return this;
	};
	

	
	this.initialize();
}

SideMenuView.homeTemplate = Handlebars.compile($("#home-menu-tpl").html());
SideMenuView.subTemplate = Handlebars.compile($("#sub-menu-tpl").html());
SideMenuView.liTemplate = Handlebars.compile($("#menu-li-tpl").html());
SideMenuView.filterMenu=Handlebars.compile($("#filterMenu-li-tpl").html());
