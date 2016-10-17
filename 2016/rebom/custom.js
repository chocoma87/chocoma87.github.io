

(function ($) {

    var customUi = {

        // 사이드바 스크립트
        sideBar : {

            objs: {
                sidebarWrapper: $('#sideBar'),
                sidebarPopup: $('.sideBar-quickMenuPopup'),
                header: $('#header'),
                sns: $('.sideBar-sns'),
                topBannerCloseBtn: $('.topBanner-close')
            },

            //사이드바 높이를 윈도우 크기에 맞춰서 변환한다
            setHeight : function() {

                var sidebarWrapper = this.objs.sidebarWrapper;
                var headerHeight = this.objs.header.outerHeight();

                var sideBarHeight = function(){
                    sidebarWrapper.outerHeight($(window).outerHeight() - headerHeight);
                };

                //위아래로 리사이즈 했을 경우, sideBar 높이 바꿔준다
                var resize = function(event){
                    sideBarHeight();
                    sidebarWrapper.css({width: 100});
                };

                var init = function(){
                    sideBarHeight();
                    $(window).on('resize', resize);
                };

                init();
            },

            // 작은 모니터에서 볼 경우, 사이드바 창이 스크롤 되도록 한다
            makeScroll: function(){

                var sidebarPopup = this.objs.sidebarPopup;
                var headerHeight = this.objs.header.outerHeight();
                var snsHeight = this.objs.sns.outerHeight();

                // 앞의 값을 sidebarPopup 높이로 지정한다
                var sidebarPopupHeight = function(){
                    // 윈도우 높이 잰 다음 헤더만큼 뺀다
                    var windowHeight = $(window).outerHeight();
                    var popupHeight = (windowHeight - headerHeight) - snsHeight;

                    sidebarPopup.height(popupHeight);
                }

                // 리사이즈 할때마다 위의 과정 실핸한다
                $(window).on('resize', sidebarPopupHeight);

                sidebarPopupHeight();

            }

        },

        // fixed 플러그인 적용
        fixed: (function(){

            $("#header").fixTo('body');

            $(".sideBarWrapper").fixTo('body', {
                top: 100
            });
        })(),

        // 푸터 카카오톡 상담 버튼 클릭시 퀵메뉴 열린다
        footerKatalk: (function(){

            $('#registKatalk').on('click', function(e){
                e.preventDefault();

                var el = $('.sideBar-quickMenu li').eq(2).find('a');
                el.click();
                console.log(el);
            });

        })(),

        // 위로가기 버튼
        gotoTop: (function(){
            var btn = $('#gotoTop');

            btn.on('click', function(e){
                e.preventDefault();
                $('html, body').stop().animate({'scrollTop': 0}, 300, 'swing');
            })

        })(),

        // 아이프레임 백그라운드 투명하게 만들기 ie8
        // 아이프레임에 src 없어서 스크립트로 해줘야함
        ieIframe: (function(){
            $('#header .embedCover').contents().find('body').css('background', 'transparent')
        })()

    };


    customUi.sideBar.setHeight();
    customUi.sideBar.makeScroll();




})(jQuery);




