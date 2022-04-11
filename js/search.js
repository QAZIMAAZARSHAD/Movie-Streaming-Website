
$(function(){
     $("#searchText").val("");
$('.searchFeature').keyup(function(){  
     $(".buddy").show();
     $(".poster").show();
     search_table($("#searchText").val());
}); 

function search_table(value){  
   $('.flip-card-back_i h1').each(function(){  
        var found = 'false';   
             if($(this).text().toLowerCase().indexOf(value.toLowerCase()) >= 0)  
             {  
                  found = 'true';  
             }  
         
        if(found == 'true')  
        {  
             $(this).parent().parent().parent().show();
        }  
        else  
        {  
             $(this).parent().parent().parent().hide();
             $(".buddy").hide();
        }  
   });  

   $('.flim b').each(function(){  
     var found = 'false';   
          if($(this).text().toLowerCase().indexOf(value.toLowerCase()) >= 0)  
          {  
               found = 'true';  
          }  
      
     if(found == 'true')  
     {  
          $(this).parent().parent().parent().show();
     }  
     else  
     {  
          $(this).parent().parent().parent().parent().hide();
          $(".buddy").hide();
     }  
});
}

});