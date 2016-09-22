/**
 * Created by mac on 16/9/11.
 */

//对时间格式进行统一
function initTime(number) {
    return number > 10 ? number : ("0" + number);
}

module.exports = {
    db: "mysql://root:@localhost/BlogSystem",
    getNewDate: function () {
        //获得当前系统时间
        var newDate = new Date();
        var year = newDate.getFullYear();
        var month = initTime(newDate.getMonth() + 1);
        var day = initTime(newDate.getDate());
        var hours = initTime(newDate.getHours());
        var minutes = initTime(newDate.getMinutes());
        var seconds = initTime(newDate.getSeconds());
        return year + "-" + month + "-" + day + "  " + hours + ":" + minutes + ":" + seconds;
    },

    //正则获得字符串图片URL
    getPhotoURL: function (str) {
        var imgArr = [];
        //var imgSrc = /(\<img.*?\>)/g;//直接匹配img标签
        var imgSrc = /<img[^>]+src=['"]([^'"]+)['"]+/g;//匹配src地址,
        //var imgSrc = /img\s+src="([\w\d:\.\/]*)"/g;
        var baidu = /img\.baidu\.com/g;//去除ueditor表情
        while (true) {
            var imgUrl = imgSrc.exec(str);
            if (imgUrl) {
                var ignoreBaidu = baidu.exec(imgUrl[1]);
                if (!ignoreBaidu) {
                    imgArr.push(imgUrl[1]);
                } else {
                    break;
                }
            } else {
                break;
            }
        }
        // console.log(imgArr);
        return imgArr;
    }
};