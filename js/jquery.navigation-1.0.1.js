;+function($){
	$.event.special.open = {
		bindType : 'click',
		delegateType : 'click',
		handle : function(e){
			var data = $(this).data('ag.navigation');
			if(data.opened)
				return false;
			return e.handleObj.handler.apply(this, arguments);
		}
	};

	$.event.special.defaultLink = {
		delegateType : 'click',
		bindType : 'click',
		handle : function(e){
			return e.handleObj.handler.apply(this, arguments);
		}
	};

	$.event.special.resizeMenu = {
		delegateType : 'resize',
		bindType : 'resize',
		handle : function(e){
			return e.handleObj.handler.apply(this, arguments);
		}
	};
}(jQuery);

+function($){
	var header = '.nav-header',
		shadow = '.top-shadow',
		wrap = '.wrap',
		indentMenu = 8;

	var Navigate = function(element, options){
		this.$elem = $(element);
		this.options = options;
		this.container = '.wrap-navigation';
		this.screen;
		this.opened = false;
		this.open = false;
	};

	Navigate.VERSION = '1.0.1';
	Navigate.DEFAULTS = {
		height : 200,
		indent : 10,
		speedX : 300,
		speedY : 300,
		width : 200
	};

	Navigate.prototype.init = function(){
		this.fullWidth();
		this.setContainerSize();
		this.indentContent();
		this.setHeaderSize();
		this.setNavSize();
		this.setShadowWidth();
		this.setContentWidth();
		this.setWrapperWidth();
		this.transition();
	};

	Navigate.prototype.fullWidth = function(){
		this.screen = document.body.clientWidth;
	};

	Navigate.prototype.indentContent = function(){
		$('.nav-body').css('margin-left', this.options.indent);
	};

	Navigate.prototype.setHeaderSize = function(){
		$(header).outerWidth(this.options.width);
		$(header).outerHeight(this.options.height);
	};

	Navigate.prototype.setNavSize = function(){
		this.$elem.outerWidth(this.options.width);
		this.$elem.outerHeight(this.options.height);
	};

	Navigate.prototype.setShadowWidth = function(){
		$(shadow).outerWidth(this.options.width);
	};

	Navigate.prototype.calculateWidth = function(){
		return this.screen - this.options.width - this.options.indent;
	};

	Navigate.prototype.setContentWidth = function(){
		var width = this.calculateWidth(),
			content = this.$elem.parent().next();
		content.outerWidth(width);
	};

	Navigate.prototype.setWrapperWidth = function(){
		if($(this.container).is(':has("'+ wrap +'")')){
			$(wrap).outerWidth(this.screen);
		}
	};

	Navigate.prototype.setContainerSize = function(){
		$(this.container).outerWidth(this.options.width);
		$(this.container).outerHeight(this.options.height + indentMenu);
	};

	Navigate.prototype.openContent = function(){
		this.opened = true;
		this.openX();
		$(this.container).outerWidth(this.screen);
		this.active();
		this.showContent();
	};

	Navigate.prototype.changeContent = function(){
		this.active();
		this.showContent();
	};

	Navigate.prototype.openX = function(){
		$(this.container).css('transition', 'width ' + this.getSpeedX());
	};

	Navigate.prototype.openY = function(){
		$(this.container).css('transition', 'height ' + this.getSpeedY());
	};

	Navigate.prototype.getSpeedX = function(){
		var speed = this.options.speedX / 1000;
		if(speed >= 1)
			speed = parseInt(speed, 10) + 's';
		else{
			speed += "";
			speed = speed.substr(-1, 1);
			speed = '.' + speed + 's';
		}

		return speed;
	};

	Navigate.prototype.getSpeedY = function(){
		var speed = this.options.speedY / 1000;
		if(speed >= 1)
			speed = parseInt(speed, 10) + 's';
		else{
			speed += "";
			speed = speed.substr(-1, 1);
			speed = '.' + speed + 's';
		}

		return speed;
	};

	Navigate.prototype.transition = function(){
		var that = this;
		$(this.container).on('transitionend oTransitionEnd webkitTransitionEnd', function(){
			var curHeight = $(this).outerHeight(),
				maxHeight = $('.nav-body').outerHeight() + indentMenu;
			if(curHeight < maxHeight){
				that.openY();
				$(this).outerHeight(maxHeight);
			}else{
				that.opened = false;
				that.open = true;
			}
		});
	};

	Navigate.prototype.active = function(){
		var childs = this.$elem.children('li');
		childs.removeClass('active');
		(this.target.is('a') ? this.target.parent().addClass('active') : this.target.addClass('active'));
	};

	Navigate.prototype.showContent = function(){
		var href = (this.target.is('a') ? this.target.attr('href') : this.target.children().attr('href')),
			target = $(href);
		target.parent().children().removeClass('show');
		target.parent().children().addClass('hide');
		target.removeClass('hide').addClass('show');
	};

	Navigate.prototype.resize = function(){
		this.fullWidth();
		this.setWrapperWidth();
		this.setContentWidth();
		$(this.container).outerWidth(this.screen);
	};

	var Plugin = function(options){
		return this.each(function(){
			var $this = $(this),
				data = $this.data('ag.navigation'),
				option = $.extend({}, Navigate.DEFAULTS, $this.data(), (options || {}));
			if(!data){
				$this.data('ag.navigation', (data = new Navigate(this, option)));
			}

			if(!data.action){
				data.init();
				return;
			}

			var action = data.action;
			data[action]();
		});
	};

	$.fn.navigate = Plugin;
	$.fn.navigate.Constructor = Navigate;

	var clickHandler = function(e){
		var data = $(this).data('ag.navigation');
		data.target = $(e.target);
		if(!data.open)
			data.action = 'openContent';
		else
			data.action = 'changeContent';
		Plugin.call($(this));
	};

	var handler = function(e){
		e.preventDefault();
	};

	var resizeHandler = function(e){
		var data = $('ul.navigation').data('ag.navigation');
		data.action = 'resize';
		Plugin.call($('ul.navigation'));
	};

	$(document).on('open', 'ul.navigation', clickHandler);
	$(document).on('defaultLink', 'a.default', handler);
	$(window).on('resizeMenu', resizeHandler);
}(jQuery);