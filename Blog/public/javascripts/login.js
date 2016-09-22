/**
 * Created by mac on 16/9/7.
 */

(function () {

    var alertDiv = $(".alert-div");

    $(".login-form").on("submit", function (e) {
        e.preventDefault();

        $.post("/admin/login",
            {name: this.name.value, password: this.password.value}
            ).done(function (data) {
            console.log(data);
            switch (data.state) {
                case 1:
                    location.href = "/";
                    break;
                case 3:
                    alertDiv.html("登陆名不存在");
                    break;
                case 2:
                    alertDiv.html("密码错误");
                    break;
                default:
                    alertDiv.html("未知错误");
                    break;
            }
        }).fail(function () {
            alertDiv.html("无法连接服务器");
        });
    });
})();