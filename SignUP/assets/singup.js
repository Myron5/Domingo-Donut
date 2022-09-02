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

$("[type=file]").on("change", function(){
  try{
    var file = this.files[0].name;
  }
  catch (error) {
    $(this).next().text("Select file");
  }

  var plch = $(this).attr("placeholder");

  if($(this).val() != ""){
    $(this).next().text(file);
  } else {
    $(this).next().text(plch);
  }
});


const fields = document.querySelectorAll('.input')

$(".form__btn").on("click", function(event) {

  event.preventDefault() // не обновлює сторінку при натисканні на кнопку (дуже потрібна хуйня)
  $('.sm-result').remove(); // Очищення помилок (після зміни поля)

  let normalField = true

  const username = $(".name__input").val();
  const email = $(".e-mail__input").val();
  const pass = $(".password__input").val();
  const passConfirm = $(".password-conf__input").val();
  const file = $('.image__input')[0].files[0]
  

  for (var i = 0; i < fields.length; i++) {
    if (!fields[i].value.trim()) {
      normalField = false
      $(`.form__box:eq(${i})`).prepend( $("<p class='sm-result'> Empty field </p>") );
    }
  } // Перевірка полей на пустоту 
  if ( username.length > 20 ) {
    normalField = false
    $('.form__box:eq(0)').prepend( "<p class='sm-result'> Name is too long </p>" );
  } // Перевірка імені на кількість символів (менше 20)
  if ( email.length > 32 ) {
    normalField = false
    $('.form__box:eq(1)').prepend( "<p class='sm-result'> Email is too long </p>" );
  } // Перевірка email на кількість символів (менше 32)
  if ( pass.length < 5 ) {
    normalField = false
    $('.form__box:eq(2)').prepend( "<p class='sm-result'> Password is too short </p>" );
  } // Перевірка паролю на кількість символів (більше 5)
  else if ( pass.length > 32 ) {
    normalField = false
    $('.form__box:eq(2)').prepend( "<p class='sm-result'> Password is too long </p>" );
  } // Перевірка паролю на кількість символів (менше 8)
  if ( pass !== passConfirm ) {
    normalField = false
    $('.form__box:eq(3)').prepend( "<p class='sm-result'> Not confirmed password </p>" );
  } // Перевірка підтвердження паролю
  if ( file && 2048000 < file.size ) {
    normalField = false
    $('.div-field:eq(4)').prepend( "<p class='fieldError message-txt'>File is too big</p>" );
  } // Перевірка на розмір файлу в байтах (менше 2000 кB)


  if(normalField) {

    let formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', pass);
    formData.append('user_photo_file', file);

    $.ajax({
      url: 'assets/signup.php',
      type: 'POST',
      cache: false,
      contentType: false,
      processData: false,
      data: formData,
      
      success: function(response) {
        var jsonData = JSON.parse(response);
        if (jsonData.error1 == "1") {
          $('.result').remove();
          $(".main").append( $("<p class='result'> Name alredy exists, please change name </p>") ).hide().fadeIn(500);
        } else if (jsonData.error2 == "2") {
          $('.result').remove();
          $(".main").append( $("<p class='result'> Error connectiong to DataBase </p>") ).hide().fadeIn(500);
        } else if (jsonData.error3 == "3"){
          $('.result').remove();
          $(".main").append( $("<p class='result'> Error data-input to DataBase </p>") ).hide().fadeIn(500);
        } else if (jsonData.error4 == "4"){
          $('.result').remove();
          $(".main").append( $("<p class='result'> Error data-receiving by the server </p>") ).hide().fadeIn(500);
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
        $(".main").append( $("<p class='result'> Ow!!! Chech your Internet, or restart this page </p>") ).hide().fadeIn(500);
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