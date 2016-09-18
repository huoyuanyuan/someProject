/**
 * Created by mac on 16/8/28.
 */

angular.module("services",[])
  .factory("HTTPService", function ($http,$q) {

    return{

      getNews: function (url) {
        //加载异步请求
        var defered = $q.defer();

        $http({
          method:"GET",
          url:url,
          dataType:"JSON",
          headers:{
            'apikey':'34e4174fbb12de42e3344d61fe693fe4'
          }
        }).success(function (data,code) {
          if(parseInt(code) == 200){
            defered.resolve(data)
          }
        });

        //请求完成 得到promise
        //里面存储着 请求完成后的数据
        return defered.promise;
      }

    }

  });
