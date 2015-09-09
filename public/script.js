/*div全体をクリック可能に*/
$(function(){  
     $(".cell").click(function(){  
         window.location=$(this).find("a").attr("href");  
         return false;  
    });  
});

/*subjectで選択した科目をD_tableで表示*/
var day_array = [null, "Mon", "Tus", "Wed", "Thu", "Fri", "Sat"];


$(".subject-Mon1").on("click", function(){
	$(".D-table-Mon1").html("hoge");
});


