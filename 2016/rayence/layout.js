


//반응형 웹 모듈
var responsive = (function($){

	"use strict";

	//https://www.jonathanfielding.com/managing-responsive-design-breakpointstates-in-javascript
	var stateManager = (function () {
		var state = null;

		var setState = function () {
			if ($('body').width() < 980) {
				if (state !== "mobile") {
					state = "mobile";
					displayMobile();
				}
			}
			else {
				if (state !== "desktop") {
					state = "desktop";

					displayDesktop();
				}
			}
		};

		var resizePage = function () {
			setState();

			if (state === "mobile") {
				resizeMobile();
			}
			else {
				resizeDesktop();
			}
		};

		var displayMobile = function () {
			//When mobile state is shown this fires

			$('#header').addClass('mobile').removeAttr('style');
			//모바일 사이즈에서 show 해줬던 엘레먼트 hide 한다
			$('.mobileMenuWrap').hide();
			$('.depth2').hide();
			$('.mobileBtn').removeClass('on');

			//윈도우 리사이즈 할때마다, a테그에 여러번 이벤트 핸들러 추가되는 것 방지
			$('#gnb>ul>li>a').off('mouseover focus click');
			$('#gnb>ul>li').off('mouseleave');
			$('#gnb').off();
			$('.mobileBtn').off('click');
			$('#lnb li.current a').off('click');

			//gnb 토글
			$('.mobileBtn').click(function(e){
				e.preventDefault();

				$(this).toggleClass('on');
				$('.mobileMenuWrap').slideToggle(150);
			});

			//gnb 서브메뉴 토글
			$('#gnb>ul>li>a').on('click', function(e){

				if($(this).siblings('ul').length > 0){
					e.preventDefault();
				}

				$(this).closest('li').siblings('li').find('> a').removeClass('on');

				$(this).closest('li').siblings('li').find('.depth2').slideUp(150);
				$(this).next('.depth2').slideToggle(150);
			});

			//lnb 토글
			$('#lnb li.current a').click(function(e){
				e.preventDefault();

				$('#lnb').toggleClass('open');
			});
		};

		var displayDesktop = function () {
			//When desktop state is shown this fires

			//윈도우 리사이즈 할때마다, dom 엘리먼트에 여러번 이벤트 핸들러 추가되는 것 방지
			$('#gnb').find('>ul>li>a').off('mouseover focus click');
			$('#gnb').off('mouseleave');

			$('#header').removeClass('mobile');

			//모바일 사이즈에서 hide 해줬던 엘레먼트 show 한다
			$('.mobileMenuWrap').show();

			$('#gnb').find('>ul>li>a')
				.mouseover(function(){
					$(this).siblings('.depth2').show();
				})
				.focus(function(){
					$(this).mouseover();
				});

			$('#gnb').find('> ul > li').on('mouseleave', function(){
				$(this).find('.depth2').hide();
			});
			$('#gnb').find('.depth2 li:last-child').on('focusout', function(){
				$('#gnb').find('.depth2').hide();
			});

		};

		var resizeMobile = function () {
			//When mobile state is resized this fires
		};

		var resizeDesktop = function () {
			//When desktop state is resized this fires
		};

		return {
			init: function () {
				setState();
				$(window).on('resize', resizePage);
			},
			getState: function () {
				return state;
			}
		};

	} ());


	return stateManager;

}(jQuery));



//기타 dom 커스텀 함수들
(function($){

	$(function(){

		//모바일, 피씨구분 함수 실행
		responsive.init();

	});

})(jQuery);
