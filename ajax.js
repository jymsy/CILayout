/**
 * 学习系统-V4.2.2 ajax回掉
 *@author: LuanKai E-mail:luankai@izaodao.org
 *@author: Ycj E-mail:yuchangjiang@izaodao.org
 */
var clickOn = true;
var handle_baodao;

var slink_class_id = 0;
var slink_schedule_id = 0;
var slink_lesson_id = 0;
$(function(){
	//上课任务 下载
	$('.classtask_all_content').on('click','.downLoadClass',function(){
		if(!clickOn)return false;
		clickOn = false;

		$('.class_alert_control_none').hide();

		var ulObj = $(this).parent().parent('ul');
		var class_id = ulObj.attr('data-classid');
		var schedule_id = ulObj.attr('data-scheduleid');
		var lesson_id = ulObj.attr('data-lessonid');
		if(!class_id || !schedule_id || !lesson_id)return false;
		$.ajax({
			url : '/main.php/Learningsystem/ajax/classtask_download',
			type : 'post',
			dataType : 'json',
			timeout: 10000,//超时时间
			data : {
				'class_id' : class_id,
				'schedule_id' : schedule_id,
				'lesson_id' : lesson_id,
				'type' : 0
			},
			success : function(obj){
				if(obj.code==1){
					if(obj.data.url){
						location.href = obj.data.url;
					}else{
						$('#authorware_v422').show();
						$('.class_layer_alert_control').show();
						$('#background_mask_show').show();
					}
				}else if(data.code==401){
						login_alert();
				}else{
					$('#authorware_v422').show();
					$('.class_layer_alert_control').show();
					$('#background_mask_show').show();

				}
				clickOn = true;
			}
		});
	});

	//上课任务 进入教室
	$('.classtask_all_content').on('click','.roomClass',function(){
		if(!clickOn)return false;
		clickOn = false;

		$('.class_alert_control_none').hide();
		$('#yyNumber_v422').html('');

		var ulObj = $(this).parent().parent('ul');
		var class_id = ulObj.attr('data-classid');
		var schedule_id = ulObj.attr('data-scheduleid');
		showClassRoom(class_id,schedule_id);
	});

	//报道按钮 灰色
	$('.classtask_all_content').on('click','.unReportClass',function(){
		/*$('.class_alert_control_none').hide();
		$('#over_v422').show();
		$('.class_layer_alert_control').show();
		$('#background_mask_show').show();*/
		alert_general('直播报到已结束啦！');

	});

	$('.classtask_all_content').on('click','.reportClass_win',function(){
		$('.class_alert_control_none').hide();
		$('#haveReported_v422').show();
		$('.class_layer_alert_control').show();
		$('#background_mask_show').show();

	});

	$('.classtask_all_content').on('click','.reportClass',function(){
		if(!clickOn)return false;
		clickOn = false;

		$('.class_alert_control_none').hide();

		var ulObj = $(this).parent().parent('ul');
		var class_id = ulObj.attr('data-classid');
		var schedule_id = ulObj.attr('data-scheduleid');
		var lesson_id = ulObj.attr('data-lessonid');
		var course_id = ulObj.attr('data-courseid');
		var start_date = ulObj.attr('data-startdate');
		var end_date = ulObj.attr('data-enddate');

		$('#report_class_id').val(class_id);
		$('#report_schedule_id').val(schedule_id);
		$('#report_lesson_id').val(lesson_id);

		var code = 'v422';

		clearInterval(handle_baodao);
		var t = (new Date()).valueOf()+'';
		t = t.substr(0,10);
		if(end_date - 60*30 > t){
			var intDiff = parseInt(end_date-t-60*30);//倒计时总秒数量
			day = Math.floor(intDiff / (60 * 60 * 24));
			hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
			minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
			second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);

			if (minute <= 9) minute = '0' + minute;
			if (second <= 9) second = '0' + second;

			$('#day_show_'+code).html(day + "天");
			$('#hour_show_'+code).html('<s id="h"></s>' + hour + '时');
			$('#minute_show_'+code).html('<s></s>' + minute + '分');
			$('#second_show_'+code).html('<s></s>' + second + '秒');
			handle_baodao = timer(intDiff,code);

			$('#reportClass_v422').show();
			$('.class_layer_alert_control').show();
		} else {
            $('.class_layer_alert_control').hide();
			$('.class_report_alert_control').show();
		}
		clickOn = true;
		$('#background_mask_show').show();


	});
});
function timer(intDiff,code){
	if(intDiff > 0){
		day = Math.floor(intDiff / (60 * 60 * 24));
		hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
		minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
		second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
	}
	if (minute <= 9) minute = '0' + minute;
	if (second <= 9) second = '0' + second;
	$('#day_show_'+code).html(day+"天");
	$('#hour_show_'+code).html('<s id="h"></s>'+hour+'时');
	$('#minute_show_'+code).html('<s></s>'+minute+'分');
	$('#second_show_'+code).html('<s></s>'+second+'秒');
	handle = window.setInterval(function(){
		var day=0,
			hour=0,
			minute=0,
			second=0;//时间默认值
		if(intDiff > 0){
			day = Math.floor(intDiff / (60 * 60 * 24));
			hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
			minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
			second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
		}
		if (minute <= 9) minute = '0' + minute;
		if (second <= 9) second = '0' + second;
		$('#day_show_'+code).html(day+"天");
		$('#hour_show_'+code).html('<s id="h"></s>'+hour+'时');
		$('#minute_show_'+code).html('<s></s>'+minute+'分');
		$('#second_show_'+code).html('<s></s>'+second+'秒');
		intDiff--;
		/*报名计时处理*/
		if(code == 'v422' && intDiff <= 0){
            $('.class_alert_control_none').hide();
            $('.class_layer_alert_control').hide();
			$('.class_report_alert_control').show();
			$('#background_mask_show').show();
            clearInterval(handle_baodao);
		}
		if(code == 'Timev422' && intDiff <= 0){
			clearInterval(handle_baodao);
			$('.class_alert_control_none').hide();
			if($('.classtask_all_content .slink_'+slink_class_id+'_'+slink_schedule_id+'_'+slink_lesson_id).length>0){
				var slink_obj = $('.classtask_all_content .slink_'+slink_class_id+'_'+slink_schedule_id+'_'+slink_lesson_id);
				$("#timeClass_jump_v422 a").attr('href',slink_obj.attr('data-url'));
				$("#timeClass_jump_v422").show();
				$('.class_layer_alert_control').show();
				$('#background_mask_show').show();

			}
		}
	}, 1000);
	return handle;
}

/**
 * 报道
 */
function sendReportFrom(){
	if(!clickOn)return false;
	clickOn = false;
	var class_id = $('#report_class_id').val();
	var schedule_id = $('#report_schedule_id').val();
	var lesson_id = $('#report_lesson_id').val();
	var sign1,sign2,sign3 = 0;
	var info_msg = '';
	if(!class_id || !schedule_id || !lesson_id)return false;
	var sign1_check = $(".class_report_alert_control .formMenu_v422_list .sign1_check");
	if(sign1_check.find('.check_v422').length>0){
		sign1 = sign1_check.find('.check_v422').attr('data-val');
	}
	var sign2_check = $(".class_report_alert_control .formMenu_v422_list .sign2_check");
	if(sign2_check.find('.check_v422').length>0){
		sign2 = sign2_check.find('.check_v422').attr('data-val');
	}
	var sign3_check = $(".class_report_alert_control .formMenu_v422_list .sign3_check");
	if(sign3_check.find('.check_v422').length>0){
		sign3 = sign3_check.find('.check_v422').attr('data-val');
	}
	if(sign1==0 || typeof(sign1)=='undefined'){
		$(".class_report_alert_control .sign1_check_type").show();
		clickOn = true;
		return false;
	}
	if(sign2==0 || typeof(sign2)=='undefined'){
		$(".class_report_alert_control .sign2_check_type").show();
		clickOn = true;
		return false;
	}
	if(sign3==0 || typeof(sign3)=='undefined'){
		$(".class_report_alert_control .sign3_check_type").show();
		clickOn = true;
		return false;
	}
	if($('#report_info_msg').val()!='说说你的感受吧，不写也木有关系啦...'){
		info_msg = $('#report_info_msg').val().replace(/[~'!<>@#$%^&*()-+_=:]/g, "");
	}
	$.ajax({
		url : '/main.php/Learningsystem/ajax/class_report_data',
		type : 'post',
		dataType : 'json',
		data : {
			'class_id' : class_id,
			'schedule_id' : schedule_id,
			'lesson_id' : lesson_id,
			'sign1' : sign1,
			'sign2' : sign2,
			'sign3' : sign3,
			'info_msg' : info_msg
		},
		success : function(obj){
			if(obj.code==1){
				$('.class_report_alert_control').hide();
				$('.class_layer_alert_control').show();
				$('#reported_Live_v422 .reported_score').html('+'+obj.score);

				$('#background_mask_show').show();
                if($('#report_'+class_id+'_'+schedule_id+'_'+lesson_id).length>0){
                    $('#report_'+class_id+'_'+schedule_id+'_'+lesson_id).attr('class','button_v422_01 mt08 btnBgHui_v422 reportClass_win').html('已报到');
                }
				var card_id = $('#cardValId').val();
				var pssflag = $('#pssFlagVal').val();
				var url_param = '';
				if(card_id>0 && pssflag==1){
					url_param = '/pssflag/1/cardID/'+card_id;
				}

				var link_url = '/main.php/Learningsystem/index/index/column/classtask/label/2/status/2/classID/'+class_id+url_param;
				var link_name = '去补课';

				if(obj.is_report==1 && obj.is_practice==1 && obj.is_exam==1){
					var link_url = '/plugin.php?id=zd_ask:index';
					var link_name = '帮助同学';
				}
				else if(obj.is_report==0){

				}
				else if(obj.is_report==1 && obj.is_practice==0){
					var link_url = '/main.php/Learningsystem/index/index/column/problemtask/label/1/status/2/classID/'+class_id+url_param;
					var link_name = '去做题';
				}
				else if(obj.is_report==1 && obj.is_practice==1 && obj.is_exam==0){
					var link_url = '/main.php/Learningsystem/index/index/column/problemtask/label/2/status/2/classID/'+class_id+url_param;
					var link_name = '去做题';
				}

				$('#reported_Live_v422 .reported_make').attr('href',link_url);
				$('#reported_Live_v422 .reported_make').html(link_name);
				$('#reported_Live_v422').show();
			}else if(data.code==401){
				login_alert();
				}else{
				alert_general(obj.msg);
			}
			clickOn = true;
		}
	});


}

	/**
	 * 显示教室
	 */
 function showClassRoom(class_id,schedule_id){
		if(!class_id || !schedule_id)return false;
		$.ajax({
			url : '/main.php/Learningsystem/ajax/class_room_show',
			type : 'post',
			dataType : 'json',
			timeout: 10000,//超时时间
			data : {
				'class_id' : class_id,
				'schedule_id' : schedule_id
			},
			success : function(obj){
				if(obj.code==1){
					$('#yyNumber_v422').html(obj.html).show();
					$('.class_layer_alert_control').show();
					$('#background_mask_show').show();
				}else if(data.code==401){
					login_alert();
				}
				clickOn = true;
			}
		});
 }
 /*
 *直播课表
 */

 function ajax_classtask_schedule(class_id,daytime){
	 $('#dateScheduleList .listTimeDataNone').html();
	$('.classtask_all_content .classtask_all_content_tow').hide();
	if(!class_id)class_id = $('#classValId').val();
	if(!daytime)daytime = $('#daytime_str').val();
	$.ajax({
        url : '/main.php/Learningsystem/ajax/classTimeTypeData',
        type : 'post',
        dataType : 'json',
		async: false,
        data : {
			'class_id' : class_id,
            'daytime' : daytime,
			'card_id' : $('#cardValId').val(),
			'pssflag' : $('#pssFlagVal').val()
        },
		success : function(data){
			if(data.code==1){
				$('.classtask_all_content #dateOfInfo').html(data.html);
			}else if(data.code==401){
				login_alert();
			}
			$('.classtask_all_content .classtask_all_content_one').show();
			openTimeLi = false;
			ajax_schedule_list(class_id,daytime);
		}
    });
 }
 function ajax_schedule_list(class_id,daytime){
	 $('#dateScheduleList').show();

	if(!class_id)class_id = $('#classValId').val();
	if(!daytime)daytime = $('#daytime_str').val();
	//计算时间差
	var timenow = new Date().getTime();
    var timediff = timenow-timestamp;
	$('#dateScheduleList .listTimeDataNone').hide();$('#dateScheduleList .load_v422_60').show();

	if(!($('#dateScheduleList .data'+daytime).length>0) || timediff>mistiming){
		$.ajax({
			url : '/main.php/Learningsystem/ajax/classTakeListData',
			type : 'post',
			dataType : 'json',
			//async: false,
			data : {
				'class_id' : class_id,
				'daytime' : daytime,
				'card_id' : $('#cardValId').val(),
				'pssflag' : $('#pssFlagVal').val()
			},
			success : function(data){
				if(data.code==1){
					if(data.flag==1){
						$('.mission_v422').show();
						$('#'+daytime).hide();
					}
					if($('#dateScheduleList .data'+daytime).length>0){
						$('#dateScheduleList .data'+daytime).remove();
					}

					$('#dateScheduleList').append(data.html);
					$('#daytime_str').val(daytime);
					$('#dateOfInfo #rili_v422').removeClass('rili_ov');
					$('#dateOfInfo #rili_v422 img').attr('src',$('#timeRiLiOff img').attr('src'));

					$('#dateOfInfo .onrili422').hide();
					$('#dateScheduleList .data'+daytime).show();
					$('#dateScheduleList .load_v422_60').hide();
					openTimeLi = false;
				}else if(data.code==401){
					login_alert();
				}
			}
		});
	}else{
		$('#daytime_str').val(daytime);
		$('#dateOfInfo .onrili422').hide();
		$('#dateScheduleList .data'+daytime).show();
		$('#dateScheduleList .load_v422_60').hide();
	}
 }
 /*
 *录播回顾
 */
 function ajax_classtask_review(class_id,course_id,isType,page){
	$('.classtask_all_content_tow  .load_v422_60').show();
	 if(!class_id)class_id = $('#classValId').val();
	 if(!course_id)course_id = classtask_courseId;

	 var flag_status = $('#flag_status').val();
	 if(flag_status==1){
		 classtask_type = 0;
	 }else if(flag_status==2){
		 classtask_type = 1;
	 }else if(flag_status==3){
		 classtask_type = 2;
	 }

	 if(!isType)isType = classtask_type;
	 if(!page)page = 1;
	 $.ajax({
		 url : '/main.php/Learningsystem/ajax/taskInClass_list',
		 type : 'post',
		 dataType : 'json',
		 data : {
			 'class_id' : class_id,
			 'course_id' : course_id,
			 'isType' : isType,
			 'card_id' : $('#cardValId').val(),
			 'pssflag' : $('#pssFlagVal').val(),
			 'page' : page
		 },
		 success : function(data){
			if(data.code==1){
				if(!data.dataType){
					$('.classtask_all_content_tow .tag_v422').hide();
					$('.classtask_all_content_tow .subNav_v422').removeClass('boBn');
				}else{
					$('.classtask_all_content_tow .tag_v422').show();
					$('.classtask_all_content_tow .subNav_v422').addClass('boBn');
				}
				$('.classtask_all_content_tow  .load_v422_60').hide();
				$('.classtask_all_content_tow .classCourseDataStyle').html(data.html).show();

				$('#flag_status').val(0);

				clickOn = true;
			}else if(data.code==401){
				login_alert();
				}
		 }
	 });

 }
function look_back_class(class_id,schedule_id,lesson_id,course_id){
	if(!clickOn)return false;
	clickOn = false;
	var jxflag = 0;
	$('.class_alert_control_none').hide();
	if(!class_id || !schedule_id || !lesson_id || !course_id)return false;
	var card_id = $('#cardValId').val();
	var pssflag = $('#pssFlagVal').val();
	$.ajax({
		url : '/main.php/Learningsystem/ajax/classtask_download',
		type : 'post',
		dataType : 'json',
		async : false,
		data : {
			'class_id' : class_id,
			'schedule_id' : schedule_id,
			'lesson_id' : lesson_id,
			'course_id' : course_id,
			'card_id' : card_id,
			'pssflag' : pssflag,
			'type' : 1
		},
		success : function(obj){

			if(obj.code==1){
				if(obj.data.url){
					if($('.classtask_all_content .look_'+class_id+'_'+schedule_id+'_'+lesson_id).length>0){
						$('.classtask_all_content .look_'+class_id+'_'+schedule_id+'_'+lesson_id).attr('target','_blank');
						$('.classtask_all_content .look_'+class_id+'_'+schedule_id+'_'+lesson_id).attr('href',obj.data.url);
						jxflag = 1;
						clickOn = true;
						return true;
					}
				}
			}else if(data.code==401){
				login_alert();
				}
			if(jxflag==0){
				$('#authorware_v422').show();
				$('.class_layer_alert_control').show();
				$('#background_mask_show').show();
			}
			clickOn = true;
		}
	});
}

function start_measurement(class_id,schedule_id,lesson_id,start_date){

		if(!class_id || !schedule_id || !lesson_id || !start_date)return false;
		$('.class_alert_control_none').hide();

		var class_id = class_id;
		var schedule_id = schedule_id;
		var lesson_id = lesson_id;
		var start_date = start_date;
		slink_class_id = class_id;
		slink_schedule_id = schedule_id;
		slink_lesson_id = lesson_id;


		var code = 'Timev422';

		clearInterval(handle_baodao);
		var t = (new Date()).valueOf()+'';
		t = t.substr(0,10);

		if(start_date - 60*30 > t){
			var intDiff = parseInt(start_date-t-60*30);//倒计时总秒数量
			day = Math.floor(intDiff / (60 * 60 * 24));
			hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
			minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
			second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);

			if (minute <= 9) minute = '0' + minute;
			if (second <= 9) second = '0' + second;

			$('#day_show_'+code).html(day + "天");
			$('#hour_show_'+code).html('<s id="h"></s>' + hour + '时');
			$('#minute_show_'+code).html('<s></s>' + minute + '分');
			$('#second_show_'+code).html('<s></s>' + second + '秒');
			handle_baodao = timer(intDiff,code);

			$('#timeClass_v422').show();
			$('.class_layer_alert_control').show();
			$('#background_mask_show').show();
			return true;
		} else {
			if($('.classtask_all_content .slink_'+class_id+'_'+schedule_id+'_'+lesson_id).length>0){
				$('.classtask_all_content .slink_'+class_id+'_'+schedule_id+'_'+lesson_id).attr('target','_blank');
				$('.classtask_all_content .slink_'+class_id+'_'+schedule_id+'_'+lesson_id).attr('href',$('.classtask_all_content .slink_'+class_id+'_'+schedule_id+'_'+lesson_id).attr('data-url'));
				return true;
			}
			clearInterval(handle_baodao);
		}


	return false;
}

//单元测试 超过开始时间 30分钟弹出层
function bkThanClass(class_id,schedule_id,lesson_id,start_date){
	if(!class_id || !schedule_id || !lesson_id || !start_date)return false;

	if($('.classtask_all_content .slink_'+class_id+'_'+schedule_id+'_'+lesson_id).length>0){

		var slink_class = $('.classtask_all_content .slink_'+class_id+'_'+schedule_id+'_'+lesson_id);
		var t = (new Date()).valueOf()+'';
		t = t.substr(0,10);
		if(start_date + 60*30 < t){
			$('.class_alert_control_none').hide();
			$('#credit_than_class_v422 .one_v422_btn').attr('href',slink_class.attr('data-url'));
			$('#credit_than_class_v422 .one_v422_btn').attr('target','_blank');
			$('#credit_than_class_v422').show();
			$('.class_layer_alert_control').show();
			$('#background_mask_show').show();
		}else{
			slink_class.attr('target','_blank');
			slink_class.attr('href',slink_class.attr('data-url'));
			return true;
		}
	}
	return false;
}

function login_alert(){
		 $(".class_alert_control_none").hide();
		 $(".class_layer_alert_control").show();
		 $("#background_mask_show").show();
		 $("#credit_login_v422").show();
		 $(".class_layer_alert_control .close_v422").hide();
		 return false;
}
