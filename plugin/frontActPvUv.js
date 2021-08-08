$(function(){
	var reqData={};
	reqData.userId=$("#user_id").val();
	reqData.actId=$("#act_id").val();
	try{
		if($("#act_id").val()!=""&&$("#user_id").val()!=""){
			//调用pvuv
			 $.ajax({
					url : "/ql/front/reportActivity/recordBrandActPvUvData",
					method:"POST",
					data: reqData,
					dataType:"json",
					success:function(res){
							console.log(res.msg);
					}
			 });
		}
	}catch (e) {

	}
});

