//Eenter key submit 방지
function enterBrakey(e) { 
    if(e.keyCode==13 && e.srcElement.type != "textarea") 
    return false; 
}

//스크롤 애니메이션
AOS.init({
    easing : "ease-out-back",
    duration: 1000
});

//쿠키 여부
var cookiedata = document.cookie;
if (cookiedata.indexOf("todayCookie=Y") < 0){ 
    $(".ad-pop").fadeIn(170);
}

//이벤트 참여 - 팝업 닫기 (쿠키 제어)
$(document).on("click", ".ad-pop .etc span", function(){
    $(".ad-pop").fadeOut(170);
    if($(this).hasClass("today")) {
        setCookie("todayCookie","Y",1);
    }
});

//쿠키 설정 함수
function setCookie(name, value, expiredays) { 
    var todayDate = new Date(); 
    todayDate.setDate( todayDate.getDate() + expiredays );
    document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

//이벤트 참여 - 상황별 모달
$(document).on("click", ".ad-pop .pie, .evt_pie", function(){
    if($(this).hasClass("no_login")){
        //비 로그인
        var lang_ko = "이벤트에 참가하시려면<br>로그인을 하셔야 합니다.<br>로그인 하시겠습니까?";
        var lang_en = "You must log in to participate in the event.<br>Do you want to log in?";
        confirmLangLast(lang ,lang_ko, lang_en);
        $(".last .confirm-done").hide();
        $(".last .noLogin").show();
        showLast();
    } else if($(this).hasClass("no_state")){
        //조건 X
        var lang_ko = "이벤트 대상자가 아닙니다.<br>이벤트 기간 내에 가입한 신규 회원만<br>이벤트 참여가 가능합니다.";
        var lang_en = "The event targets is not.<br>Only new members who have joined within the event period can participate in the event.";
        confirmLangGate(lang ,lang_ko, lang_en);
        showGate();
    } else {
        //조건 O
        var lang_ko = "이벤트 참여를 위해 트위터 아이디를 등록하면<br>수정 및 변경이 불가능합니다.<br>이벤트에 참여 하시겠습니까?";
        var lang_en = "Once you register Twitter ID for participating in the event,<br>you cannot edit or replace.<br>Would you like to Participating in Event?";
        confirmLangLast(lang ,lang_ko, lang_en);
        $(".last .confirm-done").hide();
        $(".last .cpie").show();
        showLast();
    }
    confirmOpen();
});

//스크롤 이동
$(window).scroll(function(){
    if($(this).scrollTop() > 0) {
        $("header").addClass("down");
    } else {
        $("header").removeClass("down");
    }
});

//하단 고정 아이템
var bt_item = `<ul class="bt-fiexd">
                    <li class="item up"><span></span></li>
                </ul>`;
                //<li class="item evt"><a href="/event/1"></a></li>
$(".box-wrap").append(bt_item);

//최상단 이동
$(document).on("click", ".bt-fiexd .up", function(){
    $('html,body').animate({scrollTop: 0}, 500);
});

//기본 설정 언어
var lang = $("header .lang").siblings(".drop-down").find(".active").attr("data-type");

//drop - 열기
$(document).on("click", ".drop", function(){
    if($(this).hasClass("on")) {
        $(this).removeClass("on");
        $(this).siblings(".drop-down").slideUp(150);
    } else {
        $(".drop").removeClass("on");
        $(this).addClass("on");
        $(".drop-down").slideUp(150);
        $(this).siblings(".drop-down").slideDown(150);
    }
});

$(document).on("click", "html",function(e){
    //drop - 닫기
    if(!$(e.target).hasClass("drop")) { 
        $(".drop").removeClass("on");
        $(".drop-down").slideUp(150);
    }
    
    //확인 및 경고 모달 - 닫기 (바탕)
    if($(e.target).hasClass("confirm-modal")) { 
        confirmClose();
    }

    //이미지 확대 모달 - 닫기 (바탕)
    if($(e.target).hasClass("img-modal")) { 
        $(".img-modal").fadeOut(150);
    }

    //지갑 연결 모달 - 닫기 (바탕)
    if($(e.target).hasClass("wallet-modal")) { 
        $(".wallet-modal").fadeOut(150);
    }

    //클럽 상세 모달 - 닫기 (바탕)
    if($(e.target).hasClass("club_detail")) { 
        $(".club_detail").fadeOut(150);
    }

    //포인트 관련 상세 모달 - 닫기 (바탕)
    if($(e.target).hasClass("mypage_pDetail")) { 
        $(".mypage_pDetail").fadeOut(150);
    }

    //카드 뽑기 가이드 - 닫기 (바탕)
    if($(e.target).hasClass("nft_guide")) { 
        $(".nft_guide").fadeOut(150);
    }

    //선수 카드 상세 모달 - 닫기 (바탕)
    if($(e.target).hasClass("card_detail")) { 
        $(".card_detail").fadeOut(150);
    }

    //보유 NFT 목록 모달 - 닫기 (바탕)
    if($(e.target).hasClass("nft_fImgModal")) { 
        $(".nft_fImgModal").fadeOut(150);
    }

    //카드 뽑기 결과 - 정보 / off 효과 해제
    if($(e.target).hasClass("nft_reBox")) { 
        $(".nft_reCard li").removeClass("off");
        $(".nft_reInfo").hide();
    }
    if($(e.target).hasClass("nft_reCard")) { 
        $(".nft_reCard li").removeClass("off");
        $(".nft_reInfo").hide();
    }
    if($(e.target).hasClass("nft_reCardList")) { 
        $(".nft_reCard li").removeClass("off");
        $(".nft_reInfo").hide();
    }
    if($(e.target).hasClass("nft_reSort")) { 
        $(".nft_reCard li").removeClass("off");
        $(".nft_reInfo").hide();
    }
    if($(e.target).hasClass("nft_reOp")) { 
        $(".nft_reCard li").removeClass("off");
        $(".nft_reInfo").hide();
    }
});

//언어 - 선택
$(document).on("click", "header .lang + .drop-down p", function(){
    var language = $(this).attr("data-type");
    $("header .lang + .drop-down p").removeClass("active");
    $(this).addClass("active");
    console.log(language)
    $("header .lang").siblings("select").val(language);
    lang  = $("header .lang").siblings("select").val();
    console.log("언어 설정 : " + lang);
});

//mobile menu - 열기
$(document).on("click", ".header-icon .menu", function(){
    $(".menu-wrap").fadeIn(150);
    $(".menu-box").animate({
        right: "0"
    }, 150);
});

//mobile menu - 닫기
$(document).on("click", ".menu-back, .menu-box .close, .menu-box li", function(){
    $(".menu-wrap").fadeOut(150);
    $(".menu-box").animate({
        right: "-100%"
    }, 150);
    $(".sub").removeClass("on");
    $(".sub-menu").slideUp(150);
});


//mobile menu - sub 메뉴
$(document).on("click", ".menu-box .sub", function(){
    if($(this).hasClass("on")) {
        $(this).removeClass("on");
        $(this).siblings(".sub-menu").slideUp(150);
    } else {
        $(".sub").removeClass("on");
        $(this).addClass("on");
        $(".sub-menu").slideUp(150);
        $(this).siblings(".sub-menu").slideDown(150);
    }
});

//비밀번호 보기
$(document).on("click", ".form-view > .view", function(){
    $(this).toggleClass("on");
    if($(this).hasClass("on")){
        $(this).siblings("input").attr("type", "text");
    } else{
        $(this).siblings("input").attr("type", "password");
    }
});

//숫자만 입력 가능 (소수점 가능)
$(document).on("input", ".form-num input", function(){
    this.value = this.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
});

//글자수 제한(3자리)
function numberMaxLength(e){
    e.value = e.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
    if(e.value.length > 3){
        e.value = e.value.slice(0, 3);
    }
}

//검색 - enter submit
$(document).on("keydown", ".search-box input[type='text']",function(e){
    if (e.keyCode === 13) {
        if (window.event) {
            e.preventDefault();
            if($(this).val().trim() == "") {
                var lang_ko = "검색어를 입력해 주세요.";
                var lang_en = "Please enter a search word";
                confirmLangGate(lang ,lang_ko, lang_en);
                confirmOpen();
                showGate();
            } else {
                $(this).closest(".search-box").submit();
            }
        }
    }
});

//아코디언
$(document).on("click", ".acco_box h3", function(){
    if($(".acco_box").hasClass("qna")){
        //단일
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(this).siblings("div").slideUp(150);
        } else {
            $(".acco_box h3").removeClass("active");
            $(this).addClass("active");
            $(".acco_box div").slideUp(150);
            $(this).siblings("div").slideDown(150);
        }
    } else {
        //통일
        if (!$(this).hasClass("active")) {
            $(this).addClass("active");
            $(this).siblings("div").slideDown(150);
        } else {
            $(this).removeClass("active");
            $(this).siblings("div").slideUp(150);
        }
    }
});

//지갑 주소 줄임 표시
$(".w-addr").each(function(){
    var w_og = $(this).text();
    var w_sh = w_og.substr(0, 4) + " .... " + w_og.substr(-4, 4);
    $(this).text(w_sh);
    
    //지갑주소 복사
    $(this).closest(".copyItem").find(".copyBtn").on("click", function(e){
        e.preventDefault();
        console.log("복사된 지갑 주소 : " + w_og)
        var copyInput = `<input type="text" value="${w_og}">`;
        $(this).closest(".copyItem").append(copyInput);
        $(this).closest(".copyItem").find("input").select();
        document.execCommand("copy");
        $(this).closest(".copyItem").find("input").remove();
        var lang_ko = "복사가 완료되었습니다.";
        var lang_en = "Copy is complete";
        confirmLangGate(lang ,lang_ko, lang_en);
        showGate();
        confirmOpen();
    });
});

//복사 - 일반
$(document).on("click", ".copyBtn", function(e){
    e.preventDefault();
    if(!$(this).closest(".copyItem").find(".copyTxt").hasClass("w-addr")) {
        var copyTxt = $(this).closest(".copyItem").find(".copyTxt").text();
        console.log("복사된 지갑 주소 : " + copyTxt)
        var copyInput = `<input type="text" value="${copyTxt}">`;
        $(this).closest(".copyItem").append(copyInput);
        $(this).closest(".copyItem").find("input").select();
        document.execCommand("copy");
        $(this).closest(".copyItem").find("input").remove();
        var lang_ko = "복사가 완료되었습니다.";
        var lang_en = "Copy is complete";
        confirmLangGate(lang ,lang_ko, lang_en);
        showGate();
        confirmOpen();
    }
});

//커뮤니티 카테고리 - 선택
$(document).on("click", ".commu_cate input[type='checkbox']", function(){
    $(".commu_cate input[type='checkbox']").prop("checked", false);
    $(this).prop("checked", true);
    
    //신규 팀 등록 - 유니폼 색상 입력란
    if($(".commu_cate li").hasClass("color")) {
        if($(".commu_cate #chk1").prop("checked")) {
            $(".color").removeClass("hide");
            $(".color input").val("").focus();
        } else {
            $(".color").addClass("hide");
            $(".color input").val("없음");
        }
    }
});

//커뮤니티 이미지 - 등록
$(document).on("change", ".commu_file input, #clubEmblem", function(){
    var fileName = $(this).val();
    var fileId = $(this).attr("id");

    if(fileName != ""){
        var ext = $(this).val().split(".").pop().toLowerCase();
        if($.inArray(ext, ["gif","png","jpg","jpeg","doc","docx","xls","xlsx","hwp"]) == -1) {
            var lang_ko = "이미지 파일 확장자만 등록 가능합니다.";
            var lang_en = "Only image file extensions can be Registered";
            confirmLangGate(lang ,lang_ko, lang_en);
            confirmOpen();
            showGate();
            $(this).val("");
            return;
        }
        readURL(this, fileId);
    }
});

//커뮤니티 이미지 - 등록 함수
function readURL(input, fileId) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            if(fileId != "clubEmblem") {
                //일반
                var img_html = `<div class="commu_fileImg">
                                    <img src="${e.target.result}">
                                    <span class="del">삭제</span>
                                </div>`;
                $("#"+fileId).closest("li").append(img_html);
                $("#"+fileId).closest("li").find(".commu_file").addClass("hide");
            } else {
                //썸네일
                var img_html = `<li class="commu_emblemImg">
                                    <div>
                                        <img src="${e.target.result}">
                                    </div>
                                    <span class="del">삭제</span>
                                </li>`;
                $("#"+fileId).closest(".commu_emblemBox").append(img_html);
                $("#"+fileId).closest(".commu_emblemBox").find(".commu_emblem").addClass("hide");
            }

        }
        reader.readAsDataURL(input.files[0]);
    }
}

//커뮤니티 이미지 - 삭제
$(document).on("click", ".commu_fileImg .del", function(){
    $(this).closest(".commu_fileImg").siblings(".commu_file").removeClass("hide");
    $(this).closest(".commu_fileImg").siblings(".commu_file").find("input").val("");
    $(this).closest(".commu_fileImg").remove();
    $(".commu_file input, #clubEmblem").val = null;
});

//커뮤니티 클럽 엠블럼 - 삭제
$(document).on("click", ".commu_emblemImg .del", function(){
    $(this).closest(".commu_emblemImg").siblings(".commu_emblem").removeClass("hide");
    $(this).closest(".commu_emblemImg").siblings(".commu_emblem").find("input").val("");
    $(this).closest(".commu_emblemImg").remove();
});

//커뮤니티 - 좋아요
$(".board_detail .heart").on("click", function(){
    var count = parseInt($(this).text());
    $(this).toggleClass("on");
    if($(this).hasClass("on")) {
        $(this).text(count + 1);
    } else {
        $(this).text(count - 1);
    }
});

//쪽지 - 전체 선택
$(document).on("click", ".note_all input[type='checkbox']", function(){
    if($(this).prop("checked")) {
        $(".note_list input").prop("checked", true);
    } else {
        $(".note_list input").prop("checked", false);
    }
});

//쪽지 - 부분 선택
$(document).on("click", ".note_list input[type='checkbox']", function(){
    if($(".note_list input").length == $(".note_list input:checked").length) {
        $(".note_all input").prop("checked", true);
    } else {
        $(".note_all input").prop("checked", false);
    }
});

//boadr - CRUD
$(document).on("click", ".board_crud li > *", function(){
    if($(this).is("[data-type]")) {
        var crud_type = $(this).attr("data-type");
        console.log(crud_type)
        
        if(crud_type == "c_del") {
            //게시글 - 삭제
            var lang_ko = "삭제된 게시글은 복구할 수 없습니다.<br>게시글을 삭제 하시겠습니까?";
            var lang_en = "Deleted posts cannot be recovered.<br>Do you want to delete the post?";
            confirmLangLast(lang ,lang_ko, lang_en);
            $(".last .confirm-done").hide();
            $(".cDel_done").show();
            confirmOpen();
            showLast();
        } else if(crud_type == "c_report") {
            //게시글 - 신고
            var lang_ko = "해당 게시글은 관리자에게 신고 처리됩니다.<br>게시글을 신고 하시겠습니까?";
            var lang_en = "Post will be reported to the admin.<br>Do you want to report the posting?";
            confirmLangLast(lang ,lang_ko, lang_en);
            $(".last .confirm-done").hide();
            $(".cReport_done").show();
            confirmOpen();
            showLast();
        } else if(crud_type == "r_updateBox") {
            //댓글 - 수정 입력란 열기
            $(".reply_insert").hide(100);
            $(".reply_insert textarea").val("");
            $(".reply_update").hide(100);
            $(".reply_box .board_crud").show(100);
            $(this).closest(".board_crud").siblings(".lang-change").hide(100);
            var update_txt = $(this).closest(".board_crud").siblings("p").text();
            $(this).closest(".board_crud").hide(100);
            $(this).closest(".board_crud").siblings(".reply_form").show(100);
            $(this).closest(".board_crud").siblings(".reply_form").find("textarea").val(update_txt);
        } else if(crud_type == "r_del") {
            //댓글 - 삭제
            $(".reply_insert").show(100);
            $(".reply_insert textarea").val("");
            $(".reply_update").hide(100);
            $(".reply_box .board_crud").show(100);
            var lang_ko = "삭제된 댓글은 복구할 수 없습니다.<br>댓글을 삭제 하시겠습니까?";
            var lang_en = "Deleted comments cannot be recovered.<br>Do you want to delete the comments?";
            confirmLangLast(lang ,lang_ko, lang_en);
            $(".last .confirm-done").hide();
            $(".rDel_done").show();
            confirmOpen();
            showLast();
        } else if(crud_type == "r_report") {
            //댓글 - 신고
            $(".reply_insert").show(100);
            $(".reply_insert textarea").val("");
            $(".reply_update").hide(100);
            $(".reply_box .board_crud").show(100);
            var lang_ko = "해당 댓글은 관리자에게 신고 처리됩니다.<br>댓글을 신고 하시겠습니까?";
            var lang_en = "Comments will be reported to the admin.<br>Do you want to report the comments?";
            confirmLangLast(lang ,lang_ko, lang_en);
            $(".last .confirm-done").hide();
            $(".rReport_done").show();
            confirmOpen();
            showLast();
        } else if(crud_type == "n_del") {
            //쪽지 - 삭제
            if(parseInt($(".note_all label span").text()) > 0) {
                confirmOpen();
                if($(".note_list input").length > 0) {
                    if($(".note_list input:checked").length > 0) {
                        var lang_ko = "삭제된 쪽지는 복구할 수 없습니다.<br>쪽지를 삭제 하시겠습니까?";
                        var lang_en = "Deleted note cannot be recovered.<br>Do you want to delete the note?";
                        confirmLangLast(lang ,lang_ko, lang_en);
                        $(".last .confirm-done").hide();
                        $(".nDel_done").show();
                        showLast();
                    } else {
                        var lang_ko = "선택된 쪽지가 없습니다.<br>삭제하시려는 쪽지를 선택해 주세요.";
                        var lang_en = "There is no selected note.<br>Please select the note you want to delete";
                        confirmLangGate(lang ,lang_ko, lang_en);
                        showGate();
                    }
                } else {
                    var lang_ko = "삭제된 쪽지는 복구할 수 없습니다.<br>쪽지를 삭제 하시겠습니까?";
                    var lang_en = "Deleted note cannot be recovered.<br>Do you want to delete the note?";
                    confirmLangLast(lang ,lang_ko, lang_en);
                    $(".last .confirm-done").hide();
                    $(".nDel_done").show();
                    showLast();
                }
            }
        } else if(crud_type == "n_save") {
            //쪽지 - 보관
            if(parseInt($(".note_all label span").text()) > 0) {
                confirmOpen();
                if($(".note_list input").length > 0) {
                    if($(".note_list input:checked").length > 0) {
                        var lang_ko = "선택하신 쪽지는 보관함으로 이동됩니다.<br>쪽지를 보관 하시겠습니까?";
                        var lang_en = "Selected note will be moved to Save.<br>Do you want to save the note?";
                        confirmLangLast(lang ,lang_ko, lang_en);
                        $(".last .confirm-done").hide();
                        $(".nSave_done").show();
                        showLast();
                    } else {
                        var lang_ko = "선택된 쪽지가 없습니다.<br>보관하시려는 쪽지를 선택해 주세요.";
                        var lang_en = "There is no selected note.<br>Please select the note you want to save";
                        confirmLangGate(lang ,lang_ko, lang_en);
                        showGate();
                    }
                } else {
                    var lang_ko = "해당 쪽지는 보관함으로 이동됩니다.<br>쪽지를 보관 하시겠습니까?";
                    var lang_en = "Note will be moved to Save.<br>Do you want to save the note?";
                    confirmLangLast(lang ,lang_ko, lang_en);
                    $(".last .confirm-done").hide();
                    $(".nSave_done").show();
                    showLast();
                }
            }
        } else if(crud_type == "n_report") {
            //쪽지 - 신고
            if(parseInt($(".note_all label span").text()) > 0) {
                confirmOpen();
                if($(".note_list input").length > 0) {
                    if($(".note_list input:checked").length > 0) {
                        var lang_ko = "선택하신 쪽지는 관리자에게 신고 처리됩니다.<br>쪽지를 보관 하시겠습니까?";
                        var lang_en = "Selected note will be reported to the admin.<br>Do you want to report the note?";
                        confirmLangLast(lang ,lang_ko, lang_en);
                        $(".last .confirm-done").hide();
                        $(".nReport_done").show();
                        showLast();
                    } else {
                        var lang_ko = "선택된 쪽지가 없습니다.<br>보관하시려는 쪽지를 선택해 주세요.";
                        var lang_en = "There is no selected note.<br>Please select the note you want to report";
                        confirmLangGate(lang ,lang_ko, lang_en);
                        showGate();
                    }
                } else {
                    var lang_ko = "해당 쪽지는 관리자에게 신고 처리됩니다.<br>쪽지를 신고 하시겠습니까?";
                    var lang_en = "Note will be reported to the admin.<br>Do you want to report the note?";
                    confirmLangLast(lang ,lang_ko, lang_en);
                    $(".last .confirm-done").hide();
                    $(".nReport_done").show();
                    showLast();
                }
            }
        } else if(crud_type == "a_del") {
            //문의 - 삭제
            if(parseInt($(".note_all label span").text()) > 0) {
                confirmOpen();
                if($(".note_list input").length > 0) {
                    if($(".note_list input:checked").length > 0) {
                        var lang_ko = "삭제된 문의글은 복구할 수 없습니다.<br>문의글을 삭제 하시겠습니까?";
                        var lang_en = "Deleted inquiries cannot be recovered.<br>Do you want to delete the inquiries?";
                        confirmLangLast(lang ,lang_ko, lang_en);
                        showLast();
                    } else {
                        var lang_ko = "선택된 문의글이 없습니다.<br>삭제하시려는 문의글을 선택해 주세요.";
                        var lang_en = "There is no selected inquiries.<br>Please select the inquiries you want to delete";
                        confirmLangGate(lang ,lang_ko, lang_en);
                        showGate();
                    }
                } else {
                    var lang_ko = "삭제된 문의글이 복구할 수 없습니다.<br>문의글을 삭제 하시겠습니까?";
                    var lang_en = "Deleted inquiries cannot be recovered.<br>Do you want to delete the inquiries?";
                    confirmLangLast(lang ,lang_ko, lang_en);
                    showLast();
                }
            }
        }
    }
});

// 댓글 포커싱 - in
$(document).on("focus", ".reply_form textarea", function(){
    $(this).closest(".reply_form").addClass("active");
});

// 댓글 포커싱 - out
$(document).on("blur", ".reply_form textarea", function(){
    $(this).closest(".reply_form").removeClass("active");
});

// 댓글 포커싱 - out
$(document).on("click", ".reply_form", function(){
    $(this).removeClass("active");
    $(this).find("textarea").focus();
});

//댓글 - form
$(document).on("click", ".reply_form div > *", function(){
    var reply_type = $(this).attr("data-type");
    if(reply_type == "r_insert") {
        //댓글 - 등록
        if($(this).closest(".reply_form").find("textarea").val() == "") {
            var lang_ko = "댓글을 입력 해주세요.";
            var lang_en = "Please enter the comments";
            confirmLangGate(lang ,lang_ko, lang_en);
            confirmOpen();
            showGate();
        } else {
            $(this).closest(".reply_form").submit();
        }
    } else if(reply_type == "r_update") {
        //댓글 - 수정
        if($(this).closest(".reply_form").find("textarea").val() == "") {
            var lang_ko = "댓글을 입력 해주세요.";
            var lang_en = "Please enter the comments";
            confirmLangGate(lang ,lang_ko, lang_en);
            confirmOpen();
            showGate();
        } else {
            var lang_ko = "입력하신 글로 댓글이 수정됩니다.<br>댓글을 수정 하시겠습니까?";
            var lang_en = "Comments will be modified with your input.<br>Do you want to edit?";
            confirmLangLast(lang ,lang_ko, lang_en);
            $(".last .confirm-done").hide();
            $(".rUpdate_done").show();
            confirmOpen();
            showLast();
        }
    } else if(reply_type == "r_cancel") {
        //댓글 - 취소
        $(this).closest(".reply_form").siblings(".board_crud").show(100);
        $(this).closest(".reply_form").siblings(".lang-change").show(100);
        $(this).closest(".reply_form").hide(100);
        $(this).closest(".reply_form").find("textarea").val("");
        $(".reply_insert").show(100);
    }
});

//더블 클릭 드래그 방지
$(document).on("selectstart", ".drop, .note_all label", function(event){
    //드롭, 쪽지 전체선택
    return false;
});

//이미지 확대 모달 - 열기
$(document).on("click", ".img-big", function(){
    var url = $(this).attr("src");
    $(".img-modal img").attr("src", url);
    $(".img-modal").fadeIn(150);
});

//이미지 확대 모달 - 닫기
$(document).on("click", ".img-box span", function(){
    $(".img-modal").fadeOut(150);
});

//확인 모달 - 열기
$(document).on("click", ".confirm-open", function(){
    var is_val = true;
    confirmOpen();

    $(".form-box input, .form-box textarea, .form-box select").each(function(){
        if($(this).closest(".form-group").attr("data-type") === "name") {
            //이름
            if($(this).val() == ""){
                var lang_ko = "이름을 입력해 주세요.";
                var lang_en = "Please enter your name";
                confirmLangGate(lang ,lang_ko, lang_en);
                return is_val = false;
            }
        } else if($(this).closest(".form-group").attr("data-type") === "email") {
            //이메일
            var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            if($(this).val() == ""){
                var lang_ko = "이메일 입력해 주세요.";
                var lang_en = "Please enter your e-mail";
                confirmLangGate(lang ,lang_ko, lang_en);
                return is_val = false;
            } else if (!filter.test($(this).val().trim())) {
                var lang_ko = "올바른 형식의 이메일이 아닙니다.";
                var lang_en = "E-mail is not in the correct format";
                confirmLangGate(lang ,lang_ko, lang_en);
                return is_val = false;
            }
        } else if($(this).closest(".form-group").attr("data-type") === "id") {
            //아이디
            if($(this).val() == ""){
                var lang_ko = "아이디를 입력해 주세요.";
                var lang_en = "Please enter your id";
                confirmLangGate(lang ,lang_ko, lang_en);
                return is_val = false;
            }
        } else if($(this).closest(".form-group").attr("data-type") === "psw") {
            //비밀번호
            if($(this).val() == ""){
                var lang_ko = "비밀번호를 입력해 주세요.";
                var lang_en = "Please enter your password";
                confirmLangGate(lang ,lang_ko, lang_en);
                return is_val = false;
            }
        } else if($(this).closest(".form-group").attr("data-type") === "pswChk") {
            //비밀번호 확인
            if($(this).val() == ""){
                var lang_ko = "위에 입력한 비밀번호와 동일한 비밀번호를 입력해 주세요.";
                var lang_en = "Please enter the same password as the one you entered above";
                confirmLangGate(lang ,lang_ko, lang_en);
                return is_val = false;
            }
        } else if($(this).closest(".form-group").attr("data-type") === "pswNew") {
            //새로운 비밀번호
            if($(this).val() == ""){
                var lang_ko = "새로운 비밀번호를 입력해 주세요.";
                var lang_en = "Please enter your new password";
                confirmLangGate(lang ,lang_ko, lang_en);
                return is_val = false;
            }
        } else if($(this).closest(".form-group").attr("data-type") === "pswWallet") {
            //지갑 비밀번호
            if($(this).val() == ""){
                var lang_ko = "지갑 비밀번호를 입력해 주세요.";
                var lang_en = "Please enter your password";
                confirmLangGate(lang ,lang_ko, lang_en);
                return is_val = false;
            }
        } else if($(this).closest(".form-group").attr("data-type") === "walletReceive") {
            //출금 지갑 주소
            if($(this).val() == ""){
                var lang_ko = "받으시려는 지갑주소를 입력해 주세요.";
                var lang_en = "Please enter the wallet address you want to receive";
                confirmLangGate(lang ,lang_ko, lang_en);
                return is_val = false;
            }
        } else if($(this).closest(".form-chk").attr("data-type") === "agreeTerms") {
            //시설 이용약관
            if(!$(this).prop("checked")){
                var lang_ko = "시설 이용약관에 체크해 주세요.";
                var lang_en = "Please check your content";
                confirmLangGate(lang ,lang_ko, lang_en);
                return is_val = false;
            }
        } else if($(this).closest(".form-chk").attr("data-type") === "agreePolicy") {
            //개인정보처리방침
            if(!$(this).prop("checked")){
                var lang_ko = "개인정보처리방침에 체크해 주세요.";
                var lang_en = "Please check your content";
                confirmLangGate(lang ,lang_ko, lang_en);
                return is_val = false;
            }
        } else if($(this).closest(".form-chk").attr("data-type") === "agree") {
            //약관 동의
            if(!$(this).prop("checked")){
                var lang_ko = "약관 동의에 체크해 주세요.";
                var lang_en = "Please check the terms and conditions";
                confirmLangGate(lang ,lang_ko, lang_en);
                return is_val = false;
            }
        } else if($(this).closest(".form-group").attr("data-type") === "title") {
            //제목
            if($(this).val() == ""){
                var lang_ko = "제목을 입력해 주세요.";
                var lang_en = "Please enter your title";
                confirmLangGate(lang ,lang_ko, lang_en);
                return is_val = false;
            }
        } else if($(this).closest(".form-group").attr("data-type") === "content") {
            //내용
            if($(this).val() == ""){
                var lang_ko = "내용을 입력해 주세요.";
                var lang_en = "Please enter your content";
                confirmLangGate(lang ,lang_ko, lang_en);
                return is_val = false;
            }
        } else if($(this).closest(".form-group").attr("data-type") === "category") {
            //카테고리
            if($(".commu_cate input:checkbox").is(":checked") == false){
                var lang_ko = "카테고리를 선택해 주세요.";
                var lang_en = "Please check your category";
                confirmLangGate(lang ,lang_ko, lang_en);
                return is_val = false;
            }
        } else if($(this).closest(".form-group").attr("data-type") === "clubName") {
            //클럽명
            if($(this).val() == ""){
                var lang_ko = "클럽명을 입력해 주세요.";
                var lang_en = "Please enter your club name";
                confirmLangGate(lang ,lang_ko, lang_en);
                return is_val = false;
            } else {
                if(!$(this).siblings("button").hasClass("pass")){
                    var lang_ko = "클럽명 중복 확인을 해주세요.";
                    var lang_en = "Please check the same club name";
                    confirmLangGate(lang ,lang_ko, lang_en);
                    return is_val = false;
                }
            } 
        } else if($(this).closest(".form-group").attr("data-type") === "location") {
            //지역
            if($(this).val() == ""){
                var lang_ko = "지역을 입력해 주세요.";
                var lang_en = "Please enter your activity area";
                confirmLangGate(lang ,lang_ko, lang_en);
                return is_val = false;
            }
        } else if($(this).closest(".form-group").attr("data-type") === "uniform") {
            //유니폼
            if($(".commu_cate input:checkbox").is(":checked") == false){
                var lang_ko = "유니폼 선택해 주세요.";
                var lang_en = "Please check your uniform";
                confirmLangGate(lang ,lang_ko, lang_en);
                return is_val = false;
            } else {
                //유니폼 색상
                if($(".color input").val() == ""){
                    var lang_ko = "유니폼 색상을 입력해 주세요.";
                    var lang_en = "Please enter your uniform color";
                    confirmLangGate(lang ,lang_ko, lang_en);
                    return is_val = false;
                }
            }
        } else if($(this).closest(".form-group").attr("data-type") === "emblem") {
            //엠블럼
            if(!$(this).closest(".commu_emblemBox").find(".commu_emblemImg").is(":visible")){
                var lang_ko = "엠블럼을 등록해 주세요.";
                var lang_en = "Please register the emblem";
                confirmLangGate(lang ,lang_ko, lang_en);
                return is_val = false;
            }
        } else if($(this).closest(".form-group").attr("data-type") === "guide") {
            //소개
            if($(this).val() == ""){
                var lang_ko = "소개 글을 입력해 주세요.";
                var lang_en = "Please enter your introduction";
                confirmLangGate(lang ,lang_ko, lang_en);
                return is_val = false;
            }
        } else if($(this).closest(".form-group").attr("data-type") === "birth") {
            //생년월일
            if($(this).val() == ""){
                var lang_ko = "생년월일을 설정해 주세요.";
                var lang_en = "Please set up your birth";
                confirmLangGate(lang ,lang_ko, lang_en);
                return is_val = false;
            }
        } else if($(this).closest(".form-group").attr("data-type") === "body") {
            //신체
            if($(this).val() == ""){
                var lang_ko = "신장 및 체중을 입력해 주세요.";
                var lang_en = "Please enter your height and weight";
                confirmLangGate(lang ,lang_ko, lang_en);
                return is_val = false;
            }
        } else if($(this).closest(".form-group").attr("data-type") === "grade") {
            //등급
            if($(this).val() == ""){
                var lang_ko = "등급을 설정해 주세요.";
                var lang_en = "Please set up your grade";
                confirmLangGate(lang ,lang_ko, lang_en);
                return is_val = false;
            }
        } else if($(this).closest(".form-group").attr("data-type") === "skill") {
            //등급
            if($(this).val() == ""){
                var lang_ko = "개인기를 설정해 주세요.";
                var lang_en = "Please set up your skill";
                confirmLangGate(lang ,lang_ko, lang_en);
                return is_val = false;
            }
        } else if($(this).closest(".form-group").attr("data-type") === "matchDate") {
            //경기 날짜
            if($(this).val() == ""){
                var lang_ko = "경기 날짜를 설정해 주세요.";
                var lang_en = "Please set up your match date";
                confirmLangGate(lang ,lang_ko, lang_en);
                return is_val = false;
            }
        } else if($(this).closest(".form-group").attr("data-type") === "matchTime") {
            //경기 시간
            if($(this).val() == ""){
                var lang_ko = "경기 시간을 설정해 주세요.";
                var lang_en = "Please set up your match time";
                confirmLangGate(lang ,lang_ko, lang_en);
                return is_val = false;
            }
        } else if($(this).closest(".form-group").attr("data-type") === "score") {
            //스코어
            if($(this).val() == ""){
                var lang_ko = "스코어를 입력해 주세요.";
                var lang_en = "Please enter your score";
                confirmLangGate(lang ,lang_ko, lang_en);
                return is_val = false;
            }
        } else if($(this).closest(".form-group").attr("data-type") === "away") {
            //상대 클럽
            if($(this).val() == ""){
                var lang_ko = "상대 클럽을 입력해 주세요.";
                var lang_en = "Please enter your away club";
                confirmLangGate(lang ,lang_ko, lang_en);
                return is_val = false;
            }
        } else if($(this).closest(".form-group").attr("data-type") === "amount") {
            //수량
            if($(this).val() == ""){
                var lang_ko = "수량을 입력해 주세요.";
                var lang_en = "Please enter your amount";
                confirmLangGate(lang ,lang_ko, lang_en);
                return is_val = false;
            } else {
                if($(this).closest(".form-group").hasClass("withdraw")) {
                    var retain_amount = parseInt(removeComma($(".retain").text()));
                    var withdraw_amount = parseInt($(this).val());
                    if(withdraw_amount > retain_amount) {
                        var lang_ko = "보유 수량을 초과하여 입력하셨습니다.";
                        var lang_en = "You have entered more than the retain you hold";
                        confirmLangGate(lang ,lang_ko, lang_en);
                        return is_val = false;
                    }
                }
            }
        } else if($(this).closest(".form-group").attr("data-type") === "hash") {
            //해시값
            if($(this).val() == ""){
                var lang_ko = "해시값을 입력해 주세요.";
                var lang_en = "Please enter your hash value";
                confirmLangGate(lang ,lang_ko, lang_en);
                return is_val = false;
            }
        } else if($(this).closest(".form-group").attr("data-type") === "walletReceive") {
            //받을 지갑 주소
            if($(this).val() == ""){
                var lang_ko = "받을 지갑 주소를 입력해 주세요.";
                var lang_en = "Please enter your wallet address to receive";
                confirmLangGate(lang ,lang_ko, lang_en);
                return is_val = false;
            }
        } else if($(this).closest(".form-group").attr("data-type") === "sellPrice") {
            //판매가격
            if($(this).val() == ""){
                var lang_ko = "판매 가격을 입력해 주세요.";
                var lang_en = "Please enter selling price";
                confirmLangGate(lang ,lang_ko, lang_en);
                return is_val = false;
            }
        } else if($(this).closest(".form-group").attr("data-type") === "walletWithdraw") {
            //출금 지갑 주소
            if($(this).val() == ""){
                var lang_ko = "출금 지갑 주소를 입력해 주세요.";
                var lang_en = "Please enter withdrawal wallet address";
                confirmLangGate(lang ,lang_ko, lang_en);
                return is_val = false;
            }
        } else if($(this).closest(".form-group").attr("data-type") === "twitterId") {
            //출금 지갑 주소
            if($(this).val() == ""){
                var lang_ko = "트위터 아이디를 입력해 주세요.";
                var lang_en = "Please enter your Twitter ID";
                confirmLangGate(lang ,lang_ko, lang_en);
                return is_val = false;
            }
        }
    });

    //NFT 카드 등록
    if($(".nft_fImg .item > img").length > 0) {
        if($(".nft_fImg .item > img").attr("src") == "") {
            var lang_ko = "판매하시려는 NFT 카드를 등록해 주세요.";
            var lang_en = "Please register the card you want to sell";
            confirmLangGate(lang ,lang_ko, lang_en);
            is_val = false;
        }
    }

    if(is_val) {
        showLast();
    } else{
        showGate();
    }
});

//확인 모달 - 닫기 (확인 - submit)
$(document).on("click", ".confirm-done", function(){
    confirmClose();
    if($(this).prop("tagName") == "BUTTON") {
        console.log("form submit 성공");
        $(this).attr("type", "submit");
        $(".loading_box").fadeIn(150);
    }
});

//확인 모달 - 닫기 (휘소)
$(document).on("click", ".confirm-cancel", function(){
    confirmClose();
});

//확인 모달 - 준비 중
$(document).on("click", ".confirm-ready", function(){
    var lang_ko = "준비 중인 서비스 입니다.";
    var lang_en = "The service is being prepared.";
    confirmLangGate(lang ,lang_ko, lang_en);
    confirmOpen();
    showGate();
});

//확인 모달 - 열기 함수
function confirmOpen(){
    $(".confirm-modal").fadeIn(150);
}

//확인 모달 - 닫기 함수
function confirmClose(){
    $(".confirm-modal").fadeOut(150);
}

//확인 모달 - 열기 함수
function confirmOpenCus(tips){
    $(".gate h3").html(tips);
    $(".confirm-modal").fadeIn(150);
    setTimeout(() => {
        confirmClose()
    }, 3000);
}


//확인 모달 - last 보여주기
function showLast(){
    $(".confirm-box.gate").hide();
    $(".confirm-box.last").show();
}

//확인 모달 - gate 보여주기
function showGate(){
    $(".confirm-box.last").hide();
    $(".confirm-box.gate").show();
}

//last 모달 - 언어
function confirmLangLast(lang ,lang_ko, lang_en) {
    if(lang == "ko") {
        $(".last p").html(lang_ko);
    } else if(lang == "en") {
        $(".last p").html(lang_en);
    }
}

//gate 모달 - 언어
function confirmLangGate(lang ,lang_ko, lang_en) {
    if(lang == "ko") {
        $(".gate p").html(lang_ko);
    } else if(lang == "en") {
        $(".gate p").html(lang_en);
    }
}

//콤마 - 추가 함수
function addComma(value){
    while (/(\d+)(\d{3})/.test(value.toString())){
        value = value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }
    return value;
}

//콤마 - 제거 함수
function removeComma(value){
    value = value.replace(/[^\d]+/g, "");
    return value; 
}

//지갑 연결 모달 - 열기
$(document).on("click", "header .wallet", function(){
    walletOpen(this);
});

//지갑 연결 모달 - 연결 / 닫기 / 복사
$(document).on("click", ".wallet-modal .connect .item > p", function(e){
    if(!$(this).hasClass("w-copyBtn")) {
        //연결
        if($(this).find("span").hasClass("mm")) {
            localStorage.setItem('type',"MetaMask");
            onConnect();
        } else if($(this).find("span").hasClass("wc")) {
            localStorage.setItem('type',"WalletConnect");
            onConnect();
        }

        //닫기
        walletClose();
    } else {
        //복사
        var copyTxt = $(this).closest(".wallet-modal").find(".w-copyItem").text();
        console.log("복사된 지갑 주소 : " + copyTxt)
        var copyInput = `<input type="text" value="${copyTxt}">`;
        $(this).closest(".wallet-modal").append(copyInput);
        $(this).closest(".wallet-modal").find("input").select();
        document.execCommand("copy");
        $(this).closest(".wallet-modal").find("input").remove();
        $(this).find("b").addClass("active");
        $(this).closest(".wallet-modal").find(".w-copyItem").addClass("c-main");
    }

});

//지갑 연결 모달 - 열기 함수
function walletOpen(e){
    console.log($(e).hasClass("on"));
    $(".wallet-modal").remove();
    var item = "";
    var w_tit = "";
    var w_txt = "";
    var w_copy = "";
    var w_discon = "";
    var w_con = ""
    
    if(!$(e).hasClass("on")) {
        if(lang == "ko") {
            w_tit = "지갑 연결하기";
            w_txt = "연결하시려는 유형의 지갑을<br>선택해 주세요.";
        } else if(lang == "en") {
            w_tit = "Connect Wallet";
            w_txt = "Please select the type of wallet<br>you want to connect to.";
        }
        var item = `<section class="wallet-modal">
                        <article class="connect">
                            <h3><b class="pt-0">${w_tit}</b></h3>
                            <p>${w_txt}</p>
                            <div class="item">
                                <p>
                                    <span class="mm"></span>
                                    <b>Meta Mask</b>
                                </p>
                                <p>
                                    <span class="wc"></span>
                                    <b>Wallet Connect</b>
                                </p>
                            </div>
                        </article>
                    </section>`;
    } else {
        if(lang == "ko") {
            w_tit = "지갑 주소";
            w_copy = "주소 복사";
            w_discon = "연결 해제";
        } else if(lang == "en") {
            w_tit = "Wallet Address";
            w_copy = "Copy Address";
            w_discon = "Disconnect";
        }
        
        localStorage.getItem("type");
        if (localStorage.getItem("type") == "MetaMask") {
            w_con = "mm";
        } else if (localStorage.getItem("type") == "WalletConnect") {
            w_con = "wc";
        }

        var item = `<section class="wallet-modal">
                        <article class="connect">
                            <h3>
                                <span class="${w_con}"></span>
                                <b>${w_tit}</b>
                            </h3>
                            <p class="w-copyItem">${selectedAccount}</p>
                            <div class="item">
                                <p class="w-copyBtn"><b>${w_copy}</b></p>
                                <p onclick="onDisconnect()"><b>${w_discon}</b></p>
                            </div>
                        </article>
                    </section>`;
    }
    $(".box-wrap").append(item);
    $(".wallet-modal").fadeIn(150);
}

//지갑 연결 모달 - 닫기 함수
function walletClose(){
    $(".wallet-modal").fadeOut(150);
    setTimeout(() => {
        $(".wallet-modal").remove();
    }, 1000);
}

//결제 수단 모달 - 닫기
$(document).on("click", ".pay-modal .item li", function(){
    payClose();
});

//결제 수단 모달 - 열기 함수
function payOpen(){
    $(".pay-modal").fadeIn(170);
}

//결제 수단 모달 - 닫기 함수
function payClose(){
    $(".pay-modal").fadeOut(170);
}

/* csrf token 생성 및 주입 (ajax) */
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});