$(function(){  
     $(".cell").click(function(){  
         window.location=$(this).find("a").attr("href");  
         return false;  
    });  
});

$("#subject-Mon1").on("click", function(){
	$("#D-table-Mon1").html("hoge");
});

