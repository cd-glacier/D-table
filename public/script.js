var sum_credits = 0;
$(function() {
	var array_day=['nul','Mon','Tue','Wed','Thu','Fri','Sat'];
	var array = new Array(6);
  	for(var j = 0;j<6;j++){
  		array[j] = new Array(6);
  		for(var i = 0;i<6;i++){
  			var day = array_day[i+1];
  			var period = j + 1;
  			var ele = $("#D-table-"+day+period);
			var semester = ele.data("semester");
			var grade = ele.data("grade");
			array[j][i] = ".D-table-" + String(day) + period + " .modal-dynamic";
			
			(function(tmp_j, tmp_i) {		
  			$.ajax({
				url: "/subjects/" + String(day) + "/" + period + "/" + grade + "/" + semester
				}).done(function(data) {
					$(array[tmp_j][tmp_i]).html(data);
	 			});
	 		})(j, i);
  		}
  	}
});
$(function(){
	setTimeout(function(){	
		var sum_credits = 0;
		var array_day=['nul','Mon','Tue','Wed','Thu','Fri','Sat'];
		var array = new Array(6);
  	for(var j = 0;j<6;j++){
  		array[j] = new Array(6);
  		for(var i = 0;i<6;i++){
  			var day = array_day[i+1];
  			var period = j + 1;
  			var hoge = ".D-table-"+day+period;
  			var tmp = $(hoge).find(".requiered-subject");
  			$(hoge).find(".td-content").html(tmp);
  			
  			/*単位数計算*/
			var choiced_credits = $(hoge).find(".requiered-subject").data("credit");
  			sum_credits += choiced_credits;
  			}
  		}
  
	
	/*単位表示*/
	$(".sum-credits").html("選択単位数:" + sum_credits);
  	},500);
});

/*subjectで選択した科目をD_tableで表示*/
$(document).on("click", ".subject", function(event){
	event.preventDefault();
  event.stopPropagation();
	var day_period = $(this).data("dp");
	var choiced_subject = $(this).data("subject");

	/*単位数計算*/
	$(".D-table-"+day_period).children(".td-content").html( "<a class='subject-destroy' data-credit='" +  choiced_credits + "'>"+choiced_subject + "[x]</a>");
	var choiced_credits = $(this).data("credit");
	sum_credits += choiced_credits;
	/*単位表示*/
	$(".sum-credits").html("選択単位数:" + sum_credits);
	
	$(this).parents('.modal').fadeOut();
	$(this).parents('td').addClass('before');
    var ele = $(this);
    setTimeout(function (){
        ele.parents('td').removeClass('open');
        $(".D-table-"+day_period).children(".td-content").fadeIn();
    }, 300); 
});

/*[x]押されたら選択されてる教科消して,(単位数も削除)*/
$(document).on("click",".subject-destroy",function(event){	
  event.stopPropagation();  
	var element = $(this).parent();

	/*単位数計算*/
	var choiced_credits = $(this).data("credit");
	sum_credits -= choiced_credits;
	/*単位表示*/
	$(".sum-credits").html("選択単位数:" + sum_credits);

	$(this).remove();
	
});


/*モーダル*/
$(function () {
    $(document).on('click', '.before:not(".requiered-subject")', function (event) {				
				event.stopPropagation();
				var ele = $('td.open');
				var day = $(this).data("day");
				var period = $(this).data("period");
				var semester = $(this).data("semester");
				var grade = $(this).data("grade");
				var ele2 = $(this);
				ele2.removeClass('before');
				/*animation*/
        $(this).children('.td-content').fadeOut();
        $(this).addClass('open');
        setTimeout(function() {
            ele2.children('.modal').fadeIn();
				}, 1000);
		setTimeout(function(){
				ele.children('.modal').fadeOut();
				ele.children('.td-content').fadeIn();
				ele.addClass('before');
				ele.removeClass('open');
		},700);
				/*ajax*/
	$.ajax({
		url: "/subjects/" + String(day) + "/" + period + "/" + grade + "/" + semester,
		success: function(data) {
			$(".D-table-" + String(day) + period + " .modal-dynamic").html(data);
	 	}
	});
		
    });
    $(document).on('click', '.close', function (event) {
        event.preventDefault();
        event.stopPropagation();
        $(this).parent().fadeOut();
        $(this).parents('td').addClass('before');
        var ele = $(this);
        setTimeout(function (){
        	ele.parent().parent().removeClass('open');
        	ele.parent().siblings().fadeIn();
        }, 300);       
        
    });

});

/*post送信後、科目一覧に追加、cellに表示*/
$(document).on('click', '.modal-content .mdl-button', function(event){
  event.preventDefault();
	var day = $(this).data("day");
	var period = $(this).data("period");
	var semester = $(this).data("semester");
	var grade = $(this).data("grade");
	$.ajax({
		type: "POST",
		url: "/" + day + "/" + period + "/" + grade + "/" + semester +  "/new",
		data: {
			"subname": $(this).parent().find("input[name=subname]").val(),
			"code": $(this).parent().find("input[name=code]").val(),
			"credit": $(this).parent().find("input[name=credit]").val()
		},
		success: function(){
			alert("保存しました。");

		}
	});
});

/*科目コード表示*/
$(document).on('click', '.mdl-navigation .mdl-button', function(event){
  	event.preventDefault();
  	$(".export-wrapper").toggle();
  	$(".brwsr1").toggle();
	var array_day=['nul','Mon','Tue','Wed','Thu','Fri','Sat'];
	var array = new Array(6);
  	for(var j = 0;j<6;j++){
  		array[j] = new Array(6);
  		for(var i = 0;i<6;i++){
  			var day = array_day[i+1];
  			var period = j + 1;
  			var ele = $("#D-table-"+day+period).children(".td-content");
			ele.clone().appendTo(".export-wrapper");		
  		}
  	}

});
