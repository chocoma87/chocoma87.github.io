


(function ($) {

    // FDUX UI
    var spaaaadeUi = {

        // 페이지 로드 시 실행될 함수들 && 기타 초기화 세팅들
        init: function(options) {

            // a 테그 클릭 시 페이지 위로 가는 동작 방지
            $('.contents').find('a').on('click', function(e){
                e.preventDefault();
            });

            // 라이브러리 스킨 변경 함수 실행 (gnb 바꾸고, contents 의 클래스 변경한다)
            this.changeSkinFunc.init(options);

            // gnb 함수 실행


            // 플러그인들 실행
            this.startPlugin();

            // 내가 만든 플러그인?? 실행
            this.spPlugin();
        },

        changeSkinFunc: {

            init: function(options){

                var skin = this.getSkin();
                var thisObj = this;

                // 스킨 리스트 클릭 시, 스킨 변경한는 이벤트 리스너 등록한다
                var $btn = $('.selectTheme-list').find('a');

                $btn.on('click', function(e){
                    e.preventDefault();
                    thisObj.changeSkin(this, options.skinClass, thisObj);
                });

                // 스킨을 이미 선택했으면 선택된 스킨으로 보여준다 (gnb, div 클래스 변경)
                // 페이지 변경 시 모든 오브젝트 리셋됨 -> 쿠키 사용
                if(skin){
                    this.setSkin(skin, options.skinClass, thisObj);
                }
            },

            // 현재 스킨값 가져온다
            getSkin: function(){
                return this.getCookie('skin');
            },

            // 선택한 스킨 쿠키에 저장한다
            setCookie: function(skinName){
                document.cookie = 'skin=' + skinName;
            },

            // 쿠키값 가져온다
            getCookie: function(cname){
                var name = cname + "=";
                var ca = document.cookie.split(';');
                for(var i = 0; i <ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0)==' ') {
                        c = c.substring(1);
                    }
                    if (c.indexOf(name) == 0) {
                        return c.substring(name.length,c.length);
                    }
                }
                return "";
            },

            // 지정된 스킨으로 스킨 변경한다
            setSkin: function(skin, skinClass, thisObj){

                var $link = $('.selectTheme-list').find('a');

                $link.each(function(index, el){
                    if($(el).data('skin') === skin){
                        thisObj.changeSkin($(el), skinClass, thisObj);
                    }
                });
            },

            // 선택된 스킨의 클래스명 가져온다
            getSkinClass: function(skin, options){
                var theClass = null;

                for(var key in options){
                    if(key === skin){
                        theClass = options[key];
                    }
                };

                return theClass;
            },

            // 스킨 변경한다
            changeSkin: function(target, skinClass, thisObj) {

                // 클래스 옵션이 제대로 들어왔는지 확인
                // 클래스명이 있어야 해당 클래스로 바꿈
                if(Object.keys(skinClass).length < $('.selectTheme-list').find('a').length){
                    console.error('옵션으로 모든 스킨의 클래스명 전달해 줘야함');
                    return
                }

                var $target = $(target),
                    $selected = $('.selectTheme .current'),
                    $gnbs = $('.gnb-list'),
                    id = $target.attr('href').replace('#', ''),
                    $gnb = $(document.getElementById(id)),
                    $contents = $('.contents'),
                    skin = $target.data('skin');

                // 텍스트 && data 속성 변경
                $selected.text($target.text());

                // 선택된 스킨 href 값과 id 가 똑같은 gnb 를 보여준다
                $gnbs.removeClass('active');
                $gnb.addClass('active');

                // 새로운 스킨 클래스로 변경한다
                $contents.attr('class', 'contents ' + thisObj.getSkinClass(skin, skinClass));

                // 선택된 스킨 쿠키에 저장한다
                thisObj.setCookie(skin);
            }
        },

        // gnb 트리메뉴
        gnb: function() {

            // 1뎁스 클릭 시 2뎁스 ul 보여준다

            // active 클래스 추가

        },

        startPlugin: function(){
            // 토글 버튼
            if($('input.toggleSlide').length > 0){
                $('input.toggleSlide').lc_switch('켜짐', '꺼짐');
            }

            // 카루셀
            $('.carousel').carousel();

            // 캘린더 플러그인
            datepickr('.datePicker', { dateFormat: 'Y.m.d'});

            // 레인지 슬라이더
            $('#rangeSlider').freshslider({
                step:1,
                text: false,
                min: 0,
                max: 100
            });
            $('#rangeSlider2').freshslider({
                range:true,
                step:1,
                text: false,
                min: 0,
                max: 100,
                verticalClass: 'rangeslider--vertical'
            });
        },

        spPlugin: function(){



        }

    }

    // 함수 실행
    // 스킨별로 변경해줄 클래스 전달해준다
    spaaaadeUi.init({
        skinClass: {
            black: 'skinBlack',
            white: 'skinWhite'
        }
    });




})(jQuery);


