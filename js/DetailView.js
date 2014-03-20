var DetailView = function(store, item) {
 
    this.initialize = function() {
		var self=this;
        this.el = $('<div/>');
		this.el.on('click', '.showmenu', function(){self.snap().open('left');});
		this.el.on('tap', '.sub-menu-item',function(e){
				window.location.hash=$(e.target).attr('href');
		});
		this.el.on('click','.bt_prev',function(){
			var obj=$(".selected").prev().children("a").attr("href");
			if(obj!=undefined){
				//alert(obj);
				window.location.hash=obj;
			}else{
				alert("No More");
			}
		});
		this.el.on('click','.bt_next',function(){
			var obj=$(".selected").next().children("a").attr("href");
			if(obj!=undefined){
			//alert(obj);
				window.location.hash=obj;
			}else{
				alert("No More");
			}
		});
    };
	
	this.render = function() {
		this.el.html(DetailView.template());
		return this;
	};
	
	this.renderDetail =function() {
		this.el.find(".details").html(DetailView.detail(item));
		return this;
	};
	
	
	this.builder = function () {
		var headerV=new HeaderView(store,'sub').render().el;
		//var footerV=new FooterView(store).render().el;
		var sideMenuV=new SideMenuView(store,'sub').render().setSubMenu().el;
		
		this.el.children('#content').children('header').html(headerV);
		this.el.children('#left_div').html(sideMenuV);
		//this.el.children('#footer').html(footerV);
		return this;
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
 
DetailView.template = Handlebars.compile($("#item-tpl").html());
DetailView.detail = Handlebars.compile($("#detail-tpl").html());