var sum_credits = 0;

/*subjectで選択した科目をD_tableで表示*/
$(document).on("click", ".subject", function(event){
	event.preventDefault();
  event.stopPropagation();
	var day_period = $(this).data("dp");
	var choiced_subject = $(this).data("subject");
	var choiced_credits = $(this).data("credit");
	/*単位数計算*/
	sum_credits += choiced_credits;
	$(".D-table-"+day_period).children(".td-content").html( "<a class='subject-destroy'>"+choiced_subject + "[x]</a>");

	/*単位表示*/
	$(".sum-credits").html("選択単位数:" + sum_credits);
	

	$(this).parents('.modal').fadeOut();
	$(this).parents('td').addClass('before');
    var ele = $(this);
    setTimeout(function (){
        ele.parents('td').removeClass('open');
        $(".D-table-"+day_period).children(".td-content").fadeIn();
    }, 300); 
		/*htmlへ単位*/
});

/*[x]押されたら選択されてる教科消して,(単位数も削除)*/
$(document).on("click",".subject-destroy",function(event){	
  event.stopPropagation();  
	var element = $(this).parent();
	var choiced_credits = $(this).data("credit");
	/*単位数計算*/
	sum_credits -= coiced_credits;
	$(this).remove();
	$(element).html('clickで科目を選択');
});


/*モーダル*/
$(function () {
    $(document).on('click', '.before', function (event) {				
				event.stopPropagation();
				var ele = $('td.open');
				var day = $(this).data("day");
				var period = $(this).data("period");
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


