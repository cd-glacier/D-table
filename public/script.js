
//div全体をクリック可能に
$(function(){  
     $(".mdl-cell").click(function(){  
         window.location=$(this).find("a").attr("href");  
         return false;  
    });  
});  
