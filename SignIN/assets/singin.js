$(".search__form").on("submit", function(event) {
  
  event.preventDefault()
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


const fields = document.querySelectorAll('.input')

$(".form__btn").on("click", function(event) {

  event.preventDefault() // не обновлює сторінку при натисканні на кнопку (дуже потрібна хуйня)
  $('.fieldError').remove(); // Очищення помилок (після зміни поля)

  let normalField = true

  const username = $(".name__input").val();
  const pass = $(".password__input").val();
  
  for (var i = 0; i < fields.length; i++) {
    if (!fields[i].value.trim()) {
      normalField = false
      $(`.div-field:eq(${i})`).prepend( $("<p class='fieldError container message-txt'>Empty field</p>") );
    }
  } // Перевірка полей на пустоту 
 
  if(normalField) {

    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', pass);

    $.ajax({
      url: 'assets/signin.php',
      type: 'POST',
      cache: false,
      contentType: false,
      processData: false,
      data: formData,
      
      success: function(response) {
        let jsonData = JSON.parse(response);

        if (jsonData.error1 == "1") {
          $('.result').remove();
          $(".main").append( $("<p class='result'> Name doesn't exists </p> <br><br>") ).hide().fadeIn(500);
        } else if (jsonData.error2 == "2") {
          $('.result').remove();
          $(".main").append( $("<p class='result'> Error entering into DataBase </p> <br><br>") ).hide().fadeIn(500);
        } else if (jsonData.error3 == "3"){
          $('.result').remove();
          $(".main").append( $("<p class='result'> Your password isn`t correct </p> <br><br>") ).hide().fadeIn(500);
        } else if (jsonData.error4 == "4"){
          $('.result').remove();
          $(".main").append( $("<p class='result'> Failed to enter </p> <br><br>") ).hide().fadeIn(500);
        } else {

          changeJSON(jsonData)

          $('.result').remove();
          $(".background-cover br").remove();
          $(".main").append( $(`
            <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
            <div class="author">
              <img class="author__img" width="50px" height="50px" src="data:image/jpeg;base64, ${jsonData.user_img}" alt="">
              <div class="author-block">
                <h1 class="author__name"> ${jsonData.user_name} </h1>
                <a href="mailto:${jsonData.user_email}" class="author__email"> ${jsonData.user_email} </a>
                <p class="author__date"> on this site from ${ jsonData.user_month }, ${jsonData.user_year} </p>
              </div> 
            </div>
            <br><br><br><br><br>  
          `) ).hide().fadeIn(500);
        } 
        
      },
      error: function(){
        $('.result').remove();
        $(".main").append( $("<p class='resultMessage container message-txt'> Oww! Chech your Internet, or restart this page </p> <br><br>") ).hide().fadeIn(500);
      }
    });
    
    document.getElementsByClassName("sign-in")[0].style.display = "none";
  } // відправка даних через Ajax запрос на сервер 

});


function changeJSON(jsonData){
  const user_number = (jsonData.user_date / 31536000) + 1970;
  jsonData.user_year = Math.floor(user_number);
  jsonData.user_month = Math.floor( (user_number - jsonData.user_year)*365/30.5 );
  jsonData.user_month = translateToMonth(jsonData.user_month)

  function translateToMonth(month){
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
        return 'December';
        break;
      default:
        return '';
        break;
    }
  }
}