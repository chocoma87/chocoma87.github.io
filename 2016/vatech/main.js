

(function ($) {
    $(document).ready(function () {


        var mainSlide = {

            currentPageDom: $('.bxSlider-pageNum .currnetNum'),

            // 초기화
            init: function(){

                $('.bxslider').bxSlider({
                    mode: 'fade',
                    auto: true,
                    autoControls: true,
                    maxSlides: 1,
                    pause: 6000,
                    speed: 1500,
                    onSliderLoad: this.setPageNum,
                    onSlideBefore: this.updatePageNum
                });

            },

            // 스라이드 장수 출력한다
            setPageNum: function(currentIndex){

                // 슬라이드 총 장수 구한다
                var totalNum = $('.bxslider li').length;

                // 페이지 숫자를 span에 출력한다
                mainSlide.currentPageDom.text(currentIndex + 1);
                $('.bxSlider-pageNum .totalNum').text(totalNum);

            },

            // 페이지 넘어갈때마다 슬라이드 현재 페이지 숫자 업데이트해서 span에 출력한다
            updatePageNum: function($slideElement, oldIndex, newIndex){
                mainSlide.currentPageDom.text(newIndex + 1);
            }
        };
        mainSlide.init();



        //채용공고 슬라이드
        var setNavi = function(args){
            $('.recSlide-navi li').removeClass('selected');
            $('.recSlide-navi li:eq(' + (args.currentSlideNumber - 1) + ')').addClass('selected');
        };
        $('.recSlide').iosSlider({
            //autoSlide: true,
            infiniteSlider: true,
            navSlideSelector: '.recSlide-navi li',
            onSlideChange: setNavi,
            onSliderLoaded: setNavi,
            snapSlideCenter: true,
            desktopClickDrag: true,
            snapToChildren: true
        });
        $('.recSlide-navi li').on('click', function(event){
            event.preventDefault();
        });



        //fancybox
        $('.fancybox').fancybox({
            helpers: {
                overlay: {
                    locked: false
                }
            }
        });


         $('.mainNotice .closeBtn').on('click', function(){
            $(this).parent().parent().fadeOut();
        });
    });

})(jQuery);
