/**
 * Created by mac on 16/9/8.
 */
$(function () {
    addListeners();
    addActive();
    jumpArticleContent();
    deleteArticle();
    changeArticle();
    saveChangeArticle();
});
//添加事件监听
function addListeners() {
    $(".column").on("click", function () {
        $("li").removeClass("active");
        $(this).addClass("active");
        switch ($(this).attr("name")) {
            case "backhome":
                location.href = "/";
                break;
            case "addArticle":
                location.href = "/admin/report";
                break;
            case "manageArticle":
                location.href = "/admin/article";
                break;
            case "managePhoto":
                location.href = "/admin/image";
                break;
            case "manageComment":
                location.href = "/admin/comment";
                break;
            case "lognout":
                console.log("登出");
                $.post("/admin/logout", {}).done(function (data) {
                    console.log(data);
                    switch (data.state) {
                        case 1:
                            location.href = "/";
                            break;
                        case 2:
                            console.log(data.state.message);
                            break;
                        default:
                            console.log("未知情况");
                            break;
                    }
                }).fail(function () {
                    console.log("登出失败");
                });
                break;
            default:
                console.log("未知情况");
                break;
        }
    });
}

//添加选中状态
function addActive() {
    var locationUrl = window.location.href;
    var locationUrlArr = locationUrl.split("/");
    switch (locationUrlArr[locationUrlArr.length - 1]) {
        case "report":
            $("li[name='addArticle']").addClass("active");
            break;
        case "article":
            $("li[name='manageArticle']").addClass("active");
            break;
        case "image":
            $("li[name='managePhoto']").addClass("active");
            break;
        case "comment":
            $("li[name='manageComment']").addClass("active");
            break;
        default:
            $("li[name='backhome']").addClass("active");
            break;
    }
    // console.log(locationUrlArr);
}

//文章管理页面 点击标题 跳转到内容
function jumpArticleContent() {
    $(".article-title").on("click", function (e) {
        e.preventDefault();
        $.ajax({
            url: "/admin/article",
            method: "post",
            data: {
                AID: $(this).attr("id"),
                CID: $(this).siblings(".article-CID").attr("id")
            },
            success: function (data) {
                if (data.state == 1) {
                    // console.log(data);
                    var contentData = data.data[0];
                    var categories = data.categories[0];
                    var title = contentData.Title;
                    var content = contentData.Content;
                    var id = contentData.AID;
                    $(".hidden-id").val(id);
                    $(".categories").html(categories.CName);
                    $(".title").html(title);
                    $(".article-content").html(content);
                } else {
                    console.log(data);
                }
            },
            error: function (err) {
                console.log(err);
            }
        });

        $(".article-list-container").hide();
        $(".article-manage-container").show();


    })
}

//文章管理页面 点击删除按钮 删除文章
function deleteArticle() {
    $(".btn-delete").on("click", function () {
        if (confirm('确认删除?')) {
            $.ajax({
                url: "/admin/article",
                method: "delete",
                data: {
                    AID: $(".hidden-id").val()
                },
                success: function (data) {
                    console.log(data);
                    if (data.state == 1) {
                        location.href = "/admin/article";
                    } else {
                        console.log(data);
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });
        }
    });
}

//文章管理页面 点击编辑按钮 打开编辑器
function changeArticle() {
    $(".btn-editor").on("click", function () {
        $.ajax({
            url: "/admin/article",
            method: "post",
            data: {
                AID: $(".hidden-id").val()
            },
            success: function (data) {
                if (data.state == 1) {
                    var contentData = data.data[0];
                    var title = contentData.Title;
                    var content = contentData.Content;
                    var publicCheck = contentData.Public;
                    var CID = contentData.CID;

                    var classify = $("option[value=" + CID + "]").attr({"selected": "selected"});

                    $("#title").val(title);
                    UE.getEditor('editor').setContent(content);
                    if (publicCheck == 1) {
                        $("#public-checkBtn")[0].checked = true;
                    } else {
                        $("#public-checkBtn")[0].checked = false;
                    }

                } else {
                    console.log(data);
                }
            },
            error: function (err) {
                console.log(err);
            }
        });

        $(".article").hide();
        $(".ueditor-container").show();
    });
}

//保存修改
function saveChangeArticle() {
    $(".form-submit-addArticle").on("submit", function (e) {
        e.preventDefault();
        var title = $('#title').val();
        var content = UE.getEditor('editor').getContent();
        var public = $("#public-checkBtn")[0].checked == true ? 1 : 0;
        var AID = $(".hidden-id").val();
        var classify = $("#classify-select");
        var CID = classify[0].selectedOptions[0].value;
        $.ajax({
            url: '/admin/article',
            method: "put",
            data: {
                AID: AID,
                title: title,
                content: content,
                public: public,
                CID: CID
            },
            success: function (data) {
                console.log(data);
                if (data.state == 1) {
                    location.href = "/admin/article";
                } else {
                    console.log(data);
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    });
}

