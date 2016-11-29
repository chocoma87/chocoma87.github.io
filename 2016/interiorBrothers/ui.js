

// 오브젝트 생성
var spaaaadeUi = {}


// 초기화 && 함수들 실행
spaaaadeUi.init = function(){

    // gnb 에니메이션
    if($('.gnb').length > 0){
        this.gnb();
    }

    // 전문가 상세페이지 스크롤 할 때 메뉴 숨기기
    if($('.expertDetail').length > 0){
        this.expertMenu();
    }

    // 슬라이드 플러그인 적용 스크립트
    if(document.querySelector('.js_slider')){
        this.slidePlugin();
    }

    // 공통적으로 사용하는 ui (팝업 열고 닫기 등)
    this.common();

    // 폼 슬라이드
    if($('.selectSlide').length > 0){
        this.slide.init();
    }

    // 기타 자잘한 UI 들
    this.etc();
};




// gnb 에니메이션
spaaaadeUi.gnb = function(){

    // gnb 회원 메뉴 슬라이드 토글
    // 예전 안드로이드(4.4.4) 에서는 단위가 % 이면 transition 안된다
    // 스크립트로 메뉴 height 구해서 transform 값에 대입한다

    var gnb = document.getElementsByClassName('gnb')[0];
    var memberGnb = document.getElementsByClassName('gnb-memberMenuWrapper')[0];
    var gnbList = document.getElementsByClassName('gnb-menuList')[0];

    if(memberGnb){

        var memberGnbHeight = memberGnb.clientHeight;

        // gnb 회원 메뉴는 위로 올려서 화면에서 안보이게 한다
        $('.gnb-userInfo').on('click', function(e){
            e.preventDefault();

            $(this).toggleClass('active');
            $(gnbList).toggleClass('member');

            memberGnb.style.transform = 'translateY(-' +  memberGnbHeight + 'px)';
        });

    }


    // 메뉴 svg 버튼 에니메이션, gnb 슬라이드
    //if(window.requestAnimationFrame){}
    var $modal = $('.modal');

    $('.header-menuToggle').on('click', function(){
        $(this).toggleClass('active');
        $('.gnb').toggleClass('active');
    });

    gnb.addEventListener('transitionend', function(e){
        if($(gnb).hasClass('active')){
            $modal.show();
        } else {
            $modal.hide();
        }
    });



    // 모달 클릭 했을 때도 메뉴 없어지게
    var $modal = $('.modal');

    $modal.on('click', function(){
        $('.header-menuToggle').trigger('click');
    });

};





// 전문가 페이지에서는 헤더, 퀵메뉴 사라지게 한다
spaaaadeUi.expertMenu = function(){

    // 스크롤 방향
    var lastPos = window.pageYOffset;
    var direction = '';
    var $header = $('.header');
    var $quickMenu = $('.quickMenu');


    window.addEventListener('scroll', function(){

        // gnb 열려 있을 때는 헤더 항상 보이게 한다
        if($('.gnb').hasClass('active')){
            return;
        }


        // 스크롤 방향 구한다
        var st = window.pageYOffset;

        if(st >= lastPos){
            direction = 'down';
        } else {
            direction = 'up';
        }

        lastPos = st;


        // 아이폰에서 페이지 위로 스크롤이 더 되기 때문에 헤더가 화면에서 사라짐??
        if(st > 100){

            // 스크롤 할때마다 반복 실행되는 것 방지 (조건에 맞을때 한번만 실행한다)
            if(direction === 'down'){

                if($header.hasClass('down')){
                    return
                }

                $header.addClass('down');
                $quickMenu.addClass('down');

            } else {

                if($header.hasClass('down')){
                    $header.removeClass('down');
                    $quickMenu.removeClass('down');
                }

            }

        }

    });


};




/* 슬라이더 플러그인 실행 */
spaaaadeUi.slidePlugin = function(){

    var thumbnailSlider = document.querySelector('.hasThumbnail');

    if(thumbnailSlider){ // 썸네일 있는 슬라이드

        var thumbnail = thumbnailSlider.querySelector('.thumbnail');
        var li = thumbnail.getElementsByTagName('li');

        // 슬라이드 실행
        var mainSliderObj = lory(thumbnailSlider.querySelector('.mainImg'), {});
        var thumbSliderObj = lory(thumbnailSlider.querySelector('.thumbnail'), {
            slidesToScroll: 1
        });

        // 맨 처음 썸네일에 current 클래스 추가
        li[0].classList.add('current');

        // 메인 슬라이더 다음으로 넘어갈 때, 썸네일도 다음으로 넘어간다
        thumbnailSlider.querySelector('.mainImg').addEventListener('after.lory.slide', function(e){

            // 현재 선택된 슬라이드에 current 클래스 추가
            for(var i = 0; i < li.length; i++){
                li[i].classList.remove('current');
            }
            li[e.detail.currentSlide].classList.add('current');

            // 버튼 클릭할 때마다 다음 썸네일로 넘겨준다
            thumbSliderObj.slideTo(e.detail.currentSlide);
        });

        // 썸네일 클릭 시 해당 슬라이드로 움직임
        for(var i = 0; i < li.length; i++){
            // i가 항상 6이 되는 현상 방지
            (function(index){
                li[i].getElementsByTagName('a')[0].addEventListener('click', function(e){
                    mainSliderObj.slideTo(index);
                });
            })(i);
        }

    } else { // 기본 슬라이드

        // 슬라이더 페이지네이션 있는 경우
        if($('.sliderDot').length > 0){

            var $dotList = $('.sliderDot').find('li');

            // 슬라이드 초기화 됐을 때, 첫번째 sliderDot 에 active 클래스 추가한다
            document.querySelector('.slider').addEventListener('after.lory.init', function(e){
                $dotList.eq(0).addClass('active');
            });

            // 슬라이드 넘어갈 때, 해당 sliderDot 에 active 클래스 추가한다
            document.querySelector('.slider').addEventListener('after.lory.slide', function(e){
                $dotList.removeClass('active');
                $dotList.eq(e.detail.currentSlide).addClass('active');
            });
        }


        // 슬라이더 오브젝트를 저장할 변수 (한개만)
        var sliderObj;

        var option = {
            rewind: true
        }

        // 반복 하지 않는다
        if($('.concierge08').length > 0){
            option = {
                rewind: false
            }
        }

        Array.prototype.slice.call(document.querySelectorAll('.js_slider')).forEach(function (element, index) {
            sliderObj = lory(element, option);
        });

        // 슬라이더 오브젝트를 spaaaadeUi 객체에 추가 (display:none 되있다가 show 되면 reset 해줘야 되서 필요한 코드)
        this.sliderPluginObj = sliderObj;
    }

    var hideUis = function(){
        $('.slider.triggerHide').find('li').on('click', function(){
            $('.header').toggleClass('down');
            $('.js_prev').toggleClass('slideTouched');
            $('.js_next').toggleClass('slideTouched');
            $('.photoDetailMenu').toggleClass('slideTouched');
            $('.viewCount').toggleClass('slideTouched');
            $('.thumbnail.slider').toggleClass('slideTouched');
        })
    }

    // 사진 보기 페이지에서만 클릭 시 헤더, 퀵메뉴 없앤다
    if(document.querySelector('.viewPhotoDetailGalleryList') || document.querySelector('.viewPhotoDetailThumbnail')){
        hideUis();
    }
};



spaaaadeUi.common = function(){

    // 팝업 닫기
    var popup = $('.commonPopup');
    if(popup.length > 0){
        popup.find('.close, .closeBtn').on('click', function(e){
            e.preventDefault();
            $(this).closest('.commonPopup').hide();

            // 팝업이 셀렉트 슬라이드인 경우, 슬라이드 다시 첫번째로 리셋해준다
            if($('.selectSlide').length > 0){
                spaaaadeUi.slide.slideInner.css({
                    transform: 'translateX(0px)'
                });
            }
        });

    }

    // 팝업 열기
    var popupBtn = $('.triggerPopup');
    var sliderWrapper = this.sliderPluginObj;

    if(popupBtn.length > 0){
        popupBtn.on('click', function(e){
            e.preventDefault();

            var content = $($(this).attr('href'));
            content.show();

            // 팝업이 셀렉트 슬라이드인 경우, 슬라이드 옵션들 다시 리셋한다
            if($(this).hasClass('select')){
                spaaaadeUi.slide.reset(content);
            }

            // 메인페이지 팝업에서 팝업 show 될때, 슬라이더 reset 해주고, 클릭한 링크에 해당하는 슬라이드 보여줌
            if($('body.index').length > 0){
                sliderWrapper.reset();
                sliderWrapper.slideTo($(this).closest('ul').find('li').index($(this).parent()));
            }
        });
    }

}



spaaaadeUi.etc = function(){

    // 더보기
    if($('.expaneableSection').length > 0){

        $('.expaneableSection').on('click', '.expand', function(e){
            e.preventDefault();

            $(this).siblings('.expaneableSection-content').toggleClass('active');
            $(this).toggleClass('active');


            if($(this).hasClass('active')){
                this.innerText = '접기';
            } else {
                this.innerText = '자세히 보기';
            }

        });
    }


    // 더보기 테이블
    var moreTable = $('.expaneableSectionTable');
    if(moreTable.length > 0){
        moreTable.on('click', '.expand', function(e){
            e.preventDefault();

            $(this).toggleClass('active');
            $(this).closest('.expaneableSectionTable').find('table.last').toggle();

            if($(this).hasClass('active')){
                this.innerText = '접기';
            } else {
                this.innerText = '자세히 보기';
            }
        });
    }


    // 한눈에 보기
    if($('.scrollableSection').length > 0){
        $('.scrollableSection').on('click', '.scroll', function(e){
            e.preventDefault();

            $(this).siblings('.gridScrollable').toggleClass('active');
            $(this).toggleClass('active');
        })
    }


    // 별점주기
    var starWrapper = document.getElementsByClassName('star');
    if(starWrapper){
        $('.star a').on('click', function(e){
            e.preventDefault();

            // a 테그 모두 가져와서,
            var $aList = $(this).closest('.star').find('a');
            var index = $aList.index($(this));

            for(var i = 0; i < $aList.length; i++){
                if(i <= index ){
                    // 클릭한 a 보다 index 가 작은 경우
                    $aList[i].classList.add('active');
                } else {
                    // 클릭한 a 보다 index 가 큰 경우
                    $aList[i].classList.remove('active');
                }
            }

        });
    }


    // 사용자 계정 메세지함
    if($('.messageList').length > 0){
        $('.sectionTitle').find('.delete').on('click', function(e){
            e.preventDefault();

            $('.messageList').find('li').addClass('hasLeave');
        })
    }


    // 댓글 더보기
    var comment = $('.commentWrapper');
    if(comment.length > 0){
        comment.on('click', '.more', function(e){
            e.preventDefault();

            $(this).closest('.commentWrapper').find('.commentList').toggleClass('active');
            $(this).toggleClass('active');
            
            if($(this).hasClass('active')){
                this.innerText = '접기';
            } else {
                this.innerText = '모두 보기';
            }

        });
    }


    // 사진 자세히 보기 사진 더보기 (view_photo_detail.html)
    if($('.photoListExpand').length > 0){
        var $li = $('.photoListExpand').find('.photoViewList li');

        for(var i = 0; i < $li.length; i++){
            if(i > 8){
                $li.eq(i).hide();
            }
        }

        var orgText =  $('.photoListExpand').find('.expand').find('.text').text();

        // 처음엔 9개 까지만 보임
        $('.photoListExpand').find('.expand').on('click', function(e){
            e.preventDefault();

            for(var i = 0; i < $li.length; i++){
                if(i > 8){
                    $li.eq(i).toggle();
                }
            }

            $(this).toggleClass('active');

            if($(this).hasClass('active')){
                $(this).find('.text').text('접기');
            } else {
                $(this).find('.text').text(orgText);
            }

        });
    }

    // 아코디언
    if($('.accordion').length > 0){
        $('.accordion-button').on('click', function(e){
            e.preventDefault();

            $(this).toggleClass('active');
        })
    }

    // 버튼 클릭 시 에니메이션 클래스 추가 (컨시어지)
    if($('.hasAnimation').length > 0){
        var $item = $('.hasAnimation-item');

        $item.on('click', function(e){
            e.preventDefault();

            var $targetList = $(this).closest('.hasAnimation').find('.hasAnimation-item');
            var index = $targetList.index($(this));

            $(this).toggleClass('active');

            // 하나만 선택할 수 있는 경우
            if($('.hasAnimation').hasClass('single')){
                for(var i = 0; i < $targetList.length; i++){
                    if(i != index){
                        $(this).closest('.hasAnimation').get()[0].getElementsByClassName('hasAnimation-item')[i].classList.remove('active');
                    }
                }
            }

        });
    }

};


// 셀렉트 테그 슬라이드
spaaaadeUi.slide = {

    init: function(){
        this.trigerFunc(this);
    },

    // 슬라이드 wrapper 변수로 받는다
    reset: function(wrapper){
        this.slideWidth = wrapper.find('.selectSlide-slide').outerWidth();
        this.slideInner = wrapper.find('.selectSlide-slideInner');
        this.index = 0;
        this.direction = 'next';
        this.currentPos = 0;

        wrapper.find('.selectSlide-title').removeClass('hasBack');
    },

    slideWidth: $('.selectSlide-slide').outerWidth(),

    index: 0,

    direction: 'next',

    targetDomWrapper: null,

    slideInner: null,

    currentPos: 0,

    // 슬라이드 움직이는 에니메이션
    mainFunc: function(){
        var flip = this.direction == 'next' ? -1 : 1;

        // 현재 슬라이드 위치에서 슬라이드 너비만큼 더하거나 빼서 새로 대입할 translate 값 구한다
        this.currentPos += this.slideWidth * flip;

        this.slideInner.css({
            transform: 'translateX(' + this.currentPos + 'px)'
        });

        // 리스트가 많을 경우, 스크롤 맨 위로 올려준다. (안그러면 위쪽 리스트 안보임)
        this.slideInner.scrollTop(0);
    },

    // 에니메이션 하는 조건?? 다음, 이전 버튼 클릭 시 conditions 들...
    trigerFunc: function(wrapperObj){

        // 다음 버튼 클릭 시
        $('.selectSlide').find('.selectSlide-list a').on('click', function(e){
            e.preventDefault();

            // 오브젝트에 클릭된 slide 객체 추가 (DOM el)
            wrapperObj.targetDomWrapper = $(this).closest('.selectSlide');


            wrapperObj.slideInner = wrapperObj.targetDomWrapper.find('.selectSlide-slideInner');
            wrapperObj.slide = wrapperObj.slideInner.find('.selectSlide-slide');

            if(wrapperObj.index >= 0){
                wrapperObj.targetDomWrapper.find('.selectSlide-title').addClass('hasBack');

                // 현재 슬라이드 방향 바꿔준다
                wrapperObj.direction = 'next';
            }

            // 마지막 슬라이드에서는 에니메이션 하지 않는다.
            if(wrapperObj.slide.length - 1 <= wrapperObj.index){
                return;
            }

            wrapperObj.index += 1;

            // 에니메이션 실행
            wrapperObj.mainFunc();
        });

        // 이전 버튼 클릭 시
        $('.selectSlide').find('.back').on('click', function(e){
            e.preventDefault();

            // 마지막 슬라이드에서는 에니메이션 하지 않는다.
            if(wrapperObj.index === 0){
                return;
            } else if (wrapperObj.index === 1){
                wrapperObj.targetDomWrapper.find('.selectSlide-title').removeClass('hasBack');
            }

            // 현재 슬라이드 방향 바꿔준다
            wrapperObj.direction = 'prev';

            wrapperObj.index -= 1;

            // 에니메이션 실행
            wrapperObj.mainFunc();
        });
    }

}








spaaaadeUi.init();










