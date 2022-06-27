$(".example").on("submit", function(event) {
    
    event.preventDefault();
    $('.fieldError').remove(); // Очищення помилок (після зміни поля)

    let request = $(".search-ph").val();
    console.log(request.trim())

    if(request.trim()) {
        document.location.href = `List/list_main.php?current=1&request=${request}`;
    }
    else if(request.trim() == "") {
        $(".example").prepend( $("<p class='fieldError message-txt'>Empty field</p>") );
    }
});

$.ajax({
    url: 'assets/index/index.php',
    type: 'POST',
    cache: false,
    contentType: false,
    processData: false,
    
    success: function(response) {
        var jsonData = JSON.parse(response);
        if (jsonData.error1 == "1") {
            $('.result').remove();
            $(".block").append( $("<p class='result'>Error entering into DataBase</p>") ).hide().fadeIn(500);
        } 
        else if (jsonData.error2 == "2") {
            $('.result').remove();
            $(".block").append( $("<p class='result'>Error data receiving</p>") ).hide().fadeIn(500);
        }
        else if (jsonData.error3 == "3") {
            $('.result').remove();
            $(".block").append( $("<p class='result'>Sorry, we can`t find what you were looking for</p>") ).hide().fadeIn(500);
        } 
        else {
            for(let i=0; i<3; i++) {
                $(`.ph${i+1}`).attr('src', `data:image/jpeg;base64, ${jsonData[i][2]}`);   
                $(`.li${i+1}`).attr('href', `ReceiptPage/receipt_main.php?id=${jsonData[i][0]}`);
                $(`.li${i+1}`).append( `${jsonData[i][1]}` ).hide().fadeIn(500);
            }
        } 
    },
    error: function(){
        $(".block").append( $("<p class='resultMessage'>Ow!!Chech your Internet, or restart this page</p>") ).hide().fadeIn(500);
    }
}); // відправка даних через Ajax запрос на сервер */
