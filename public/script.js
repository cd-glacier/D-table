var sum_credits = 0;

/*subjectで選択した科目をD_tableで表示*/
$(document).on("click", ".subject", function(event){
	event.preventDefault();
  event.stopPropagation();
	var day_period = $(this).data("dp");
	var choiced_subject = $(this).data("subject");

	/*単位数計算*/
	var choiced_credits = $(this).data("credit");
	sum_credits += choiced_credits;
	$(".D-table-"+day_period).children(".td-content").html( "<a class='subject-destroy' data-credit='" +  choiced_credits + "'>"+choiced_subject + "[x]</a>");
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
	$(element).html('clickで科目を選択');
});


/*モーダル*/
$(function () {
    $(document).on('click', '.before', function (event) {				
				event.stopPropagation();
				$('td.open').children('.modal').fadeOut();
				$('td.open').children('.td-content').fadeIn();
				$('td.open').addClass('before');
				$('td.open').removeClass('open');
				var day = $(this).data("day");
				var period = $(this).data("period");
				var ele = $(this);
				ele.removeClass('before');
				/*animation*/
        $(this).children('.td-content').fadeOut();
        $(this).addClass('open');
        setTimeout(function () {
            ele.children('.modal').fadeIn();
				}, 1000);

				/*ajax*/
				$.ajax({
					 url: "/subjects/" + String(day) + "/" + period,
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
$(document).on('click', '.mdl-button', function(event){
  event.preventDefault();
	var day = $(this).data("day");
	var period = $(this).data("period");
	console.log($(this).parent().find("input[name=subname]").val());
	$.ajax({
		type: "POST",
		url: "/" + day + "/" + period + "/new",
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
