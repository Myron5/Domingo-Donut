$(".example").on("submit", function(event) {
    
    event.preventDefault();
    $('.fieldError').remove(); // Очищення помилок (після зміни поля)

    let request = $(".search-ph").val();
    console.log(request.trim())

    if(request.trim()) {
        document.location.href = `list_main.php?current=1&request=${request}`;
    }
    else if(request.trim() == "") {
        $(".example").prepend( $("<p class='fieldError message-txt'>Empty field</p>") );
    }
});


var category = document.querySelector('.block').getAttribute('category'); 
var request = document.querySelector('.block').getAttribute('request');
var current = document.querySelector('.block').getAttribute('current');


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
            let lim;
            if(jsonData[0][10] == 0) 
                lim = 10;
            else 
                lim = jsonData[0][10];

            for(let i=0; i<lim; i++) {

                let number = ( jsonData[i][3] / 31536000) + 1970;
                let year = Math.floor(number);
                let month = Math.floor( (number - year)*365/30.5 );
    
                let author_number = (jsonData[i][7] / 31536000) + 1970;
                let author_year = Math.floor(author_number);
                let author_month = Math.floor( (author_number - author_year)*365/30.5 );

                let cate = jsonData[i][1];

                month = changeToMonth(month);
                author_month = changeToMonth(author_month);

                cate = changeToCategory(cate);
                
                $(`.receipts`).append($(`
                    <div class="container-fluid">             
                        <h1 class="rec-title">${jsonData[i][2]}</h1>
                    </div>                           
                    <div class="container card-block  container col-md-8">                  
                        <div class="main-info-block">
                            <img width="500px" height="300px" src="data:image/jpeg;base64, ${jsonData[i][4]}" alt="" class="img-cat-main">
                            <div class="main-rec-info col-md-4">
                                <br> <br>
                                <h3 class="cat-block-title">${jsonData[i][2]}</h3>
                                <h6 class="cat-block-p">${cate}</h6>
                                <h6 class="cat-block-p">post was published in ${month}, ${year}</h6>
                                <br> <br>  
                                <a href="../ReceiptPage/receipt_main.php?id=${jsonData[i][0]}" class="btn-mar"><button class="cat-btn">Go to</button></a>
                            </div> 
                        </div>
                        <br>
                        <div class="cat-user-info">
                            <div class="cat-user-info-block">
                                <img width="50px" height="50px" src="data:image/jpeg;base64, ${jsonData[i][8]}" alt="User profile photo" class="icon-cat-mar">
                                <h6 class="user-info-txt col-md-2">${jsonData[i][5]}</h6>
                                <a class="user-info-txt col-md-5" href="mailto:${jsonData[i][6]}">${jsonData[i][6]}</a>
                                <h6 class="user-info-txt col-md-5">on this site from ${author_month}, ${author_year}</h6>
                            </div>
                        </div>
                        <br> 
                    </div>  
                    <br> 
                `) ).hide().fadeIn(500);
            }

            
            if(jsonData[0][9]%5 == 0) {
                max_stamp = jsonData[0][9]/5;
                k = -1;
            }
            else if(jsonData[0][9]%5 != 0) {
                max_stamp = Math.floor(jsonData[0][9]/5) + 1;
                k = 4 - jsonData[0][9]%5;
            }
            if(current%5 == 0) {
                current_stamp = current/5;
            }
            if(current%5 != 0) {
                current_stamp = Math.floor(current/5) + 1;
            }

            if(current_stamp == 1 && current_stamp == max_stamp) {
                if(category) {
                    for(let j=4; j>k; j--) { 
                        $(`.pagination`).append($(`<a href="list_main.php?current=${current_stamp*5-j}&category=${category}" class="active">${current_stamp*5-j}</a>`) ).hide().fadeIn(500);
                        console.log(k)
                    }
                }
                else if(request) {
                    for(let j=4; j>k; j--) 
                        $(`.pagination`).append($(`<a href="list_main.php?current=${current_stamp*5-j}&request=${request}" class="active">${current_stamp*5-j}</a>`) ).hide().fadeIn(500);
                }
            }
            else if(current_stamp == 1) {
                if(category) {
                    for(let j=4; j>-1; j--) 
                        $(`.pagination`).append($(`<a href="list_main.php?current=${current_stamp*5-j}&category=${category}" class="active">${current_stamp*5-j}</a>`) ).hide().fadeIn(500);
                    $(`.pagination`).append($(`<a href="list_main.php?current=${(current_stamp+1)*5-4}&category=${category}">&raquo;</a>`) ).hide().fadeIn(500);
                }
                else if(request) {
                    for(let j=4; j>-1; j--) 
                        $(`.pagination`).append($(`<a href="list_main.php?current=${current_stamp*5-j}&request=${request}" class="active">${current_stamp*5-j}</a>`) ).hide().fadeIn(500);
                    $(`.pagination`).append($(`<a href="list_main.php?current=${(current_stamp+1)*5-4}&request=${request}">&raquo;</a>`) ).hide().fadeIn(500);
                }
            }
            else if(current_stamp == max_stamp) {
                if(category) {
                    $(`.pagination`).append($(`<a href="list_main.php?current=${(current_stamp-1)*5-0}&category=${category}">&laquo;</a>`) ).hide().fadeIn(500);
                    for(let j=4; j>k; j--) 
                        $(`.pagination`).append($(`<a href="list_main.php?current=${current_stamp*5-j}&category=${category}" class="active">${current_stamp*5-j}</a>`) ).hide().fadeIn(500);
                }
                else if(request) {
                    $(`.pagination`).append($(`<a href="list_main.php?current=${(current_stamp-1)*5-0}&request=${request}">&laquo;</a>`) ).hide().fadeIn(500);
                    for(let j=4; j>k; j--) 
                        $(`.pagination`).append($(`<a href="list_main.php?current=${current_stamp*5-j}&request=${request}" class="active">${current_stamp*5-j}</a>`) ).hide().fadeIn(500);
                }
            }
            else if(current_stamp != max_stamp) {
                if(category) {
                    $(`.pagination`).append($(`<a href="list_main.php?current=${(current_stamp-1)*5-0}&category=${category}">&laquo;</a>`) ).hide().fadeIn(500);
                    for(let j=4; j>-1; j--) 
                        $(`.pagination`).append($(`<a href="list_main.php?current=${current_stamp*5-j}&category=${category}" class="active">${current_stamp*5-j}</a>`) ).hide().fadeIn(500);
                    $(`.pagination`).append($(`<a href="list_main.php?current=${(current_stamp+1)*5-4}&category=${category}">&raquo;</a>`) ).hide().fadeIn(500);
                }
                else if(request) {
                    $(`.pagination`).append($(`<a href="list_main.php?current=${(current_stamp-1)*5-0}&request=${request}">&laquo;</a>`) ).hide().fadeIn(500);
                    for(let j=4; j>-1; j--) 
                        $(`.pagination`).append($(`<a href="list_main.php?current=${current_stamp*5-j}&request=${request}" class="active">${current_stamp*5-j}</a>`) ).hide().fadeIn(500);
                    $(`.pagination`).append($(`<a href="list_main.php?current=${(current_stamp+1)*5-4}&request=${request}">&raquo;</a>`) ).hide().fadeIn(500);
                }
            }
        } 
    },
    error: function(){
        $(".block").append( $("<p class='resultMessage'>Ow!!Chech your Internet, or restart this page</p>") ).hide().fadeIn(500);
    }
}); // відправка даних через Ajax запрос на сервер */


function changeToMonth(month) {
    switch(month) {
        case 1:
            return 'January';
            break;
        case 2:
            return 'February';
            break;
        case 3:
            return 'March';
            break;
        case 4:
            return 'April';
            break;
        case 5:
            return 'May';
            break;
        case 6:
            return 'June';
            break;
        case 7:
            return 'July';
            break;
        case 8:
            return 'August';
            break;
        case 9:
            return 'September';
            break;
        case 10:
            return 'October';
            break;
        case 11:
            return 'November';
            break;
        case 12:
            return'December';
            break;
        default:
            return '';
            break;
        }
}
function changeToCategory(cate) {
    if (cate == "1") return 'First course';
    else if (cate == "2") return 'Main course';
    else if (cate == "3") return 'Breakfast';
    else if (cate == "4") return 'Supper';
    else if (cate == "5") return 'Drinks';
    else if (cate == "6") return 'Salads';
    else if (cate == "7") return 'Appetizer';
    else if (cate == "8") return 'Desserts';
    else if (cate == "9") return 'Baking';
    else if (cate == "10") return 'Other ...';
    else return '';
}