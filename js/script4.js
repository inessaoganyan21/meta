$(document).ready((function(){var e=$(".sidebar-left"),t=$(".sidebar-right");function i(e,t,i,a){e.hover((function(){clearTimeout(a),t()}),i),a=setTimeout((function(){t(),a=setTimeout((function(){i()}),2e3)}),5e3)}function a(e){$(".visual .service-"+e+".inactive").fadeOut(),$(".visual .service-"+e+".active").fadeIn(),$(".visual .step-"+e).addClass("active")}function n(e){$(".visual .service-"+e+".inactive").fadeIn(),$(".visual .service-"+e+".active").fadeOut(),$(".visual .step-"+e).removeClass("active")}if(i(e,(function(){e.stop().animate({left:"0"}),$(".nav li",e).stop().animate({marginLeft:"0"}),$("li span",e).stop(!0,!0).animate({opacity:"1"})}),(function(){$(e).stop().animate({left:"-76px"}),$(".nav li",e).stop().animate({marginLeft:"0"}),$("li span",e).stop().animate({opacity:"0"})}),undefined),i(t,(function(){$(t).stop().animate({right:"0"}),$(".nav li.item, .nav li.languages",t).stop().animate({marginLeft:"37px"}),$("li span",t).stop(!0,!0).animate({opacity:"1"}),$("li.person",t).stop(!0,!0).slideDown(),$("li.item",t).stop().animate({marginBottom:"14px"}),$("li.phone",t).stop().animate({marginTop:"16px",marginBottom:"14px"})}),(function(){$(t).stop().animate({right:"-86px"}),$("li span",t).stop().animate({opacity:"0"}),$("li.person",t).stop().slideUp(),$("li.item",t).stop().animate({marginBottom:"44px"}),$("li.phone",t).stop().animate({marginTop:"34px",marginBottom:"44px"})}),undefined),$(".visual").hover((function(){$(".benefits-hint").animate({left:"-=10"},200,(function(){$(this).animate({left:"+=10"},100)}))}),(function(){})),$(".bxslider li").length>1&&$(".bxslider").bxSlider({auto:!0,pause:3e3}),$(".new-innovation a").hover((function(){if($(document).width()<571)return!1;$(".inside",this).stop(!0).animate({top:"-206px"})}),(function(){if($(document).width()<571)return!1;$(".inside",this).stop(!0).animate({top:"0"})})),$(".new-project a").hover((function(){if($(document).width()<571)return!1;$("p",this).stop(!0).animate({height:"206px"})}),(function(){if($(document).width()<571)return!1;$("p",this).stop(!0).animate({height:"0"})})),$("#display-login").click((function(e){$(".login-popup").animate({top:"0"}),$("#username").focus(),e.preventDefault()})),$(".login-popup .btn-close").click((function(){$(".login-popup").animate({top:"-335px"})})),$("form#login").on("submit",(function(e){e.preventDefault(),$("#username, #password").removeClass("error"),""!=$("#username").val()?""!=$("#password").val()?($("#login-submit").attr("disabled","disabled"),$.ajax({type:"POST",dataType:"json",url:ajax_login_object.ajaxurl,data:{action:"ajaxlogin",username:$("form#login #username").val(),password:$("form#login #password").val(),security:$("form#login #security").val()},success:function(e){if($("#login-submit").removeAttr("disabled"),1==e.loggedin)document.location.href=e.url;else switch(e.message){case"invalid_username":$("form#login #username").addClass("error");break;case"incorrect_password":$("form#login #password").addClass("error");break;default:alert("Bandant prisijungti ؤ¯vyko klaida, susisiekite su svetainؤ—s administratoriumi.")}},error:function(){$("#login-submit").removeAttr("disabled"),alert("Nepavyko susisiekti su serveriu.")}})):$("#password").addClass("error"):$("#username").addClass("error")})),$("#benefits-slider").length>0){var s=$(".benefit");$("#benefits-slider").slider({range:!0,min:0,max:100,values:[0,0],animate:!0,slide:function(e,t){$(".benefits-contact").fadeIn()},change:function(e,t){var i=$("#benefits-slider").offset().left,o=i+$("#benefits-slider").width()+20-i,l=i+t.values[0]*o/100,r=i+t.values[1]*o/100;s.each((function(){$(this).offset().left>=l-10&&$(this).offset().left<=r-100?$(this).addClass("active"):$(this).removeClass("active")}));var u=[];0==t.values[0]&&t.values[1]>33?(a("1"),u.push("1")):n("1"),t.values[0]<35&&t.values[1]>67?(a("2"),u.push("2")):n("2"),t.values[0]<69&&100==t.values[1]?(a("3"),u.push("3")):n("3"),$(".front-page .main-h2").fadeTo(400,.01,(function(){$(".front-page .main-h2").text($("h2.headline-"+u.join("-")).text()).fadeTo(400,1)}))}})}if($(".benefit").hover((function(){$(".benefit-detail .title").html($(this).data("title")),$(".benefit-detail .description").html($(this).data("description")),$(".benefit-detail").stop(!0,!0).fadeIn()}),(function(){$(".benefit-detail").stop(!0,!0).fadeOut()})),$("#benefits-slider").length>0){setTimeout((function(){$("#benefits-slider").slider("values",1,100),setTimeout((function(){$("#benefits-slider").slider("values",1,34)}),1500)}),1e3);$(window).on("scroll",(function(e){$(".benefits-contact").offset().top-$(".sidebar-right").offset().top<50&&$(".benefits-contact").fadeOut()}))}$(".menu-trigger").on("click",(function(e){$(".mob-menu").slideToggle(),e.preventDefault()})),$(".expand tr:first-child").on("click",(function(){$(this).toggleClass("expanded")})),$("#email-lightbox .close").on("click",(function(e){$("#email-lightbox").fadeOut(),e.preventDefault()})),$(".email a").on("click",(function(e){var t=$("#email-lightbox"),i=$(this).attr("href");t.find(".email-text").attr("href",i).html(i.replace("mailto:","")),t.fadeIn(),e.preventDefault()}))}));