



(function($){

	var ui = {

		linkBlur: (function(){

			//a 클릭 시 :focus 스타일 적용되는 현상 막기 위해서,
			//focus 상태로 머무는 현상 없앤다.
			$('a').on('click', function(){
				this.blur();
			})

		})(),

		placeHolder: (function(){

			var plaecHolder = $('.placeHolder');

			//플레이스 홀더 ie8
			if(plaecHolder.val()){
				plaecHolder.css('backgroundPosition', '-100%');
			} else {
				plaecHolder.on('keydown', function(){
					$(this).css('backgroundPosition', '-100%');
				})
			}
			//폼테그에 값이 없을 때, 백그라운드 이미지 다시 보여준다
			plaecHolder.on('focusout', function(){
				if(!$(this).val()) {
					$(this).css('backgroundPosition', '10px center');
				}
			})

		})(),

		gnbHover : (function(){
			var gnb = $('.gnb-list')

			gnb.find('> li').hover(
				function(){
					$(this).addClass('active');
				},
				function(){
					$(this).removeClass('active');
				}
			)

			gnb.find('> li > a').on('focusin', function() {
				$(this).closest('li').addClass('active');
			})

			gnb.find('ul > li:last-child a').on('focusout', function() {
				$(this).closest('li').parents('li').removeClass('active');
			})
		})(),

		elShow : (function(){
			var toggleShowBtn = $('a[data-show]');

			//엘레먼트 show
			//버튼 클릭 시 엘리먼트 보여준다.
			toggleShowBtn.on('click', function(event){
				event.preventDefault();

				var obj = $(this).data('show'),
					objEl = $('li.' + obj);

				$('.sideBar-quickMenuPopup').hide();

				objEl.show();

				$(this).addClass('active');
				$(this).closest('li').siblings('li').find('a').removeClass('active');
			})
		})(),

		elHide : (function(){
			var toggleCloseBtn = $('a[data-hide]');

			//엘레먼트 close
			toggleCloseBtn.on('click', function(event){
				event.preventDefault();

				var obj = $(this).data('hide'),
					objEl = $('li.' + obj);

				objEl.hide();

				$('.sideBar-quickMenu li a[data-show="' + obj + '"').removeClass('active');
			})

		})()
	}


})(jQuery);

 
