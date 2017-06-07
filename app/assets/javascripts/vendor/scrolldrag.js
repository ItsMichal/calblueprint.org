/*! jquery.kinetic - v2.2.1 - 2015-09-09 http://the-taylors.org/jquery.kinetic
 * Copyright (c) 2015 Dave Taylor; Licensed MIT */
!function(a){"use strict";var b="kinetic-active";window.requestAnimationFrame||(window.requestAnimationFrame=function(){return window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1e3/60)}}()),a.support=a.support||{},a.extend(a.support,{touch:"ontouchend"in document});var c=function(b,c){return this.settings=c,this.el=b,this.$el=a(b),this._initElements(),this};c.DATA_KEY="kinetic",c.DEFAULTS={cursor:"grab",decelerate:!0,triggerHardware:!1,threshold:0,y:!0,x:!0,slowdown:.9,maxvelocity:40,throttleFPS:60,invert:!1,movingClass:{up:"kinetic-moving-up",down:"kinetic-moving-down",left:"kinetic-moving-left",right:"kinetic-moving-right"},deceleratingClass:{up:"kinetic-decelerating-up",down:"kinetic-decelerating-down",left:"kinetic-decelerating-left",right:"kinetic-decelerating-right"}},c.prototype.start=function(b){this.settings=a.extend(this.settings,b),this.velocity=b.velocity||this.velocity,this.velocityY=b.velocityY||this.velocityY,this.settings.decelerate=!1,this._move()},c.prototype.end=function(){this.settings.decelerate=!0},c.prototype.stop=function(){this.velocity=0,this.velocityY=0,this.settings.decelerate=!0,a.isFunction(this.settings.stopped)&&this.settings.stopped.call(this)},c.prototype.detach=function(){this._detachListeners(),this.$el.removeClass(b).css("cursor","")},c.prototype.attach=function(){this.$el.hasClass(b)||(this._attachListeners(this.$el),this.$el.addClass(b).css("cursor",this.settings.cursor))},c.prototype._initElements=function(){this.$el.addClass(b),a.extend(this,{xpos:null,prevXPos:!1,ypos:null,prevYPos:!1,mouseDown:!1,throttleTimeout:1e3/this.settings.throttleFPS,lastMove:null,elementFocused:null}),this.velocity=0,this.velocityY=0,a(document).mouseup(a.proxy(this._resetMouse,this)).click(a.proxy(this._resetMouse,this)),this._initEvents(),this.$el.css("cursor",this.settings.cursor),this.settings.triggerHardware&&this.$el.css({"-webkit-transform":"translate3d(0,0,0)","-webkit-perspective":"1000","-webkit-backface-visibility":"hidden"})},c.prototype._initEvents=function(){var b=this;this.settings.events={touchStart:function(a){var c;b._useTarget(a.target,a)&&(c=a.originalEvent.touches[0],b.threshold=b._threshold(a.target,a),b._start(c.clientX,c.clientY),a.stopPropagation())},touchMove:function(a){var c;b.mouseDown&&(c=a.originalEvent.touches[0],b._inputmove(c.clientX,c.clientY),a.preventDefault&&a.preventDefault())},inputDown:function(a){b._useTarget(a.target,a)&&(b.threshold=b._threshold(a.target,a),b._start(a.clientX,a.clientY),b.elementFocused=a.target,"IMG"===a.target.nodeName&&a.preventDefault(),a.stopPropagation())},inputEnd:function(a){b._useTarget(a.target,a)&&(b._end(),b.elementFocused=null,a.preventDefault&&a.preventDefault())},inputMove:function(a){b.mouseDown&&(b._inputmove(a.clientX,a.clientY),a.preventDefault&&a.preventDefault())},scroll:function(c){a.isFunction(b.settings.moved)&&b.settings.moved.call(b,b.settings),c.preventDefault&&c.preventDefault()},inputClick:function(a){return Math.abs(b.velocity)>0?(a.preventDefault(),!1):void 0},dragStart:function(a){return b._useTarget(a.target,a)&&b.elementFocused?!1:void 0},selectStart:function(c){return a.isFunction(b.settings.selectStart)?b.settings.selectStart.apply(b,arguments):b._useTarget(c.target,c)?!1:void 0}},this._attachListeners(this.$el,this.settings)},c.prototype._inputmove=function(b,c){{var d=this.$el;this.el}if((!this.lastMove||new Date>new Date(this.lastMove.getTime()+this.throttleTimeout))&&(this.lastMove=new Date,this.mouseDown&&(this.xpos||this.ypos))){var e=b-this.xpos,f=c-this.ypos;if(this.settings.invert&&(e*=-1,f*=-1),this.threshold>0){var g=Math.sqrt(e*e+f*f);if(this.threshold>g)return;this.threshold=0}this.elementFocused&&(a(this.elementFocused).blur(),this.elementFocused=null,d.focus()),this.settings.decelerate=!1,this.velocity=this.velocityY=0;var h=this.scrollLeft(),i=this.scrollTop();this.scrollLeft(this.settings.x?h-e:h),this.scrollTop(this.settings.y?i-f:i),this.prevXPos=this.xpos,this.prevYPos=this.ypos,this.xpos=b,this.ypos=c,this._calculateVelocities(),this._setMoveClasses(this.settings.movingClass),a.isFunction(this.settings.moved)&&this.settings.moved.call(this,this.settings)}},c.prototype._calculateVelocities=function(){this.velocity=this._capVelocity(this.prevXPos-this.xpos,this.settings.maxvelocity),this.velocityY=this._capVelocity(this.prevYPos-this.ypos,this.settings.maxvelocity),this.settings.invert&&(this.velocity*=-1,this.velocityY*=-1)},c.prototype._end=function(){this.xpos&&this.prevXPos&&this.settings.decelerate===!1&&(this.settings.decelerate=!0,this._calculateVelocities(),this.xpos=this.prevXPos=this.mouseDown=!1,this._move())},c.prototype._useTarget=function(b,c){return a.isFunction(this.settings.filterTarget)?this.settings.filterTarget.call(this,b,c)!==!1:!0},c.prototype._threshold=function(b,c){return a.isFunction(this.settings.threshold)?this.settings.threshold.call(this,b,c):this.settings.threshold},c.prototype._start=function(a,b){this.mouseDown=!0,this.velocity=this.prevXPos=0,this.velocityY=this.prevYPos=0,this.xpos=a,this.ypos=b},c.prototype._resetMouse=function(){this.xpos=!1,this.ypos=!1,this.mouseDown=!1},c.prototype._decelerateVelocity=function(a,b){return 0===Math.floor(Math.abs(a))?0:a*b},c.prototype._capVelocity=function(a,b){var c=a;return a>0?a>b&&(c=b):0-b>a&&(c=0-b),c},c.prototype._setMoveClasses=function(a){var b=this.settings,c=this.$el;c.removeClass(b.movingClass.up).removeClass(b.movingClass.down).removeClass(b.movingClass.left).removeClass(b.movingClass.right).removeClass(b.deceleratingClass.up).removeClass(b.deceleratingClass.down).removeClass(b.deceleratingClass.left).removeClass(b.deceleratingClass.right),this.velocity>0&&c.addClass(a.right),this.velocity<0&&c.addClass(a.left),this.velocityY>0&&c.addClass(a.down),this.velocityY<0&&c.addClass(a.up)},c.prototype._move=function(){var b=this._getScroller(),c=b[0],d=this,e=d.settings;e.x&&c.scrollWidth>0?(this.scrollLeft(this.scrollLeft()+this.velocity),Math.abs(this.velocity)>0&&(this.velocity=e.decelerate?d._decelerateVelocity(this.velocity,e.slowdown):this.velocity)):this.velocity=0,e.y&&c.scrollHeight>0?(this.scrollTop(this.scrollTop()+this.velocityY),Math.abs(this.velocityY)>0&&(this.velocityY=e.decelerate?d._decelerateVelocity(this.velocityY,e.slowdown):this.velocityY)):this.velocityY=0,d._setMoveClasses(e.deceleratingClass),a.isFunction(e.moved)&&e.moved.call(this,e),Math.abs(this.velocity)>0||Math.abs(this.velocityY)>0?this.moving||(this.moving=!0,window.requestAnimationFrame(function(){d.moving=!1,d._move()})):d.stop()},c.prototype._getScroller=function(){var b=this.$el;return(this.$el.is("body")||this.$el.is("html"))&&(b=a(window)),b},c.prototype.scrollLeft=function(a){var b=this._getScroller();return"number"!=typeof a?b.scrollLeft():(b.scrollLeft(a),void(this.settings.scrollLeft=a))},c.prototype.scrollTop=function(a){var b=this._getScroller();return"number"!=typeof a?b.scrollTop():(b.scrollTop(a),void(this.settings.scrollTop=a))},c.prototype._attachListeners=function(){var b=this.$el,c=this.settings;a.support.touch&&b.bind("touchstart",c.events.touchStart).bind("touchend",c.events.inputEnd).bind("touchmove",c.events.touchMove),b.mousedown(c.events.inputDown).mouseup(c.events.inputEnd).mousemove(c.events.inputMove),b.click(c.events.inputClick).scroll(c.events.scroll).bind("selectstart",c.events.selectStart).bind("dragstart",c.events.dragStart)},c.prototype._detachListeners=function(){var b=this.$el,c=this.settings;a.support.touch&&b.unbind("touchstart",c.events.touchStart).unbind("touchend",c.events.inputEnd).unbind("touchmove",c.events.touchMove),b.unbind("mousedown",c.events.inputDown).unbind("mouseup",c.events.inputEnd).unbind("mousemove",c.events.inputMove),b.unbind("click",c.events.inputClick).unbind("scroll",c.events.scroll).unbind("selectstart",c.events.selectStart).unbind("dragstart",c.events.dragStart)},a.Kinetic=c,a.fn.kinetic=function(b,d){return this.each(function(){var e=a(this),f=e.data(c.DATA_KEY),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data(c.DATA_KEY,f=new c(this,g)),"string"==typeof b&&f[b](d)})}}(window.jQuery||window.Zepto);
