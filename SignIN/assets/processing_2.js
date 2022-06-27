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
$(".form-log-in").on("submit", function(event) {

  event.preventDefault() // не обновлює сторінку при натисканні на кнопку (дуже потрібна хуйня)
  $('.fieldError').remove(); // Очищення помилок (після зміни поля)

  let normalField = true

  let username = $(".username").val();
  let pass = $(".password").val();
  
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
        var jsonData = JSON.parse(response);

        if (jsonData.error1 == "1") {
          $('.result').remove();
          $(".form-log-in").append( $("<p class='result container message-txt'>Name doesn`t exists</p>") ).hide().fadeIn(500);
        } else if (jsonData.error2 == "2") {
          $('.result').remove();
          $(".form-log-in").append( $("<p class='result container message-txt'>Error entering into DataBase</p>") ).hide().fadeIn(500);
        } else if (jsonData.error3 == "3"){
          $('.result').remove();
          $(".form-log-in").append( $("<p class='result container message-txt'>Your password isn`t correct</p>") ).hide().fadeIn(500);
        } else if (jsonData.error4 == "4"){
          $('.result').remove();
          $(".form-log-in").append( $("<p class='result container message-txt'>Failed to enter</p>") ).hide().fadeIn(500);
        } else {
          $('.result').remove();
          $(".form-log-in").append( $(`<p class='result container message-txt'>You have entered sucessfully</p>`) ).hide().fadeIn(500);
          $(".form-log-in").append( $(`<p class='result container message-txt'>Your id = ${jsonData.sucess_id}</p>`) ).hide().fadeIn(500);
          $(".form-log-in").append( $(`<p class='result container message-txt'>Your name = ${jsonData.sucess_name}</p>`) ).hide().fadeIn(500);
          $(".form-log-in").append( $(`<p class='result container message-txt'>Your email = ${jsonData.sucess_email}</p>`) ).hide().fadeIn(500);
          $(".form-log-in").append( $(`<p class='result container message-txt'>Your date = ${jsonData.sucess_date}</p>`) ).hide().fadeIn(500);
          $(".form-log-in").append( $(`<img class='result' width="100px" height="100px" src="data:image/jpeg;base64, ${jsonData.sucess_image}" alt="">`) ).hide().fadeIn(500);
        } 
        
      },
      error: function(){
        $('.resultMessage').remove();
        $(".form-log-in").append( $("<p class='resultMessage container message-txt'>Oww! Chech your Internet, or restart this page</p>") ).hide().fadeIn(500);
      }
    });
    
    $(".validateBtn").prop("disabled", true);
  } // відправка даних через Ajax запрос на сервер 

});