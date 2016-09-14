/**
 * Created by mac on 16/7/15.
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

    function hidden(){
        var hidden = $("#hidden");
        var btnNext = $("#btnnext");
        var iframe = $("iframe");


        btnNext.on("click", function () {
            hidden.hide();
            $(this).hide();
            iframe.show();
        });

    }

    function init(){
        addSideBar();
        hidden();
    }

    init();
})();
