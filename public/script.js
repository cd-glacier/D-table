
/*subjectで選択した科目をD_tableで表示*/
var day_array = [null, "Mon", "Tus", "Wed", "Thu", "Fri", "Sat"];
$(".subject").on("click", function(){
	var day_period = $(this).data("dp");
	var choiced_subject = $(this).data("subject");
	$(".D-table-" + day_period ).html("<a class='subject-destroy'>" + choiced_subject + "[x]</a>");
	$(this).parent(".modal").fadeOut();
		 var ele = $(this);
		 setTimeout(function (){
				 ele.parent(".td").removeClass('slide');
				 ele.parent(".td-content").fadeIn();
		 }, 300);
	});

/*[x]押されたら選択されてる教科消して,(単位数も削除)*/
$(".subject-destroy").on("click", function(){
	var element = $(this).parent();
	$(element).html('<div class="td-content">clickで科目を選択</div>');
	$(this).remove();
});


/*D-tableにあったscript*/
$(function () {
    $('body').on('click', 'td', function (event) {
				event.preventDefault();
				var day = $(this).data("day");
				var period = $(this).data("period");
				var ele = $(this);
				/*animation*/
        $(this).children('.td-content').fadeOut();
        $(this).parent().addClass('open');
        $(this).addClass('slide');
        setTimeout(function () {
            ele.children('.modal').fadeIn();
            setTimeout(function () {
                
            }, 500);
				}, 600);

				/*ajax*/
				$.ajax({
					 url: "/subjects/" + String(day) + "/" + period,
					 success: function(data) {
			 		 		$(".D-table-" + String(day) + period + " .modal-content").html(data);
	 			   }
				});
    });
    $('body').on('click', '.close', function (event) {
        event.preventDefault();
        event.stopPropagation();
        $(this).parent().fadeOut();
        var ele = $(this);
        setTimeout(function (){
        	ele.parent().parent().removeClass('slide');
        	ele.parent().siblings().fadeIn();
        }, 300);       
        
    });
});

