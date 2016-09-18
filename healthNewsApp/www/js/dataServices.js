/**
 * Created by mac on 16/8/28.
 */

angular.module("DataServices", [])
  .factory("Data", function (HTTPService) {

    var url = "http://apis.baidu.com/tngou/info/";

    return {
      getMenuData: function (param) {
        var listUrl = url + param;
        console.log(listUrl);
        var newsList = [];
        var promise = HTTPService.getNews(listUrl);
        promise.then(function(data){
          if (data["status"] == true) {
            if (listUrl.indexOf("show") != -1) {
              newsList.push(data);
            } else {
              for (var i = 0; i < data["tngou"].length; i++) {
                var news = data["tngou"][i];
                newsList.push(news);
              }
              if (listUrl.indexOf("classify") != -1){
                newsList.sort(function(a, b){
                  return a.id - b.id;
                })
              }
            }
          } else {
            alert("数据请求失败");
          }
        });
        return newsList;
      }
    }

  });
