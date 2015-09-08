$(function(){  
     $(".cell").click(function(){  
         window.location=$(this).find("a").attr("href");  
         return false;  
    });  
});
/*
$("#Mon1").click(function(){
	$("#Mon1").html("hoge");
	
});
*/


