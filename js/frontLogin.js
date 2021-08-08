/**
 *买家公共登录授权---【品牌商家自定义授权页面用】
 */
var locationUrl="";
var source = "01";

// $(function(){
    // authorize();
// });


function authorize(callBack) {
    locationUrl = window.location.href;
    if(typeof JSSDK.Client.isJDApp() != "undefined" && JSSDK.Client.isJDApp()){//判断客户端是否jdApp
        JSSDK.Isv.isAppLogin(function(res){
            // alert(JSON.stringify(res));
            setTimeout(function() {
                if(res.data == 0){ //未登录
                    // alert("未登录");
                    reqAppLogin(callBack);//调用登录页
                }else{
                    mixToken(callBack);  //获取pin写cookie
                }
            }, 0);
        });
    }else if(JSSDK.Client.isWeixin()){
            mixTokenWx();
        
    }else{
        alert("非app端及微信端");
        $.ajax({
            url: "https://jinggengnew-isv.isvjcloud.com/ql/front/brand/setFansMixNickApp",
            method:"POST",
            data: {"fansToken":"","eid":"", "userId":10299171, "source":"02"},
            dataType:'json',
            xhrFields: {
                withCredentials: true // 携带跨域cookie
            },
            success:function(res){
                if(res.succ){
                    // alert("成功成功");
                    callBack();
                }else{
                    alert(res.errorMsg);
                    callBack();
                }
            },
            error:function (res) {
                alert(JSON.stringify(res))
                alert("授权失败，请联系客服");
            }
        });
    }
}

//调用登录页
function reqAppLogin(callBack){
    JSSDK.Isv.requestLogin(function(res){
        setTimeout(function() {
            // alert(JSON.stringify(res));
            if(res.data=="1"){  //登录成功的回调，判断需要
                //跳转到当前活动页面
                mixToken(callBack);  //获取pin写cookie
            }
        }, 0);
    });
}

//获取pin写cookie
function mixToken(callBack){
    JSSDK.Isv.requestIsvToken({
        url: locationUrl
    }, function(res){
        setTimeout(function() {
           //ajax到后台tokenToPin 获取 pin码，写Cookie
            try {
                    $.ajax({
                        url: "https://jinggengnew-isv.isvjcloud.com/ql/front/brand/setFansMixNickApp",
                        method:"POST",
                        data: {"fansToken":res.data,"eid":"", "userId":10299171, "source":source},
                        dataType:'json',
                        xhrFields: {
                            withCredentials: true // 携带跨域cookie
                        },
                        success:function(res){
                            if(res.succ){
                                callBack();
                            }else{
                                alert(res.errorMsg);
                                callBack();   
                            }
                        },
                        error:function (res) {
                            alert(JSON.stringify(res))
                            alert("授权失败，请联系客服app");
                        }
                    });
            }catch(e){
                // 异常处理
                alert(JSON.stringify(e))
                alert("授权失败，请联系客服");
            }

        }, 1000);
    });
}

function mixTokenWx(){
    var jumpUrl = "https://wq.jd.com/pinbind/pintokenredirect?biz=jm-business-center&url=";
    var jasUrl = window.location.origin+"/ql/front/brand/setFansMixNickWX?bazString=";
    var baseCode = window.btoa(locationUrl+"mid_user_id"+10299171);
    var finalUrl = jumpUrl+jasUrl+baseCode;
    window.location.href=finalUrl;
}
