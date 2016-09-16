(function ($) {

    // 체크박스 트리거
    var chechbox = function(){
        $('.checkboxBtn').on('click', function(){
            $(this).siblings('label').trigger('click');
        });
    };
    chechbox();


    // 보더 스타일 셀렉트
    // 선택한 보더 스타일에 따라 클래스 변경해 준다
    var changeBorder = function(){
        var orgClass = $('#selectBorderStyle').attr('class');
        $('#selectBorderStyle').find('.options li').on('click', function(){
            var value = $(this).attr('rel');
            var parent = $(this).parents('#selectBorderStyle');
            parent.removeClass(function(){
                return $(this).attr('class').replace(orgClass, '');
            });
            parent.addClass(value);
        });
    };
    changeBorder();



    // 사이드 메뉴 높이 지정 함수 & 커스텀 스크롤 플러그인
    var sideMenu = function(){

        var mainFunc = function(index, $el) {
            var headerHeight = $('.siteHeader').outerHeight();
            var $title = $el.find('.sideMenu-title');
            var menuListHeight = 0;
            var scrolls = []; // 스크롤 플러그인 오브젝트 저장할 리스트

            // 총 타이틀 높이
            // 타이틀 높이가 다르기 때문에 각각 높이 구해준다
            $title.each(function(index, el){
                menuListHeight += $(el).outerHeight();
            });


            // 서브메뉴 높이 윈도우 높이에 맞춰서 설정한다
            var setSubMenuHeight = function(){
                var windowHeight = $(window).height();
                var $inner = $el.find('.sideMenu-inner');

                $inner.css({
                    height: windowHeight - headerHeight - menuListHeight
                });
            };


            // 스크롤 플러그인으로 생성된 오브젝트 구해서 리스트에 저장한다
            var getScrolls = function(){
                $el.find(".customScrollbar").each(function(index, el){
                    var scroll = $(el).data("plugin_tinyscrollbar");
                    scrolls.push(scroll);
                });
            };


            // 제목 클릭시 이벤트 실행 (서브메뉴 show, 스크롤 플러그인 재실행)
            $title.on('click', 'a', function(e){
                var $this = $(this);

                $this.toggleClass('active');
                $this.parents('.sideMenu-unit').siblings().find('.sideMenu-inner').hide();
                $this.parent().siblings('.sideMenu-inner').toggle();

                // 서브메뉴 닫을때는 실행하지 않는다
                if($this.hasClass('active')){
                    setSubMenuHeight();

                    // display none 되있는 메뉴 열었을 때, 플러그인 다시 실행
                    var $unit = $(e.currentTarget).parents('.sideMenu-unit');
                    var currentMenuIndex = $el.find('.sideMenu-unit').index($unit);
                    scrolls[currentMenuIndex].update();
                }
            });


            // 리사이즈 할 때 서브메뉴 높이 변경한다
            $(window).on('resize', function(){
                setSubMenuHeight();
            });


            // 실행
            setSubMenuHeight();
            $el.find(".customScrollbar").tinyscrollbar(); // 스크롤 플러그인 실행
            getScrolls();
        };

        // 메인 함수 실행 (사이드 메뉴가 두개라 각각 실행)
        $('.sideMenu').each(function(index, el){
            mainFunc(index, $(el));
        });

    };
    sideMenu();


})(jQuery);
