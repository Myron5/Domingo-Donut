$(".search__form").on("submit", function(event) {

    event.preventDefault();
    $('.search__error').remove(); // Очищення помилок (після зміни поля)

    let request = $(".search__input").val();
    console.log(request.trim())

    if(request.trim()) {
        document.location.href = `../List/list_main.php?current=1&request=${request}`;
    }
    else if(request.trim() == "") {
        console.log("Empty field")
        $(".search__form").prepend( $("<p class='search__error'>Empty field</p>") );
    }
    
});


const category = document.querySelector('.block').getAttribute('category'); 
const request = document.querySelector('.block').getAttribute('request');
const current = document.querySelector('.block').getAttribute('current');


let formData = new FormData();
formData.append('category', category);
formData.append('request', request);
formData.append('current', current);

$.ajax({
    url: 'assets/list.php',
    type: 'POST',
    cache: false,
    contentType: false,
    processData: false,
    data: formData,
    
    success: function(response) {
        var jsonData = JSON.parse(response);
        if (jsonData.error1 == "1") {
            $('.result').remove();
            $(".main").append( $("<p class='result'>Error entering into DataBase</p>") ).hide().fadeIn(500);
        } else if (jsonData.error2 == "2") {
            $('.result').remove();
            $(".main").append( $("<p class='result'>Error data receiving</p>") ).hide().fadeIn(500);
        } else if (jsonData.error3 == "3") {
            $('.result').remove();
            $(".main").append( $("<p class='result'>Sorry, we can`t find what you were looking for</p>") ).hide().fadeIn(500);
        } else {

            for(let i=0; i< jsonData[0].posts_count; i++) {

                changeJSON(jsonData, i)
                
                $(`.main`).append($(`
                    <div class="main__receipt">
                        <div class="receipt">
                            <img class="receipt__img" width="568px" height="320px" src="data:image/jpeg;base64, ${jsonData[i].post_img}" alt="">        
                            <div class="receipt-block">
                                <h1 class="receipt__title"> ${jsonData[i].post_title} </h1>
                                <p class="receipt__category"> ( ${jsonData[i].post_cat} ) </p> 
                                <p class="receipt__date"> post was published in ${jsonData[i].post_month}, ${jsonData[i].post_year} </p>
                                <a class="receipt__link" href="../ReceiptPage/receipt_main.php?id=${jsonData[i].post_id}"> 
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    Go to 
                                </a>
                            </div>
                        </div> 
                        <div class="author">
                            <img class="author__img" width="50px" height="50px" src="data:image/jpeg;base64, ${jsonData[i].user_img}" alt="">
                            <div class="author-block">
                                <h1 class="author__name"> ${jsonData[i].user_name} </h1>
                                <a href="mailto:${jsonData[i].user_email}" class="author__email"> ${jsonData[i].user_email} </a>
                                <p class="author__date"> on this site from ${jsonData[i].user_month}, ${jsonData[i].user_year} </p>
                            </div> 
                        </div>
                    </div>
                    <br><br><br><br><br>
                `) ).hide().fadeIn(500);
            }
    
            // Тут скалвдні математичні дії які роблять знизу посилання посилань на наступні сторінки ліста в виді кубиків 
            
            let k = 0;

            if(jsonData[0].links_count % 5 == 0) {
                max_stamp = jsonData[0].links_count / 5;
                k = -1;
            } else if(jsonData[0].links_count % 5 != 0) {
                max_stamp = Math.floor(jsonData[0].links_count / 5) + 1;
                k = 4 - jsonData[0].links_count % 5;
            }

            if(current % 5 == 0) {
                current_stamp = current / 5;
            } else if(current % 5 != 0) {
                current_stamp = Math.floor(current / 5) + 1;
            }

            if(current_stamp == 1 && current_stamp == max_stamp) {
                if(category) {
                    for(let j=4; j > k; j--) 
                    $(`.cube-links`).append($(`<div class="cube-link"> <a href="list_main.php?current=${current_stamp*5-j}&category=${category}"> ${current_stamp*5-j} </a> </div>`) ).hide().fadeIn(500);
                }
                else if(request) {
                    for(let j=4; j > k; j--) 
                        $(`.cube-links`).append($(`<div class="cube-link"> <a href="list_main.php?current=${current_stamp*5-j}&request=${request}"> ${current_stamp*5-j} </a> </div>`) ).hide().fadeIn(500);
                }
            } else if(current_stamp == 1) {
                if(category) {
                    for(let j=4; j > -1; j--) 
                        $(`.cube-links`).append($(`<div class="cube-link"> <a href="list_main.php?current=${current_stamp*5-j}&category=${category}"> ${current_stamp*5-j} </a> </div>`) ).hide().fadeIn(500);
                    $(`.cube-links`).append($(`<div class="cube-link"> <a href="list_main.php?current=${(current_stamp+1)*5-4}&category=${category}"> &raquo; </a> </div>`) ).hide().fadeIn(500);
                }
                else if(request) {
                    for(let j=4; j > -1; j--) 
                        $(`.cube-links`).append($(`<div class="cube-link"> <a href="list_main.php?current=${current_stamp*5-j}&request=${request}"> ${current_stamp*5-j} </a> </div>`) ).hide().fadeIn(500);
                    $(`.cube-links`).append($(`<div class="cube-link"> <a href="list_main.php?current=${(current_stamp+1)*5-4}&request=${request}"> &raquo; </a> </div>`) ).hide().fadeIn(500);
                }
            } else if(current_stamp == max_stamp) {
                if(category) {
                    $(`.cube-links`).append($(`<div class="cube-link"> <a href="list_main.php?current=${(current_stamp-1)*5-0}&category=${category}"> &laquo; </a> </div>`) ).hide().fadeIn(500);
                    for(let j=4; j > k; j--) 
                        $(`.cube-links`).append($(`<div class="cube-link"> <a href="list_main.php?current=${current_stamp*5-j}&category=${category}"> ${current_stamp*5-j} </a> </div>`) ).hide().fadeIn(500);
                }
                else if(request) {
                    $(`.cube-links`).append($(`<div class="cube-link"> <a href="list_main.php?current=${(current_stamp-1)*5-0}&request=${request}"> &laquo; </a> </div>`) ).hide().fadeIn(500);
                    for(let j=4; j > k; j--) 
                        $(`.cube-links`).append($(`<div class="cube-link"> <a href="list_main.php?current=${current_stamp*5-j}&request=${request}" class="active"> ${current_stamp*5-j} </a> </div>`) ).hide().fadeIn(500);
                }
            } else if(current_stamp != max_stamp) {
                if(category) {
                    $(`.cube-links`).append($(`<div class="cube-link"> <a href="list_main.php?current=${(current_stamp-1)*5-0}&category=${category}" class="active"> &laquo; </a> </div>`) ).hide().fadeIn(500);
                    for(let j=4; j > -1; j--) 
                        $(`.cube-links`).append($(`<div class="cube-link"> <a href="list_main.php?current=${current_stamp*5-j}&category=${category}" class="active"> ${current_stamp*5-j} </a> </div>`) ).hide().fadeIn(500);
                    $(`.cube-links`).append($(`<div class="cube-link"> <a href="list_main.php?current=${(current_stamp+1)*5-4}&category=${category}" class="active"> &raquo; </a> </div>`) ).hide().fadeIn(500);
                }
                else if(request) {
                    $(`.cube-links`).append($(`<div class="cube-link"> <a href="list_main.php?current=${(current_stamp-1)*5-0}&request=${request}" class="active"> &laquo; </a> </div>`) ).hide().fadeIn(500);
                    for(let j=4; j > -1; j--) 
                        $(`.cube-links`).append($(`<div class="cube-link"> <a href="list_main.php?current=${current_stamp*5-j}&request=${request}" class="active"> ${current_stamp*5-j} </a> </div>`) ).hide().fadeIn(500);
                    $(`.cube-links`).append($(`<div class="cube-link"> <a href="list_main.php?current=${(current_stamp+1)*5-4}&request=${request}" class="active"> &raquo; </a> </div>`) ).hide().fadeIn(500);
                }
            }
        } 
    },
    error: function(){
        $(".main").append( $("<p class='result'>Ow!!Chech your Internet, or restart this page</p>") ).hide().fadeIn(500);
    }
}); // відправка даних через Ajax запрос на сервер */



function changeJSON(jsonData, i) {
  const number = (jsonData[i].post_date / 31536000) + 1970;
  jsonData[i].post_year = Math.floor(number);
  jsonData[i].post_month = Math.floor( (number - jsonData[i].post_year)*365/30.5 );

  const user_number = (jsonData[i].user_date / 31536000) + 1970;
  jsonData[i].user_year = Math.floor(user_number);
  jsonData[i].user_month = Math.floor( (user_number - jsonData[i].user_year)*365/30.5 );


  jsonData[i].post_month = translateToMonth(jsonData[i].post_month)
  jsonData[i].user_month = translateToMonth(jsonData[i].user_month)

  jsonData[i].post_cat = translateToCategory(jsonData[i].post_cat)
  
  function translateToMonth(month){
    if(month == '1') return 'January';
    else if(month == '2') return 'February';
    else if(month == '3') return 'March';
    else if(month == '4') return 'April';
    else if(month == '5') return 'May';
    else if(month == '6') return 'June';
    else if(month == '7') return 'July';
    else if(month == '8') return 'August';
    else if(month == '9') return 'September';
    else if(month == '10') return 'October';
    else if(month == '11') return 'November';
    else if(month == '12') return 'December';
  }
  function translateToCategory(category){
    if(category == '1') return 'First course';
    else if(category == '2') return 'Main course';
    else if(category == '3') return 'Breakfast';
    else if(category == '4') return 'Supper';
    else if(category == '5') return 'Drinks';
    else if(category == '6') return 'Salads';
    else if(category == '7') return 'Appetizer';
    else if(category == '8') return 'Desserts';
    else if(category == '9') return 'Baking';
    else if(category == '10') return 'Other ...';
  }
}
