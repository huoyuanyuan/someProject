/**
 * Created by mac on 16/9/7.
 */
$(function () {
    addListeners();

});

//添加一些监听事件
//跳转登陆页面
function addListeners(){
    $(".btn-login").on("click", function () {
        location.href = "/admin/login";
    });
}