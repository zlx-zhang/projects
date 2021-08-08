var userId = "";
var actId = "";
var errorCount = 0;
$(function () {
  //关闭弹窗
  $(".close-btn").click(function () {
    console.log("close");
    $(".modal-box").hide();
    $(".modal-con").hide();
  });
  $(".cancel-btn").click(function () {
    console.log("close");
    $(".modal-box").hide();
    $(".modal-con").hide();
  });
  $(".submit-btn").click(function () {
    console.log("close");
    $(".modal-box").hide();
    $(".modal-con").hide();
  });

});
// toast提示
function toast(mess) {
  console.log('mess',mess)
  $('.mess').remove();
  var str = '<div class="mess font30"><span></span></div>'
  $("body").append(str);
  $(".mess").fadeIn().find("span").html(mess);
  setTimeout(function () {
    $(".mess").fadeOut();
  }, 2000)
}

//打开关注弹窗
function favouriteShop(obj, value, actValue) {
  userId = value;
  actId = actValue;
  var src = $(obj).prev().find('img').attr('src');
  console.log('serc', src)
  $(".focus-info").children('img').attr('src', src)
  $(".modal-con").hide();
  $(".modal-box").show();
  $(".focus-box").show();
}

//确定关注发奖弹窗
function favSendAward() {
  $(".modal-box").hide();
  $(".modal-con").hide();
  $.ajax({
    url: "https://jinggengnew-isv.isvjcloud.com/ql/front/brand/postFavouriteShopAchieveAward",
    method: "POST",
    data: { "userId": userId, "actId": actId },
    dataType: 'json',
    xhrFields: {
      withCredentials: true // 携带跨域cookie
    },
    success: function (res) {
      if (res.succ) {
        $("#fav" + userId).removeClass("focus1");
        $("#fav" + userId).addClass("focus2");
        $(".modal-box").show();
        $(".get-succ").show();
      } else if (res.errorCode == "12" && errorCount == 0) {
        alert(res.errorMsg + "请重试!");
        errorCount++;
        authorize(function () { favSendAward() });
      } else {
        errorCount = 0;
        if (res.errorCode == "02") {
          $(".modal-box").show();
          $(".get-fail").show();
        } else {
          toast(res.errorMsg);
        }
      }
    },
    error: function (res) {
      alert(JSON.stringify(res))
    }
  });
}


//打call弹窗
function callBtn(value, actValue) {
  userId = value;
  actId = actValue;
  $.ajax({
    url: "https://jinggengnew-isv.isvjcloud.com/ql/front/brand/postCallJoin",
    method: "POST",
    data: { "userId": userId, "actId": actId },
    dataType: 'json',
    xhrFields: {
      withCredentials: true // 携带跨域cookie
    },
    success: function (res) {
      if (res.succ) {
        $(".modal-box").show();
        $(".call-succ").show();
      } else if (res.errorCode == "12" && errorCount == 0) {
        alert(res.errorMsg + "请重试!");
        errorCount++;
        authorize(function () { callBtn(value, actValue) });
      } else {
        errorCount = 0;
        if (res.errorCode == "02") {
          $(".modal-box").show();
          $(".call-fail").show();
        } else {
          toast(res.errorMsg);
        }
      }
    },
    error: function (res) {
      alert(JSON.stringify(res))
    }
  });

}


