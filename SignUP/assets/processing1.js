$(".example").on("submit", function(event) {
    
  event.preventDefault();
  $('.fieldError').remove(); // Очищення помилок (після зміни поля)

  let request = $(".search-ph").val();
  console.log(request.trim())

  if(request.trim()) {
      document.location.href = `../List/list_main.php?current=1&request=${request}`;
  }
  else if(request.trim() == "") {
      $(".example").prepend( $("<p class='fieldError message-txt'>Empty field</p>") );
  }
});

const fields = document.querySelectorAll('.field')

$(".registrateForm").on("submit", function(event) {

  event.preventDefault() // не обновлює сторінку при натисканні на кнопку (дуже потрібна хуйня)
  $('.fieldError').remove(); // Очищення помилок (після зміни поля)

  let normalField = true

  let username = $(".username").val();
  let email = $(".email").val();
  let pass = $(".password").val();
  let passConfirm = $(".passwordConfirm").val();
  

  for (var i = 0; i < fields.length; i++) {
    if (!fields[i].value.trim()) {
      normalField = false
      $(`.div-field:eq(${i})`).prepend( $("<p class='fieldError message-txt'>Empty field</p>") );
    }
  } // Перевірка полей на пустоту 
  if ( username.length > 20 ) {
    normalField = false
    $('.div-field:eq(0)').prepend( "<p class='fieldError message-txt'>Name is too long</p>" );
  } // Перевірка імені на кількість символів (менше 20)
  if ( email.length > 32 ) {
    normalField = false
    $('.div-field:eq(1)').prepend( "<p class='fieldError message-txt'>Email is too long</p>" );
  } // Перевірка email на кількість символів (менше 32)
  if ( pass.length < 5 ) {
    normalField = false
    $('.div-field:eq(2)').prepend( "<p class='fieldError message-txt'>Password is too short</p>" );
  } // Перевірка паролю на кількість символів (більше 5)
  else if ( pass.length > 32 ) {
    normalField = false
    $('.div-field:eq(2)').prepend( "<p class='fieldError message-txt'>Password is too long</p>" );
  } // Перевірка паролю на кількість символів (менше 8)
  if ( pass !== passConfirm ) {
    normalField = false
    $('.div-field:eq(3)').prepend( "<p class='fieldError message-txt'>Not confirmed password</p>" );
  } // Перевірка підтвердження паролю
  var size = $('.image')[0].files[0].size; // розмір файлу в байтах
  if ( 2048000 < size ) {
    normalField = false
    $('.div-field:eq(4)').prepend( "<p class='fieldError message-txt'>File is too big</p>" );
  } // Перевірка на розмір файлу в байтах (менше 2000 кB)


  if(normalField) {

    let formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', pass);
    formData.append('user_photo_file', $('.image')[0].files[0]);

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
          $(".form-reg").append( $("<p class='result message-txt'>Name alredy exists, please change name</p>") ).hide().fadeIn(500);
        } else if (jsonData.error2 == "2") {
          $('.result').remove();
          $(".form-reg").append( $("<p class='result message-txt'>Error connectiong to DataBase</p>") ).hide().fadeIn(500);
        } else if (jsonData.error3 == "3"){
          $('.result').remove();
          $(".form-reg").append( $("<p class='result message-txt'>Error data-input to DataBase</p>") ).hide().fadeIn(500);
        } else if (jsonData.error4 == "4"){
          $('.result').remove();
          $(".form-reg").append( $("<p class='result message-txt'>Error data-receiving by the server</p>") ).hide().fadeIn(500);
        } else {
          $('.result').remove();
          $(".form-reg").append( $(`<p class='result message-txt'>Data was sent to server, your id = ${jsonData.sucess_id}</p>`) ).hide().fadeIn(500);
          $(".form-reg").append( $(`<p class='result message-txt'>your name = ${jsonData.sucess_name}</p>`) ).hide().fadeIn(500);
          $(".form-reg").append( $(`<p class='result message-txt'>your email = ${jsonData.sucess_email}</p>`) ).hide().fadeIn(500);
          $(".form-reg").append( $(`<p class='result message-txt'>your date = ${jsonData.sucess_date}</p>`) ).hide().fadeIn(500);
          $(".form-reg").append( $(`<img class='result' width="100px" height="100px" src="data:image/jpeg;base64, ${jsonData.sucess_image}" alt="">`) ).hide().fadeIn(500);
        } 
  
      },
      error: function(){
        $('.resultMessage').remove();
        $(".form-reg").append( $("<p class='resultMessage message-txt'>Ow!!! Chech your Internet, or restart this page</p>") ).hide().fadeIn(500);
      }
    });
    
    $(".validateBtn").prop("disabled", true);
  } // відправка даних через Ajax запрос на сервер 

});