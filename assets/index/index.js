$(".search__form").on("submit", function(event) {

    event.preventDefault();
    $('.search__error').remove(); // Очищення помилок (після зміни поля)

    let request = $(".search__input").val();
    console.log(request.trim())

    if(request.trim()) {
        document.location.href = `List/list_main.php?current=1&request=${request}`;
    }
    else if(request.trim() == "") {
        console.log("Empty field")
        $(".search__form").prepend( $("<p class='search__error'>Empty field</p>") );
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
                $(`.img_container_img${i+1}`).attr('src', `data:image/jpeg;base64, ${jsonData[i][2]}`);   
                $(`.img_container_a${i+1}`).append( `${jsonData[i][1]}` ).hide().fadeIn(500);
            }
        } 
    },
    error: function(){
        $(".block").append( $("<p class='resultMessage'>Ow!!Chech your Internet, or restart this page</p>") ).hide().fadeIn(500);
    }
}); // відправка даних через Ajax запрос на сервер */
