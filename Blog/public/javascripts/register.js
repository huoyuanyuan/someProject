/**
 * Created by mac on 16/9/7.
 */

(function () {

    var confirmPasswordAlert = $(".confirm-password-alert");
    var alertDiv = $(".alert-div");

    $(".register-form").on("submit", function (e) {
        e.preventDefault();

        if (this.password.value != this.passwordconfirm.value) {
            confirmPasswordAlert.html("两次输入密码不同");
            return;
        }
        confirmPasswordAlert.empty();

        $.post("/admin/register",{
            name:this.name.value,
            password:this.password.value
        }).done(function (data) {
            console.log(data);
            switch (data.state){
                case 1:
                    location.href="/";
                    break;
                case 2:
                    alertDiv.html("无法添加用户");
                    break;
                case 3:
                    alertDiv.html("用户名已存在");
                    break;
                default:
                    alertDiv.html("未知错误");
                    break;
            }
        }).fail(function () {
            alertDiv.html("无法连接服务器")
        });
    });
})();