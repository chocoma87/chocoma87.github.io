


(function ($) {

    /* 스크롤 에니메이션 */
    var scrollAni = function(selectedEl, newFunc){

        var self = {
            init : function() {

                //동작에 필요한 dom 요소 생성한다
                var objs = this.makeObjects(selectedEl);

                this.customfunc = newFunc;

                this.scroll(objs);
            },

            //동작에 필요한 dom 요소 생성한다
            makeObjects : function(){

                var els = {
                    objTop : selectedEl.offset().top,
                    objBottom: selectedEl.offset().top + selectedEl.outerHeight(),
                    windowHeight : $(window).innerHeight(),
                    wrapper: this,
                    target : selectedEl
                }

                return els;
            },

            customfunc : {},

            scroll : function(objs){

                var arrive = 'no';
                var wrapper = objs.wrapper;

                //스크롤 내리지 않아도 되는 경우
                if (objs.windowHeight > objs.objTop){

                    wrapper.customfunc.apply(objs.target);

                    return
                }

                $(window).on('scroll', function(){
                    var currentScroll =  $(window).scrollTop(),
                        scrollTop = objs.windowHeight + currentScroll,
                        wrapper = objs.wrapper;

                    //오브젝트가 화면 중간에 왔을 때 실행한다
                    if (scrollTop > objs.objTop + 200 && arrive !== 'yes'){

                        arrive = 'yes';

                        //실행시킬 에니메이션
                        wrapper.customfunc.apply(objs.target);

                    } else if (scrollTop < objs.objBottom - 200 && arrive !== 'no') {
                        arrive = 'no';
                    }
                })
            }
        }

        return self;
    }




    $(document).ready(function () {

        //이노베이션 에니메이션
        if($('#innovation').length > 0){
            var innovationAni = function(){
                $(this).delay(100).animate({opacity: 1, right: '-10px'}, 1000);
            };
            var innovationAni2 = function(){
                $(this).delay(100).animate({opacity: 1, left: '-10px'}, 1000);
            };

            var ani1 = new scrollAni($('.innovationRow:eq(0) .product'), innovationAni)
            var ani2 = new scrollAni($('.innovationRow:eq(1) .product'), innovationAni2);

            ani1.init();
            ani2.init();
        }


        //ir 요약 에니메이션
        if($('#pSummary').length > 0){

            //반응형 모듈에서 내보낸 변수
            var device = responsive.getState();

            //모바일, PC 구분해서 다른 에니메이션 적용한다(막대 그래프)
            if(device === 'desktop'){
                var graphAni = function(){
                    var aniValue = {opacity: 1, marginBottom: 0}

                    $(this).find('li').eq(0).find('.graph.orange').animate(aniValue, 300);
                    $(this).find('li').eq(0).find('.graph.red').delay(100).animate(aniValue, 300);

                    $(this).find('li').eq(1).find('.graph.orange').delay(300).animate(aniValue, 300);
                    $(this).find('li').eq(1).find('.graph.red').delay(500).animate(aniValue, 300);

                    $(this).find('li').eq(2).find('.graph.orange').delay(600).animate(aniValue, 300);
                    $(this).find('li').eq(2).find('.graph.red').delay(800).animate(aniValue, 300);

                    $(this).find('li').eq(3).find('.graph.orange').delay(900).animate(aniValue, 300);
                    $(this).find('li').eq(3).find('.graph.red').delay(1100).animate(aniValue, 300);

                    $(this).find('li').eq(4).find('.graph').delay(1300).animate(aniValue, 400);
                    $(this).find('li').eq(5).find('.graph').delay(1500).animate(aniValue, 400);
                    $(this).find('li').eq(6).find('.graph').delay(1700).animate(aniValue, 400);
                    $(this).find('li').eq(7).find('.graph').delay(1900).animate(aniValue, 400);
                }

                var graph = new scrollAni($('.graphWrap .graphBody .dataRow'), graphAni);

                graph.init();

            } else {
                var graphAni = function(){
                    var aniValue = {opacity: 1, marginBottom: 0}

                    $(this).find('li').eq(0).find('.graph.orange').animate(aniValue, 300);
                    $(this).find('li').eq(0).find('.graph.red').delay(100).animate(aniValue, 300);

                    $(this).find('li').eq(1).find('.graph.orange').delay(300).animate(aniValue, 300);
                    $(this).find('li').eq(1).find('.graph.red').delay(500).animate(aniValue, 300);

                    $(this).find('li').eq(2).find('.graph.orange').delay(600).animate(aniValue, 300);
                    $(this).find('li').eq(2).find('.graph.red').delay(800).animate(aniValue, 300);

                    $(this).find('li').eq(3).find('.graph.orange').delay(900).animate(aniValue, 300);
                    $(this).find('li').eq(3).find('.graph.red').delay(1100).animate(aniValue, 300);
                }

                var graphAni2 = function(){
                    var aniValue = {opacity: 1, marginBottom: 0}

                    $(this).find('li').eq(0).find('.graph').animate(aniValue, 400);
                    $(this).find('li').eq(1).find('.graph').delay(100).animate(aniValue, 400);
                    $(this).find('li').eq(2).find('.graph').delay(300).animate(aniValue, 400);
                    $(this).find('li').eq(3).find('.graph').delay(500).animate(aniValue, 400);
                }

                var graph = new scrollAni($('.graphWrap .graphBody .dataRow:eq(0)'), graphAni);
                var graph2 = new scrollAni($('.graphWrap .graphBody .dataRow:eq(1)'), graphAni2);

                graph.init();
                graph2.init();

            }


            //가로형 막대그래프 에니메이션
            var graphBarAni = function(){
                var aniValue = {opacity: 1, marginLeft: 0}

                $(this).find('.bar').eq(0).animate(aniValue, 300);
                $(this).find('.bar').eq(1).delay(200).animate(aniValue, 300);
                $(this).find('.bar').eq(2).delay(400).animate(aniValue, 300);
            }

            var graph3 = new scrollAni($('.graphWrap .barGraph:eq(0)'), graphBarAni);
            var graph4 = new scrollAni($('.graphWrap .barGraph:eq(1)'), graphBarAni);

            graph3.init();
            graph4.init();
        }


        //인사제도 보상체계 에니메이션
        if($('#irReward').length > 0){

            var pyramidAni = function(){
                $(this).find('.irReward-img img:eq(0)').animate({opacity: 1, marginLeft: 0}, 500);
                $(this).find('.irReward-img img:eq(1)').delay(300).animate({opacity: 1, marginLeft: 0}, 500);
                $(this).find('.irReward-img img:eq(2)').delay(600).animate({opacity: 1, marginLeft: 0}, 500);

                $(this).find('.irReward-text .irReward-list:eq(2)').animate({opacity: 1, marginLeft: 0}, 500);
                $(this).find('.irReward-text .irReward-list:eq(1)').delay(300).animate({opacity: 1, marginLeft: 0}, 500);
                $(this).find('.irReward-text .irReward-list:eq(0)').delay(600).animate({opacity: 1, marginLeft: 0}, 500);
            }


            var pyramid = new scrollAni($('#irReward'), pyramidAni);


            pyramid.init();

        }


    });

})(jQuery);


