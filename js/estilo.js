$(document).ready(function() {
    $(document.body).addClass(localStorage.getItem("style"))
    $("[type=checkbox]").each(
        function(){
            if ($(document.body).hasClass($(this).attr("id"))){
                $(this).prop('checked', true);
            }

            $(this).click(function() {
                if($(this).is(":checked")) {
                    $(document.body).addClass($(this).attr("id"))
                    localStorage.setItem("style",$(document.body).attr('class'))
                }
                else{
                    $(document.body).removeClass($(this).attr("id"))
                    localStorage.setItem("style",$(document.body).attr('class'))
                }
            })
        }
    )
});