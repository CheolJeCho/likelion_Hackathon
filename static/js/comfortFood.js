const $comfortFood = (function() {
    'use strict'

    /**
     * 초기 이벤트 설정
     */
    const initEvt = function() {
        $("#resultDiv").hide();

        $("#formFile").change(function(e) {
            imgAnalysis();
        });
    }

    /**
     * 이미지 분석 및 결과 반환
     */
    const imgAnalysis = function(imgFile) {
        var form = $('#imgForm')[0];
        var formData = new FormData(form);

        $.ajax({
            type: "post",
            url: $SCRIPT_ROOT + "/api/naver/face",
            dataType: "json",
            data: formData,
            contentType: false,
            processData: false,
            success: function(result) {
                // 등록한 이미지 적용
                var myImg = document.querySelector('input[type=file]').files[0];
                var fileReader = new FileReader();

                fileReader.onloadend = function() {
                    $("#myImg").attr('src', fileReader.result);
                }

                if(myImg) {
                    fileReader.readAsDataURL(myImg);
                } else {
                    $("#myImg").attr('src', '');
                }
                
                // 감정 적용
                if(result.info.faceCount == 1) {
                    switch(result.faces[0].emotion.value) {
                        case "angry":
                            $("#emotion").html("화남");
                            $("#foodImg").attr('src', "static/img/angryFood.jpeg");
                            $("#food").html("똑같이 화난 한 <b>꼬지</b> 하실래예~?");
                            break;
                        case "disgust":
                            $("#emotion").html("혐오");
                            $("#foodImg").attr('src', "static/img/disgustFood.jpeg");
                            $("#food").html("<b>낫토</b> 으.....!");
                            break;
                        case "fear":
                            $("#emotion").html("무서움");
                            $("#foodImg").attr('src', "static/img/fearFood.jpeg");
                            $("#food").html("<b>팝콘</b>먹으면서 무서움을 달래봐요!");
                            break;
                        case "laugh":
                            $("#emotion").html("웃음");
                            $("#foodImg").attr('src', "static/img/laughFood.jpeg");
                            $("#food").html("<b>마시멜로우</b>로 행복한 당 충전!");
                            break;
                        case "neutral":
                            $("#emotion").html("평범");
                            $("#foodImg").attr('src', "static/img/neutralFood.jpeg");
                            $("#food").html("파릇파릇한 <b>상추 한 쌈</b> ?!");
                            break;
                        case "sad":
                            $("#emotion").html("슬픔");
                            $("#foodImg").attr('src', "static/img/sadFood.jpeg");
                            $("#food").html("우울할땐 <b>삼각 김밥</b> ㅠ.ㅠ");
                            break;
                        case "surprise":
                            $("#emotion").html("놀람");
                            $("#foodImg").attr('src', "static/img/surpriseFood.jpeg");
                            $("#food").html("놀랄것 같은 <b>Kinder 초콜릿</b> 기대되지 않나요?!");
                            break;
                        case "smile":
                            $("#emotion").html("웃음");
                            $("#foodImg").attr('src', "static/img/smileFood.jpeg");
                            $("#food").html("행복한 <b>치킨 너겟</b> 한조각 냠냠!");
                            break;
                        case "talking":
                            $("#emotion").html("수다");
                            $("#foodImg").attr('src', "static/img/talkingFood.jpeg");
                            $("#food").html("시끄러운 <b>M&A 초콜릿</b> 어떤가요?");
                            break;
                    }
                    
                    $("#resultDiv").show(); // 결과창 보이기
                } else {
                    alert("얼굴이 인식되지 않아요~! ㅠ.ㅠ \n 다른 사진을 등록해 주세요.");
                }
            },
            error: function(err) {
                alert("이미지 분석 실패!");
            }
        });
    }

    return {
        initEvt : initEvt
    }
} ());