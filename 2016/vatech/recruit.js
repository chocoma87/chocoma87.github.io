

(function ($) {


    if($('#recruitWrite').length > 0){


        // 자격증 필드 추가
        var certificateInputUi = {

            tr : $('#certificate tr'),
            th : $('#certificate th.vertical'),
            button : $('#addCertificate'),
            initIndex : 3, // 추가하기 버튼 클릭시 보여줄 tr 인덱스의 초기값

            init: function(){

                var objs = {
                    tr: this.tr,
                    th: this.th,
                    button: this.button,
                    initIndex: this.initIndex,
                    that: this
                };

                // 추가 필드 숨겨놓고,
                // rowspan 설정한다
                this.th.attr('rowspan', this.initIndex);
                this.tr.slice(this.initIndex, 6).hide();

                // 추가하기 버튼 클릭 시 tr 추가한다
                this.button.on('click', objs, function(event){
                    event.preventDefault();
                    objs.that.addField(objs);
                });

                // 추가한 필드에 값이 있으면 숨겨놨던 tr 보여준다 (미리보기, 불러오기 페이지일 경우)
                this.ifTrHasValue();

            },

            // 추가하기 버튼 클릭 시 필드 추가한다
            addField: function(objs){

                if(objs.that.initIndex < objs.tr.length - 1) { // initIndex 가 변화한 후 값 참조시키기 위해서 that 사용
                    objs.tr.eq(objs.that.initIndex).show();
                    objs.th.attr('rowspan', objs.that.initIndex + 1);

                    if(objs.that.initIndex == objs.tr.length - 2){ // 마지막 tr은 버튼이라 length 에서 빼준다
                        objs.button.parents('tr').hide();
                    } else {
                        objs.that.initIndex ++;
                    }
                } else {
                    return
                }

            },

            ifTrHasValue: function(){

                // 추가한 필드가 최초의 initIndex 보다 많을때만, tr 보여준다
                // 추가한 필드의 tr index를 구하는 변수 실행 (tr의 index number를 리턴한다)
                var valuedinitIndex = this.getValuedinitIndex();
                if(valuedinitIndex < this.initIndex || valuedinitIndex == undefined){ return };

                var tr = this.tr;

                // 추가한 필드 보여준다
                this.tr.slice(this.initIndex, valuedinitIndex + 1).show();
                this.th.attr('rowspan', valuedinitIndex + 1);

                // 추가하기 버튼 클릭 시 추가하기 시작할 tr index 변수 갱신한다
                // 추가하는 필드를 잡는 기준이 달라서 1 더해준다
                this.initIndex = valuedinitIndex + 1;

                // 추가한 필드가 5개 일때 버튼 없앤다
                if(valuedinitIndex == 5){
                    this.button.parents('tr').hide();
                }

            },

            getValuedinitIndex: function(){
                var tr = this.tr;

                // 마지막 tr 부터 시작한다
                for(var a = tr.length - 2; a > 0; a--){

                    var trAdded = a;
                    var input = tr.eq(trAdded).find('input');

                    for(var i = 0; i < input.length; i++) {
                        // input 에 값이 있으면 해당 tr 의 index 값을 반환하고 종료한다
                        if(input.eq(i).val()){
                            return trAdded;
                        }
                    }
                }
            }

        };

        certificateInputUi.init();





        // 경력 기술서 추가
        var careerFeildUi = {
            table: $('#careerFeild table'),
            button: $('#addCareer'),

            init: function(){

                var objs = {
                    that: this
                }

                // 지원자가 경력 일때만 경력기술서 필드 보여준다
                //this.checkStatus();

                // 첫번째 테이블 빼고 숨긴다
                this.table.not(':eq(0)').hide();

                // 텍스트에리어에 값이 있는지 확인하고 있다면 해당 테이블 보여준다
                this.checkValue();

                // 경력 추가하기 버튼 클릭 시, 필드 추가한다
                this.button.on('click', objs, function(event){
                    event.preventDefault();
                    objs.that.showEl(objs);
                });

            },

            showEl: function(objs){
                objs.that.table.not(':visible').eq(0).show();

                if(objs.that.table.eq(4).is(':visible')){
                    objs.that.button.hide();
                }
            },

            checkValue: function(){

                for(var i = 0; i < this.table.length; i++){
                    var tableIndex = i;

                    for(var j = 0; j < this.table.eq(tableIndex).find('textarea').length; j++){
                        var textareaIndex = j;

                        if(this.table.eq(tableIndex).find('textarea').eq(textareaIndex).val()){
                            this.table.eq(tableIndex).show();
                        }
                    }

                    // input 에도 값이 있는지 체크한다
                    for(var j = 0; j < this.table.eq(tableIndex).find('input').length; j++){
                        var inputIndex = j;

                        if(this.table.eq(tableIndex).find('input').eq(inputIndex).val()){
                            this.table.eq(tableIndex).show();
                        }
                    }
                }

                // 5개 테이블이 다 보일 때 버튼 숨긴다
                if(this.table.eq(this.table.length - 1).is(':visible')){
                    this.button.hide();
                }

            },


            checkStatus: function(){

                var hideField = function(){
                    var selectedVal = $('#careerSelect option:selected').text();
                    var careerFiedd =  $('#careerFeild');

                    careerFiedd.hide();

                    if(selectedVal == '경력'){
                        careerFiedd.show();
                    } else {
                        careerFiedd.hide();
                    }
                }

                hideField();

                $('#careerSelect').on('change', function(){
                    hideField();
                });

            }
        }

        careerFeildUi.init();





        // 가족사항 추가
        var familyField = {

            init: function(){

                var objs = {
                    tr: $('#familyTable').find('tr'),
                    button: $('#addFamily'),
                    that: this
                }

                objs.tr.slice(4, 8).hide();

                this.addTr(objs);
                this.showTr(objs);

            },

            // tr 추가한다
            addTr: function(objs){
                objs.button.on('click', objs, function(event){
                    event.preventDefault();
                    objs.tr.not(':visible').eq(0).show();

                    // tr 마지막까지 늘어났다면 버튼 숨긴다
                    if(objs.tr.not(':visible').length == 0){
                        objs.button.closest('tr').hide();
                    }
                })
            },

            // 값이 있다면 tr 보여준다
            showTr: function(objs){
                objs.tr.each(function(index, el){
                    $(el).find('input').each(function(index, el){
                        if($(el).val()){
                            $(el).closest('tr').show();
                        }
                    })
                });
            }
        }

        familyField.init();



        $('#recruitPopup .button').on('click', function(){
            $('#agree').prop('checked', false);
            $('#agreeButton').hide();
        });


        // 지원하기 텝접근 방지
        $('#recruitPopup .button').keydown(function (e) {

            var canSubmit = $('#agreeButton').is(':visible');

            if (e.which === 9 && !canSubmit) {
                return false;
            }
        });

    }


})(jQuery);
