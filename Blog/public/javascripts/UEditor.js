/**
 * Created by mac on 16/9/11.
 */
$(function () {
    addArticle();
});
function addArticle(){
    $(".form-submit-addArticle").on("submit", function (e) {
        e.preventDefault();
        var title = $('#title').val();
        var content = UE.getEditor('editor').getContent();
        var public = $("#public-checkBtn")[0].checked == true ? 1 : 0;
        var classify = $("#classify-select");
        var CID = classify[0].selectedOptions[0].value;
        $.post('/admin/report', {
            title: title,
            content: content,
            public:public,
            CID:CID
        }).done(function (data) {
            location.href = '/admin/article';
        }).fail(function () {
            console.log('无法连接')
        });
    });
}