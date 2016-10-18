/**
 * 学习系统-V4.2.2 公用的
 *@author: LuanKai E-mail:luankai@izaodao.org
 *@author: Ycj E-mail:yuchangjiang@izaodao.org
 */
var timestamp = new Date().getTime(); //定义当前时间戳 
var mistiming = 60000; //定义 执行ajax 时间差
var openTimeLi = false;
var classtask_courseId = 0;//上课任务 录播回顾 阶段Id
var classtask_type = 0;//上课任务 录播回顾 状态
var cardValId=$("#cardValId").val();
var pssFlagVal=$("#pssFlagVal").val();

$(function(){
	/*indexOf 兼容 IE8*/
	if (!Array.prototype.indexOf)
    {
        Array.prototype.indexOf = function(elt /*, from*/)
        {
            var len = this.length >>> 0;
            var from = Number(arguments[1]) || 0;
            from = (from < 0)
                ? Math.ceil(from)
                : Math.floor(from);
            if (from < 0)
                from += len;
            for (; from < len; from++)
            {
                if (from in this &&
                    this[from] === elt)
                    return from;
            }
            return -1;
        };
    }
	//初始化操作
	selectedTabInit();
	//任务选项卡
	$(".warrp_v422 .menu_v422 ul li").on("click", function () {
        var tab_span_class = $(this).find('span').attr('class');
		var tabclass = $('.warrp_v422 .menu_v422 .selectedTab').attr('class');
		if(tab_span_class!=tabclass){
			$(this).addClass('cuD').siblings().removeClass('cuD');
			if(tabclass.indexOf('_active')>0){
				var newClass = tabclass.replace('_active','');
				$('.warrp_v422 .menu_v422 .selectedTab').attr('class',newClass).removeClass('selectedTab');
			}
			if(!(tab_span_class.indexOf('_active')>=0) && !(tab_span_class.indexOf('selectedTab')>=0)){
				var new_span_class = tab_span_class+'_active';
				$(this).find('span').attr('class',new_span_class).addClass('selectedTab');
			}
			selectedTabInit();
		}

    });
	//上课任务 （直播课表，录播回顾）切换
	$(".classtask_all_content .title_v422 ul li").on("click", function () {
		if($(this).attr('id')!=$(".classtask_all_content .title_v422 .title_current").attr('id')){
			$(this).attr('class','title_current').siblings().removeClass('title_current');
			classtaskTabFunc();
		}
	});
	//点击 7天内某一天
	$("#dateOfInfo").on("click",'.clickDataInfo', function () {
		var thisclass = $(this).attr('class');
		if(thisclass.indexOf('haveclass_current')>=0){
			return false;
		}
		var dataDayTime = $(this).attr('data-daytime');
		
		$('.mission_v422').show();
		$('#'+dataDayTime).hide();

		$(this).addClass('haveclass_current').siblings().removeClass('haveclass_current');
		ajax_schedule_list(0,dataDayTime);
	});
	//点击日历层
	$('#dateOfInfo').on('click','#rili_v422', function (e) {
		e.stopPropagation();//阻止事件向上冒泡
		//应该先显示加载中
		if($('#dateOfInfo .rili_ov').length>0){
			$('#dateOfInfo #rili_v422').removeClass('rili_ov');
			$('#dateOfInfo #rili_v422 img').attr('src',$('#timeRiLiOff img').attr('src'));
			$('#dateOfInfo .onrili422').hide();
		}else{
			//执行方法 调取日历信息
			$('#dateOfInfo #rili_v422').addClass('rili_ov');
			$('#dateOfInfo #rili_v422 img').attr('src',$('#timeRiLiOn img').attr('src'));
			$('#dateOfInfo .onrili422').show();
			if(!openTimeLi){
				init_day_numbers();
			}
		}

	});
	$('#dateOfInfo').on('click','.onrili422', function (e) {
		e.stopPropagation();//阻止事件向上冒泡
	});


	//点击日历某一天
	$('#dateOfInfo').on('click','.checkDataTime li', function () {
		var dateTimeVal = $(this).attr('data-date');
		if(dateTimeVal=='' || typeof(dateTimeVal) == 'undefined')return false;
		ga('send','event','学习系统4.2.2首页','学习阶段进度条',dateTimeVal);
		ajax_classtask_schedule(0,dateTimeVal);
	});
	//上课任务 录播回顾状态
	$('.classtask_all_content_tow .subNav_v422 ul li').on('click', function () {
		$(this).attr('class','current_v422').siblings().removeClass('current_v422');
		if(classtask_type!=$(this).attr('data-type')){

			$('.classtask_all_content_tow .classCourseDataStyle').hide();
			$('.classtask_all_content_tow .tag_v422').hide();

			classtask_type = $(this).attr('data-type');
			if(classtask_type==1){
				$('.report_dot').hide();
			}
			$('.classtask_all_content_tow .tag_v422 ul li').removeClass('current_v422_02');
			classtask_courseId = 0;
			ajax_classtask_review();
		}
	});
	//上课任务 录播回顾阶段Id
	$('.classtask_all_content_tow .tag_v422 ul li').on('click', function () {
		$(this).attr('class','current_v422_02').siblings().removeClass('current_v422_02');

		$('.classtask_all_content_tow .tag_v422').hide();
		$('.classtask_all_content_tow .classCourseDataStyle').hide();

		if(classtask_courseId!=$(this).attr('data-courseid')){
			classtask_courseId = $(this).attr('data-courseid');
		}else{
			classtask_courseId = 0;
			$('.classtask_all_content_tow .tag_v422 ul li').removeClass('current_v422_02');
		}
		ajax_classtask_review();
	});
	//关闭所有弹出层
	$(".close_all_alert").on("click", function () {
		$('.class_alert_control_none').hide();
		clickOn = true;
	});

	//点击红色字
	$('.classAllOperation').on('click','.setPromptClass', function () {
		$('.class_alert_control_none').hide();
		var class_title = $(this).attr('data-class_title');
		var task_score = $(this).attr('data-task_score');
		var data_line = $(this).attr('data-data_line');
		var types = $(this).attr('data-types');
		var prompt_val = '';
		var btnBg_url = '';
		var btnLine_url = '';
		if(class_title && task_score && data_line){
			prompt_val = data_line+"在"+class_title+"中已完成该任务，加了"+task_score+"学分哦";
			btnBg_url = $(this).parents('ul').find('.btnBg_v422').attr('href');
			btnLine_url = $(this).parents('ul').find('.btnLine_v422').attr('href');
			$('#addscores_prompt_v422 .prompt_val').html(prompt_val);

			if(btnBg_url!=''){
				$('#addscores_prompt_v422 .btnBg_v422').attr('href',btnBg_url);
			}
			if(types==1){
				$('#addscores_prompt_v422 .btnBg_v422').html('重 考');
			}else{
				$('#addscores_prompt_v422 .btnBg_v422').html('重 做');
			}
			if(btnLine_url!=''){
				$('#addscores_prompt_v422 .btnLine_v422').attr('href',btnLine_url);
			}
			$('#addscores_prompt_v422').show();
			$('.class_layer_alert_control').show();
			$('#background_mask_show').show();
		}

	});

	$(document).click(function(){
		if($("#dateOfInfo .rili_ov").hasClass("rili_ov")){
			$('#dateOfInfo #rili_v422').removeClass('rili_ov');
			$('#dateOfInfo #rili_v422 img').attr('src',$('#timeRiLiOff img').attr('src'));
			$('#dateOfInfo .onrili422').hide();
		}
	});

	$('.classAllOperation').on('click','.toretake_retake',function(){
		$('.class_alert_control_none').hide();
		$('#toretake_retake_v422 .btnBg_v422').attr('href',$(this).attr('data-url'));
		$('#toretake_retake_v422').show();
		$('#background_mask_show').show();
		$('.class_layer_alert_control').show();
	});

	alret_v422_writeReport();
});
//初始化函数
function selectedTabInit(){
	var page_classid=$("#classValId").val();
	var paramid,paramurl,paramdata;
	$('.classAllOperation').hide();
	var selectedTab = $('.warrp_v422 .menu_v422 .selectedTab').attr('id');
	if(selectedTab=='classtask_bg_id'){//上课任务
		$('.classtask_all_content').show();
		$('.learning_all_content').hide();
		var label = parseInt($('#flag_label').val());
		var flag_status_to = $('#flag_status').val();
		
		if(flag_status_to!=1 && flag_status_to!=2 && flag_status_to!=3) label = 1;
		
		var statusid=parseInt(flag_status_to-1);
		if(statusid<0){statusid=0};
		if(statusid == '1'){
			$(".report_dot").hide();
		}

		if(label!=1 && label!=2) label = 1;

		$('.classtask_all_content .title_v422 ul li:eq('+(label-1)+')').attr('class','title_current').siblings().removeClass('title_current');
		ga('send','event','学习系统4.2.2首页','上课任务');
		classtaskTabFunc();
	}
	if(selectedTab=='problemtask_bg_id'){//做题任务
		$('.problemtask_all_content').show();
		var label = parseInt($('#flag_label').val());

		if(label!=1 && label!=2) label = 1;

		var flag_status_to = $('#flag_status').val();
		
		if(flag_status_to!=1 && flag_status_to!=2 && flag_status_to!=3) label = 1;
		
		var statusid=parseInt(flag_status_to-1);
		if(statusid<0){statusid=0};
		
		var type=parseInt(label-1);
		if(type<0){type=0};


		
		$('#do_class_title ul li:eq('+type+')').attr('class','title_current title_01').siblings().removeClass('title_current title_01');
		
		var menu='.menu'+type;
		$(".menu0").hide();
		$(".menu1").hide();
		$('.menu0 ul li').removeClass('current_v422 statusid_02');
		$('.menu1 ul li').removeClass('current_v422 statusid_02');
		$(menu+' ul li:eq('+statusid+')').attr('class','current_v422 statusid_02').siblings().removeClass('current_v422 statusid_02');	
		$(".menu"+type).show();
		if(type=='0'){
			$('#course_422').show();
		}
	
		$(menu+' ul li:eq('+statusid+')').attr('class','current_v422 statusid_02').siblings().removeClass('current_v422 statusid_02');
		
		$("#course_422 ul li").removeClass('current_v422_02 courseid_03');
		
		if(statusid == '1'){
		var typeid=parseInt(label-1);
			$(".do_title"+typeid).hide();
		}
		
		ga('send','event','学习系统4.2.2首页','做题任务');
		paramid="#do_class_list";
		paramurl="/main.php/Learningsystem/Task/Do_LessonHtml";
		paraminit="class_id="+page_classid+"&cardValId="+cardValId+"&pssFlagVal="+pssFlagVal+"&timestamp="+timestamp;
		paramdata=paraminit+"&paramid="+paramid+"&paramurl="+paramurl+"&type="+type+"&statusid="+statusid;
		Get_AjaxHtml(paramid,paramurl,paramdata);

	}
	if(selectedTab=='download_bg_id'){//资料下载
		$('.download_all_content').show();
		$('.learning_all_content').hide();
		$(".dataDownload_v422 ul li:eq('0')").attr('class','current_v422').siblings().removeClass('current_v422');
		$(".dataDownload_v422").attr('class','dataDownload_v422').siblings().removeClass('boBn');
		
		ga('send','event','学习系统4.2.2首页','资料下载');
		paramid="#down_list";
		paramurl="/main.php/Learningsystem/Ajax/downloadDataList";
		paraminit="class_id="+page_classid+"&downType=0&timestamp="+timestamp;
		paramdata=paraminit+"&paramid="+paramid+"&paramurl="+paramurl;
		Get_AjaxHtml(paramid,paramurl,paramdata);
	}
	if(selectedTab=='learning_bg_id'){//学习报告
		$('.learning_all_content').show();
		/*$('.learning_all_content2').show();*/
		var card_id=$('#cardValId').val();
		var pssflag=$('#pssFlagVal').val();
		ga('send','event','学习系统4.2.2首页','学习报告');

		paramid="#class_report";
		paramurl="/main.php/Learningsystem/Task/Do_Report";
		paramdata="class_id="+page_classid+"&pssflag="+pssflag+"&card_id="+card_id+"&timestamp="+timestamp;
		Get_AjaxHtml(paramid,paramurl,paramdata);
	}
	if(selectedTab=='classinfo_bg_id'){//班级信息
		$('.classinfo_all_content').show();
		$('.learning_all_content').hide();
		$('.pop_v422').hide();
		ga('send','event','学习系统4.2.2首页','班级信息');
		pssflag=$('#pssFlagVal').val();
		var card_id=$('#cardValId').val();
		paramid="#class_info";
		paramurl="/main.php/Learningsystem/Task/Do_Classinfo";
		paramdata="class_id="+page_classid+"&pssflag="+pssflag+"&card_id="+card_id+"&timestamp="+timestamp;
		Get_AjaxHtml(paramid,paramurl,paramdata);
	}
	
}
//上课任务 （直播课表，录播回顾）函数
function classtaskTabFunc(){
	var classtask_id = $(".classtask_all_content .title_v422 .title_current").attr('id');
	if(classtask_id=='classtask_model_L'){
		ajax_classtask_schedule();
	}
	if(classtask_id=='classtask_model_T'){
		$('.classtask_all_content_one').hide();
		$('.classtask_all_content_tow').show();
		$('.classtask_all_content_tow .tag_v422').hide();
		$('.classtask_all_content_tow .classCourseDataStyle').hide();

		ajax_classtask_review();

	}
}
function close_window(){
	$(".class_alert_control_none").hide();
	return true;
}
function alert_general(msg,imgval){
	$('.class_alert_control_none').hide();
	if(msg!=''){
		$('.alert_general_popup .reported_v422_contant p').html(msg);
		if(imgval!=''){
			$('.alert_general_popup .reported_v422_contant span img').attr('src',imgval);
		}
	}
	$('#background_mask_show').show();
	$('.class_layer_alert_control').show();
	$('.alert_general_popup').show();

}
function alret_v422_writeReport(){
	var page_classid=$("#classValId").val();
	var paramurl = "/main.php/Learningsystem/Task/Do_user_first_enter";
	var paramdata = "class_id="+page_classid;
	$(".class_alert_control_none").hide();
	$.ajax({
        url: paramurl,
        data:paramdata,
        type: "post",
        dataType: "json",
        success: function (obj) {
			if(obj.code==1){
				$(".alret_v422_writeReportTo").show();
				$("#background_mask_show").show();
			}
		}
    });
}
