/**
 * Created by mac on 16/7/16.
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

    var hiddenSection,showed;

    function hiddenAndShow(){
        hiddenAndShowInit();
        var titleBtn = $("h3");
        titleBtn.on("click", function () {
            var id = $(this).attr("id");
            if(id == "actived"){
                $(this).next().toggle(200);
            }else {
                $("#actived").attr("id","");
                showed.removeClass("showed");
                $(this).next().addClass("showed");
                $(this).attr("id","actived");
                hiddenAndShowInit();
            }
        });
    }

    function hiddenAndShowInit(){
        hiddenSection = $(".hiddensection");
        showed = $(".showed");

        hiddenSection.hide();
        showed.fadeIn(500);
    }

    function init(){
        addSideBar();
        hiddenAndShow();
    }

    init();
})();
