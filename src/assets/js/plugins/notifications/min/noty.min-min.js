/*!
 @package noty - jQuery Notification Plugin
 @version version: 2.3.5
 @contributors https://github.com/needim/noty/graphs/contributors

 @documentation Examples and Documentation - http://needim.github.com/noty/

 @license Licensed under the MIT licenses: http://www.opensource.org/licenses/mit-license.php
 */
!function(t,o){"function"==typeof define&&define.amd?define(["jquery"],o):"object"==typeof exports?module.exports=o(require("jquery")):o(t.jQuery)}(this,function(t){"function"!=typeof Object.create&&(Object.create=function(t){function o(){}return o.prototype=t,new o});var o={init:function(o){return this.options=t.extend({},t.noty.defaults,o),this.options.layout=this.options.custom?t.noty.layouts.inline:t.noty.layouts[this.options.layout],t.noty.themes[this.options.theme]?this.options.theme=t.noty.themes[this.options.theme]:o.themeClassName=this.options.theme,delete o.layout,delete o.theme,this.options=t.extend({},this.options,this.options.layout.options),this.options.id="noty_"+(new Date).getTime()*Math.floor(1e6*Math.random()),this.options=t.extend({},this.options,o),this._build(),this},_build:function(){var o=t('<div class="noty_bar noty_type_'+this.options.type+'"></div>').attr("id",this.options.id);if(o.append(this.options.template).find(".noty_text").html(this.options.text),this.$bar=null!==this.options.layout.parent.object?t(this.options.layout.parent.object).css(this.options.layout.parent.css).append(o):o,this.options.themeClassName&&this.$bar.addClass(this.options.themeClassName).addClass("noty_container_type_"+this.options.type),this.options.buttons){this.options.closeWith=[],this.options.timeout=!1;var e=t("<div/>").addClass("noty_buttons");null!==this.options.layout.parent.object?this.$bar.find(".noty_bar").append(e):this.$bar.append(e);var n=this;t.each(this.options.buttons,function(o,e){var i=t("<button/>").addClass(e.addClass?e.addClass:"gray").html(e.text).attr("id",e.id?e.id:"button-"+o).appendTo(n.$bar.find(".noty_buttons")).on("click",function(o){t.isFunction(e.onClick)&&e.onClick.call(i,n,o)})})}this.$message=this.$bar.find(".noty_message"),this.$closeButton=this.$bar.find(".noty_close"),this.$buttons=this.$bar.find(".noty_buttons"),t.noty.store[this.options.id]=this},show:function(){var o=this;return o.options.custom?o.options.custom.find(o.options.layout.container.selector).append(o.$bar):t(o.options.layout.container.selector).append(o.$bar),o.options.theme&&o.options.theme.style&&o.options.theme.style.apply(o),"function"===t.type(o.options.layout.css)?this.options.layout.css.apply(o.$bar):o.$bar.css(this.options.layout.css||{}),o.$bar.addClass(o.options.layout.addClass),o.options.layout.container.style.apply(t(o.options.layout.container.selector)),o.showing=!0,o.options.theme&&o.options.theme.style&&o.options.theme.callback.onShow.apply(this),t.inArray("click",o.options.closeWith)>-1&&o.$bar.css("cursor","pointer").one("click",function(t){o.stopPropagation(t),o.options.callback.onCloseClick&&o.options.callback.onCloseClick.apply(o),o.close()}),t.inArray("hover",o.options.closeWith)>-1&&o.$bar.one("mouseenter",function(){o.close()}),t.inArray("button",o.options.closeWith)>-1&&o.$closeButton.one("click",function(t){o.stopPropagation(t),o.close()}),-1==t.inArray("button",o.options.closeWith)&&o.$closeButton.remove(),o.options.callback.onShow&&o.options.callback.onShow.apply(o),"string"==typeof o.options.animation.open?(o.$bar.css("height",o.$bar.innerHeight()),o.$bar.show().addClass(o.options.animation.open).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){o.options.callback.afterShow&&o.options.callback.afterShow.apply(o),o.showing=!1,o.shown=!0})):o.$bar.animate(o.options.animation.open,o.options.animation.speed,o.options.animation.easing,function(){o.options.callback.afterShow&&o.options.callback.afterShow.apply(o),o.showing=!1,o.shown=!0}),o.options.timeout&&o.$bar.delay(o.options.timeout).promise().done(function(){o.close()}),this},close:function(){if(!(this.closed||this.$bar&&this.$bar.hasClass("i-am-closing-now"))){var o=this;if(this.showing)return void o.$bar.queue(function(){o.close.apply(o)});if(!this.shown&&!this.showing){var e=[];return t.each(t.noty.queue,function(t,n){n.options.id!=o.options.id&&e.push(n)}),void(t.noty.queue=e)}o.$bar.addClass("i-am-closing-now"),o.options.callback.onClose&&o.options.callback.onClose.apply(o),"string"==typeof o.options.animation.close?o.$bar.addClass(o.options.animation.close).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){o.options.callback.afterClose&&o.options.callback.afterClose.apply(o),o.closeCleanUp()}):o.$bar.clearQueue().stop().animate(o.options.animation.close,o.options.animation.speed,o.options.animation.easing,function(){o.options.callback.afterClose&&o.options.callback.afterClose.apply(o)}).promise().done(function(){o.closeCleanUp()})}},closeCleanUp:function(){var o=this;o.options.modal&&(t.notyRenderer.setModalCount(-1),0==t.notyRenderer.getModalCount()&&t(".noty_modal").fadeOut("fast",function(){t(this).remove()})),t.notyRenderer.setLayoutCountFor(o,-1),0==t.notyRenderer.getLayoutCountFor(o)&&t(o.options.layout.container.selector).remove(),"undefined"!=typeof o.$bar&&null!==o.$bar&&("string"==typeof o.options.animation.close?(o.$bar.css("transition","all 100ms ease").css("border",0).css("margin",0).height(0),o.$bar.one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){o.$bar.remove(),o.$bar=null,o.closed=!0,o.options.theme.callback&&o.options.theme.callback.onClose&&o.options.theme.callback.onClose.apply(o)})):(o.$bar.remove(),o.$bar=null,o.closed=!0)),delete t.noty.store[o.options.id],o.options.theme.callback&&o.options.theme.callback.onClose&&o.options.theme.callback.onClose.apply(o),o.options.dismissQueue||(t.noty.ontap=!0,t.notyRenderer.render()),o.options.maxVisible>0&&o.options.dismissQueue&&t.notyRenderer.render()},setText:function(t){return this.closed||(this.options.text=t,this.$bar.find(".noty_text").html(t)),this},setType:function(t){return this.closed||(this.options.type=t,this.options.theme.style.apply(this),this.options.theme.callback.onShow.apply(this)),this},setTimeout:function(t){if(!this.closed){var o=this;this.options.timeout=t,o.$bar.delay(o.options.timeout).promise().done(function(){o.close()})}return this},stopPropagation:function(t){t=t||window.event,"undefined"!=typeof t.stopPropagation?t.stopPropagation():t.cancelBubble=!0},closed:!1,showing:!1,shown:!1};t.notyRenderer={},t.notyRenderer.init=function(e){var n=Object.create(o).init(e);return n.options.killer&&t.noty.closeAll(),n.options.force?t.noty.queue.unshift(n):t.noty.queue.push(n),t.notyRenderer.render(),"object"==t.noty.returns?n:n.options.id},t.notyRenderer.render=function(){var o=t.noty.queue[0];"object"===t.type(o)?o.options.dismissQueue?o.options.maxVisible>0?t(o.options.layout.container.selector+" li").length<o.options.maxVisible&&t.notyRenderer.show(t.noty.queue.shift()):t.notyRenderer.show(t.noty.queue.shift()):t.noty.ontap&&(t.notyRenderer.show(t.noty.queue.shift()),t.noty.ontap=!1):t.noty.ontap=!0},t.notyRenderer.show=function(o){o.options.modal&&(t.notyRenderer.createModalFor(o),t.notyRenderer.setModalCount(1)),o.options.custom?0==o.options.custom.find(o.options.layout.container.selector).length?o.options.custom.append(t(o.options.layout.container.object).addClass("i-am-new")):o.options.custom.find(o.options.layout.container.selector).removeClass("i-am-new"):0==t(o.options.layout.container.selector).length?t("body").append(t(o.options.layout.container.object).addClass("i-am-new")):t(o.options.layout.container.selector).removeClass("i-am-new"),t.notyRenderer.setLayoutCountFor(o,1),o.show()},t.notyRenderer.createModalFor=function(o){if(0==t(".noty_modal").length){var e=t("<div/>").addClass("noty_modal").addClass(o.options.theme).data("noty_modal_count",0);o.options.theme.modal&&o.options.theme.modal.css&&e.css(o.options.theme.modal.css),e.prependTo(t("body")).fadeIn("fast"),t.inArray("backdrop",o.options.closeWith)>-1&&e.on("click",function(o){t.noty.closeAll()})}},t.notyRenderer.getLayoutCountFor=function(o){return t(o.options.layout.container.selector).data("noty_layout_count")||0},t.notyRenderer.setLayoutCountFor=function(o,e){return t(o.options.layout.container.selector).data("noty_layout_count",t.notyRenderer.getLayoutCountFor(o)+e)},t.notyRenderer.getModalCount=function(){return t(".noty_modal").data("noty_modal_count")||0},t.notyRenderer.setModalCount=function(o){return t(".noty_modal").data("noty_modal_count",t.notyRenderer.getModalCount()+o)},t.fn.noty=function(o){return o.custom=t(this),t.notyRenderer.init(o)},t.noty={},t.noty.queue=[],t.noty.ontap=!0,t.noty.layouts={},t.noty.themes={},t.noty.returns="object",t.noty.store={},t.noty.get=function(o){return t.noty.store.hasOwnProperty(o)?t.noty.store[o]:!1},t.noty.close=function(o){return t.noty.get(o)?t.noty.get(o).close():!1},t.noty.setText=function(o,e){return t.noty.get(o)?t.noty.get(o).setText(e):!1},t.noty.setType=function(o,e){return t.noty.get(o)?t.noty.get(o).setType(e):!1},t.noty.clearQueue=function(){t.noty.queue=[]},t.noty.closeAll=function(){t.noty.clearQueue(),t.each(t.noty.store,function(t,o){o.close()})};var e=window.alert;return t.noty.consumeAlert=function(o){window.alert=function(e){o?o.text=e:o={text:e},t.notyRenderer.init(o)}},t.noty.stopConsumeAlert=function(){window.alert=e},t.noty.defaults={layout:"top",theme:"defaultTheme",type:"alert",text:"",dismissQueue:!0,template:'<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',animation:{open:{height:"toggle"},close:{height:"toggle"},easing:"swing",speed:500},timeout:!1,force:!1,modal:!1,maxVisible:5,killer:!1,closeWith:["click"],callback:{onShow:function(){},afterShow:function(){},onClose:function(){},afterClose:function(){},onCloseClick:function(){}},buttons:!1},t(window).on("resize",function(){t.each(t.noty.layouts,function(o,e){e.container.style.apply(t(e.container.selector))})}),window.noty=function(o){return t.notyRenderer.init(o)},t.noty.layouts.bottom={name:"bottom",options:{},container:{object:'<ul id="noty_bottom_layout_container" />',selector:"ul#noty_bottom_layout_container",style:function(){t(this).css({bottom:0,left:"5%",position:"fixed",width:"90%",height:"auto",margin:0,padding:0,listStyleType:"none",zIndex:9999999})}},parent:{object:"<li />",selector:"li",css:{}},css:{display:"none"},addClass:""},t.noty.layouts.bottomCenter={name:"bottomCenter",options:{},container:{object:'<ul id="noty_bottomCenter_layout_container" />',selector:"ul#noty_bottomCenter_layout_container",style:function(){t(this).css({bottom:20,left:0,position:"fixed",width:"310px",height:"auto",margin:0,padding:0,listStyleType:"none",zIndex:1e7}),t(this).css({left:(t(window).width()-t(this).outerWidth(!1))/2+"px"})}},parent:{object:"<li />",selector:"li",css:{}},css:{display:"none",width:"310px"},addClass:""},t.noty.layouts.bottomLeft={name:"bottomLeft",options:{},container:{object:'<ul id="noty_bottomLeft_layout_container" />',selector:"ul#noty_bottomLeft_layout_container",style:function(){t(this).css({bottom:20,left:20,position:"fixed",width:"310px",height:"auto",margin:0,padding:0,listStyleType:"none",zIndex:1e7}),window.innerWidth<600&&t(this).css({left:5})}},parent:{object:"<li />",selector:"li",css:{}},css:{display:"none",width:"310px"},addClass:""},t.noty.layouts.bottomRight={name:"bottomRight",options:{},container:{object:'<ul id="noty_bottomRight_layout_container" />',selector:"ul#noty_bottomRight_layout_container",style:function(){t(this).css({bottom:20,right:20,position:"fixed",width:"310px",height:"auto",margin:0,padding:0,listStyleType:"none",zIndex:1e7}),window.innerWidth<600&&t(this).css({right:5})}},parent:{object:"<li />",selector:"li",css:{}},css:{display:"none",width:"310px"},addClass:""},t.noty.layouts.center={name:"center",options:{},container:{object:'<ul id="noty_center_layout_container" />',selector:"ul#noty_center_layout_container",style:function(){t(this).css({position:"fixed",width:"310px",height:"auto",margin:0,padding:0,listStyleType:"none",zIndex:1e7});var o=t(this).clone().css({visibility:"hidden",display:"block",position:"absolute",top:0,left:0}).attr("id","dupe");t("body").append(o),o.find(".i-am-closing-now").remove(),o.find("li").css("display","block");var e=o.height();o.remove(),t(this).hasClass("i-am-new")?t(this).css({left:(t(window).width()-t(this).outerWidth(!1))/2+"px",top:(t(window).height()-e)/2+"px"}):t(this).animate({left:(t(window).width()-t(this).outerWidth(!1))/2+"px",top:(t(window).height()-e)/2+"px"},500)}},parent:{object:"<li />",selector:"li",css:{}},css:{display:"none",width:"310px"},addClass:""},t.noty.layouts.centerLeft={name:"centerLeft",options:{},container:{object:'<ul id="noty_centerLeft_layout_container" />',selector:"ul#noty_centerLeft_layout_container",style:function(){t(this).css({left:20,position:"fixed",width:"310px",height:"auto",margin:0,padding:0,listStyleType:"none",zIndex:1e7});var o=t(this).clone().css({visibility:"hidden",display:"block",position:"absolute",top:0,left:0}).attr("id","dupe");t("body").append(o),o.find(".i-am-closing-now").remove(),o.find("li").css("display","block");var e=o.height();o.remove(),t(this).hasClass("i-am-new")?t(this).css({top:(t(window).height()-e)/2+"px"}):t(this).animate({top:(t(window).height()-e)/2+"px"},500),window.innerWidth<600&&t(this).css({left:5})}},parent:{object:"<li />",selector:"li",css:{}},css:{display:"none",width:"310px"},addClass:""},t.noty.layouts.centerRight={name:"centerRight",options:{},container:{object:'<ul id="noty_centerRight_layout_container" />',selector:"ul#noty_centerRight_layout_container",style:function(){t(this).css({right:20,position:"fixed",width:"310px",height:"auto",margin:0,padding:0,listStyleType:"none",zIndex:1e7});var o=t(this).clone().css({visibility:"hidden",display:"block",position:"absolute",top:0,left:0}).attr("id","dupe");t("body").append(o),o.find(".i-am-closing-now").remove(),o.find("li").css("display","block");var e=o.height();o.remove(),t(this).hasClass("i-am-new")?t(this).css({top:(t(window).height()-e)/2+"px"}):t(this).animate({top:(t(window).height()-e)/2+"px"},500),window.innerWidth<600&&t(this).css({right:5})}},parent:{object:"<li />",selector:"li",css:{}},css:{display:"none",width:"310px"},addClass:""},t.noty.layouts.inline={name:"inline",options:{},container:{object:'<ul class="noty_inline_layout_container" />',selector:"ul.noty_inline_layout_container",style:function(){t(this).css({width:"100%",height:"auto",margin:0,padding:0,listStyleType:"none",zIndex:9999999})}},parent:{object:"<li />",selector:"li",css:{}},css:{display:"none"},addClass:""},t.noty.layouts.top={name:"top",options:{},container:{object:'<ul id="noty_top_layout_container" />',selector:"ul#noty_top_layout_container",style:function(){t(this).css({top:0,left:"5%",position:"fixed",width:"90%",height:"auto",margin:0,padding:0,listStyleType:"none",zIndex:9999999})}},parent:{object:"<li />",selector:"li",css:{}},css:{display:"none"},addClass:""},t.noty.layouts.topCenter={name:"topCenter",options:{},container:{object:'<ul id="noty_topCenter_layout_container" />',selector:"ul#noty_topCenter_layout_container",style:function(){t(this).css({top:20,left:0,position:"fixed",width:"310px",height:"auto",margin:0,padding:0,listStyleType:"none",zIndex:1e7}),t(this).css({left:(t(window).width()-t(this).outerWidth(!1))/2+"px"})}},parent:{object:"<li />",selector:"li",css:{}},css:{display:"none",width:"310px"},addClass:""},t.noty.layouts.topLeft={name:"topLeft",options:{},container:{object:'<ul id="noty_topLeft_layout_container" />',selector:"ul#noty_topLeft_layout_container",style:function(){t(this).css({top:20,left:20,position:"fixed",width:"310px",height:"auto",margin:0,padding:0,listStyleType:"none",zIndex:1e7}),window.innerWidth<600&&t(this).css({left:5})}},parent:{object:"<li />",selector:"li",css:{}},css:{display:"none",width:"310px"},addClass:""},t.noty.layouts.topRight={name:"topRight",options:{},container:{object:'<ul id="noty_topRight_layout_container" />',selector:"ul#noty_topRight_layout_container",style:function(){t(this).css({top:20,right:20,position:"fixed",width:"310px",height:"auto",margin:0,padding:0,listStyleType:"none",zIndex:1e7}),window.innerWidth<600&&t(this).css({right:5})}},parent:{object:"<li />",selector:"li",css:{}},css:{display:"none",width:"310px"},addClass:""},t.noty.themes.bootstrapTheme={name:"bootstrapTheme",modal:{css:{position:"fixed",width:"100%",height:"100%",backgroundColor:"#000",zIndex:1e4,opacity:.6,display:"none",left:0,top:0}},style:function(){var o=this.options.layout.container.selector;switch(t(o).addClass("list-group"),this.$closeButton.append('<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>'),this.$closeButton.addClass("close"),this.$bar.addClass("list-group-item").css("padding","0px"),this.options.type){case"alert":case"notification":this.$bar.addClass("list-group-item-info");break;case"warning":this.$bar.addClass("list-group-item-warning");break;case"error":this.$bar.addClass("list-group-item-danger");break;case"information":this.$bar.addClass("list-group-item-info");break;case"success":this.$bar.addClass("list-group-item-success")}this.$message.css({fontSize:"13px",lineHeight:"16px",textAlign:"center",padding:"8px 10px 9px",width:"auto",position:"relative"})},callback:{onShow:function(){},onClose:function(){}}},t.noty.themes.defaultTheme={name:"defaultTheme",helpers:{borderFix:function(){if(this.options.dismissQueue){var o=this.options.layout.container.selector+" "+this.options.layout.parent.selector;switch(this.options.layout.name){case"top":t(o).css({borderRadius:"0px 0px 0px 0px"}),t(o).last().css({borderRadius:"0px 0px 3px 3px"});break;case"topCenter":case"topLeft":case"topRight":case"bottomCenter":case"bottomLeft":case"bottomRight":case"center":case"centerLeft":case"centerRight":case"inline":t(o).css({borderRadius:"0px 0px 0px 0px"}),t(o).first().css({"border-top-left-radius":"3px","border-top-right-radius":"3px"}),t(o).last().css({"border-bottom-left-radius":"3px","border-bottom-right-radius":"3px"});break;case"bottom":t(o).css({borderRadius:"0px 0px 0px 0px"}),t(o).first().css({borderRadius:"3px 3px 0px 0px"})}}}},modal:{css:{position:"fixed",width:"100%",height:"100%",backgroundColor:"#333",zIndex:1e4,opacity:.6,display:"none",left:0,top:0}},style:function(){switch(this.$bar.css({overflow:"hidden",background:""}),this.$message.css({fontSize:"13px",lineHeight:"1.5384616",textAlign:"center",padding:"15px 20px",width:"auto",position:"relative"}),this.$closeButton.css({position:"absolute",top:4,right:4,width:10,height:10,background:"",display:"none",cursor:"pointer"}),this.$buttons.css({padding:"15px 20px",textAlign:"right",borderTop:"1px solid #ddd",backgroundColor:"#fff"}),this.$buttons.find("button").css({marginLeft:5}),this.$buttons.find("button:first").css({marginLeft:0}),this.$bar.on({mouseenter:function(){t(this).find(".noty_close").stop().fadeTo("normal",1)},mouseleave:function(){t(this).find(".noty_close").stop().fadeTo("normal",0)}}),this.options.layout.name){case"top":this.$bar.css({borderRadius:"0px 0px 3px 3px",marginBottom:1});break;case"topCenter":case"center":case"bottomCenter":case"inline":this.$bar.css({borderRadius:"3px",marginBottom:1}),this.$message.css({fontSize:"13px",textAlign:"center"});break;case"topLeft":case"topRight":case"bottomLeft":case"bottomRight":case"centerLeft":case"centerRight":this.$bar.css({borderRadius:"3px",marginBottom:1}),this.$message.css({fontSize:"13px",textAlign:"left"});break;case"bottom":this.$bar.css({borderRadius:"3px 3px 0px 0px",marginTop:1});break;default:this.$bar.css({})}switch(this.options.type){case"alert":case"notification":this.$bar.css({backgroundColor:"#0079bd",color:"#fff"});break;case"warning":this.$bar.css({backgroundColor:"#FF7043",color:"#fff"}),this.$buttons.css({});break;case"error":this.$bar.css({backgroundColor:"#EF5350",color:"#fff"}),this.$message.css({}),this.$buttons.css({});break;case"information":this.$bar.css({backgroundColor:"#00BCD4",color:"#fff"}),this.$buttons.css({});break;case"success":this.$bar.css({backgroundColor:"#4CAF50",color:"#fff"}),this.$buttons.css({});break;default:this.$bar.css({backgroundColor:"#FFF",border:"1px solid #CCC",color:"#333"})}},callback:{onShow:function(){t.noty.themes.defaultTheme.helpers.borderFix.apply(this)},onClose:function(){t.noty.themes.defaultTheme.helpers.borderFix.apply(this)}}},window.noty});