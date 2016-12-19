


(function ($) {

    var spaaaadeUi = {
        init: function(){

            // 윈도우 가로, 세로 사이즈를 객체로 지정
            this.windowSize = this.getWindowSize();

            this.slider();
            this.contactus();
            this.pageTransition();
            this.gnb();
            this.goToTop();
            this.etcAni();

        },

        getWindowSize: function(){
            var height = window.outerHeight;
            var width = window.outerWidth;

            var size = {sizeX: width, sizeY: height};

            return size;
        },

        // 메인페이지 슬라이드
        slider: function(){

            function slideContentChange(args) {
                /* indicator */
                $('.iosSlider-button').removeClass('selected');
                $('.iosSlider-button:eq(' + (args.currentSlideNumber - 1) + ')').addClass('selected');
            };

            function onresize(args){
                $('.iosSlider').iosSlider('update');
            };


            $('.iosSlider').iosSlider({
                desktopClickDrag: true,
                snapToChildren: true,
                navSlideSelector: $('.iosSlider-button'),
                onSlideChange: slideContentChange,
                onSliderLoaded: slideContentChange,
                autoSlide: true,
                autoSlideTransTimer: 2000
            });

        },

        // 추가한 폼에 플레이스 홀더 넣기
        contactus: function(){

            if(document.getElementById('formComponents')){
                var $formWrapper = $('.formBox');

                // 폼 하나씩 돌면서 플레이스 홀더 값 있는지 체크한다.
                $formWrapper.each(function(index, el){
                    var placeholder = $(el).data().placeholder;
                    if(placeholder){
                        $(el).find('input').attr('placeholder', placeholder);
                    }
                });

                // 보내기 버튼 클릭 시 submit 트리거한다 (인풋이 버튼보다 크기가 작아서 경고문구 안나옴)
                $('.send.button').on('click', function(){
                    $('#form_contact').submit();
                });
            }

        },

        // 페이지 전환 에니메이션
        pageTransition: function(){

            var $blocker = $('.pageBlocker'),
                windowSize = this.windowSize;


            // 페이지 이동 시 에니메이션
            var beforeLoad = function(windowSize){

                $blocker.addClass('active');
                $blocker.removeClass('hide');
            };

            // 페이지 로딩 후 에니메이션
            var afterLoad = function(){
                $blocker.animate({opacity: 0}, 300, function(){
                    $(this).css('z-index', '-1');
                });
            };


            // 페이지 로딩 시 에니메이션
            $(window).on('ready', function(){
                beforeLoad(windowSize);
            })

            window.onload = function(){

                var time = 400;

                if($('.wrapper').hasClass('index')){
                    time = 3600;
                }
                // css로 transition 준 시간만큼 timeout 시킨다
                var loadTimeout = window.setTimeout(afterLoad, time);
            };

        },

        // 메뉴 에니메이션
        gnb: function(){
            var $header = $('.header');

            $('.menuOpen').on('click', function(e){
                e.preventDefault();
                $header.addClass('open');
                $header.find('.gnb').animate({opacity: 1}, 200);
            });
            $('.menuClose').on('click', function(e){
                e.preventDefault();
                $header.find('.gnb').animate({opacity: 0}, 200, function(){
                    $header.removeClass('open');
                });
            });

        },

        etcAni: function(){

            // 포트폴리오 카테고리 숨겼다 보여주기
            $('.currentCategory').on('click', function(e){
                e.preventDefault();

                $(this).toggleClass('active');
                $('.categoryList').toggleClass('active');
            })

        },

        // 위로가기 버튼 (모바일)
        goToTop: function(){

            $(document).ready(function($){
                // browser window scroll (in pixels) after which the "back to top" link is shown
                var offset = 300,
                //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
                    offset_opacity = 1200,
                //duration of the top scrolling animation (in ms)
                    scroll_top_duration = 300,
                //grab the "back to top" link
                    $back_to_top = $('.cd-top');

                //hide or show the "back to top" link
                $(window).scroll(function(){
                    ( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
                    if( $(this).scrollTop() > offset_opacity ) {
                        $back_to_top.addClass('cd-fade-out');
                    }
                });

                //smooth scroll to top
                $back_to_top.on('click', function(event){
                    event.preventDefault();
                    $('body,html').animate({
                            scrollTop: 0 ,
                        }, scroll_top_duration
                    );
                });

            })
        }

};


spaaaadeUi.init();

})(jQuery);
