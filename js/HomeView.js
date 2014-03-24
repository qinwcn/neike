var HomeView = function(store) {
 
    this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
		var self=this;
        this.el = $('<div/>');
		this.el.on('keyup', '.search-key', this.findByName);
		this.el.on('click','.search-key',function(){$('.search-key').val("");});
		this.el.on('click', '.showmenu', function(){self.snap().open('left');} );
		this.el.on('tap', '.home_menu', this.findByClickMenu);
		this.el.on('tap', '.filter_menu', this.findByClickFilterMenu);
		this.el.on('tap', '.home_list_item',function(e){
				window.location.hash=$(e.target).attr('url');
		});
	
    };
	
	this.render = function() {
		this.el.html(HomeView.template());
		return this;	
	};
	
	this.builder = function () {
		var headerV=new HeaderView(store,'home').render().el;
		//var footerV=new FooterView(store).render().el;
		var sideMenuV=new SideMenuView(store,'home').render().setFilterMenu().el;
		this.el.children('#content').children('header').html(headerV);
		this.el.children('#left_div').html(sideMenuV);
		//this.el.children('#footer').html(footerV);
		return this;
	};
	
	this.findByClickMenu = function(e) {
	    //update keyword
		var self=this;
	    window.keyWord=$(e.target).html();
		window.filterIds="";
		store.findByNameWithFilter(window.keyWord, window.filterIds, function(items) {
			$('.item-list').html(HomeView.liTemplate(items));
			self.iscrollcontent = new IScroll('.scroll',{tap:true});
		});
	};
	
	
	this.findByClickFilterMenu=function(e){
		var self=this;
		window.keyWord="";
		window.filterIds=$(e.target).attr('filter_id');
		store.findByNameWithFilter(window.keyWord, window.filterIds, function(items) {
			$('.item-list').html(HomeView.liTemplate(items));
			self.iscrollcontent = new IScroll('.scroll',{tap:true});
		});
	};

	
	this.findByName = function() {
	    var self=this;
		var keyword=$('.search-key').val();
		window.filterIds = "";
		if(keyword.trim().length>0){
			window.keyWord=keyword;
			store.findByNameWithFilter(window.keyWord,window.filterIds, function(items) {
				$('.item-list').html(HomeView.liTemplate(items));
				self.iscrollcontent = new IScroll('.scroll',{tap:true});
			});
		}
	};
	
	this.snap = function(){
		var self=this;
		if(!self.snapper){
			self.snapper = new Snap({
                element: document.getElementById('content'),
				disable: 'right'
            });
		}
		return self.snapper;
	};
	
 
    this.initialize();
 
}
 
HomeView.template = Handlebars.compile($("#home-tpl").html());
HomeView.liTemplate = Handlebars.compile($("#item-li-tpl").html());
