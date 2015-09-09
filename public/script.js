/*div全体をクリック可能に*/
$(function(){  
     $(".cell").click(function(){  
         window.location=$(this).find("a").attr("href");  
         return false;  
    });  
});

/*subjectで選択した科目をD_tableで表示*/
var day_array = [null, "Mon", "Tus", "Wed", "Thu", "Fri", "Sat"];

$(".subject").on("click", function(){
	var element = document.getElementsByClassName(".subject");
	for(var i = 1; i < 7; i++){
		if(element.getAttribute("class") ==  ".D-table-" + day_array[i] + String(i)){
			$(".D-table-" + day_array[i] + String(i)).html("hoge");
		}
	}
});

console.log(document.getElementsByClassName(".subject").getAttribute("class"));

