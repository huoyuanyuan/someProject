/**
 * Created by mac on 16/7/14.
 */

(function () {

    function addSideBar(){
        var btn = $("#leftbtn");
        var sideBarContainer = $("#sidebarcontaine");
        btn.on("click", function () {
            sideBarContainer.fadeIn();
        });
        sideBarContainer.on("click", function () {
            sideBarContainer.fadeOut();
        });
    }

    function disabled(){
        var disableds = $(".disabled");
        disableds.on("click", function () {
            return false;
        });
        disableds.on("mouseover", function (e) {
            $(this).append("<div class='adddiv'>即将开通,敬请期待</div>");
            var div = $(".adddiv");
            div.css({
                left: e.clientX-70,
                right: e.clientY,
            });
        });
        disableds.on("mouseout", function () {
            $(this).find(".adddiv").hide();
        });
    }

    function btnMore(){
        var btnMore = $("#btn-more");

        var hidenElement = $(".province li:gt(9)");
        hidenElement.hide();
        btnMore.on("click", function () {
            if(hidenElement.is(":visible")){
                hidenElement.hide();
                btnMore.text("更多")
            }else{
                hidenElement.show(); //显示全部品牌
                btnMore.text("收起");
            }
        });
    }

    function init(){
        addSideBar();
        disabled();
        btnMore();
    }

    init();
})();
