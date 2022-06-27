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

$(".form-post").on("submit", function(event) {

  event.preventDefault() // не обновлює сторінку при натисканні на кнопку (дуже потрібна хуйня)
  $('.fieldError').remove(); // Очищення помилок (після зміни поля)

  let normalField = true

  let category = $(".category").val();
  let title = $(".title").val();
  let text = $(".text").val();

  for (var i = 0; i < fields.length; i++) {
    if (!fields[i].value.trim()) {
      normalField = false
      $(`.div-field:eq(${i})`).prepend( $("<p class='fieldError message-txt'>Empty field</p>") );
    }
  } // Перевірка полей на пустоту 
  if ( title.length > 35 ) {
    normalField = false
    $('.div-field:eq(1)').prepend( "<p class='fieldError message-txt'>Title is too long</p>" );
  } // Перевірка імені на кількість символів (менше 35)
  else if ( text.length > 65530 ) {
    normalField = false
    $('.div-field:eq(2)').prepend( "<p class='fieldError message-txt'>Receipt is too long</p>" );
  } // Перевірка імені на кількість символів (менше 65530)

  var size = $('.image')[0].files[0].size; // розмір файлу в байтах
  if ( 2048000 < size ) {
    normalField = false
    $('.div-field:eq(4)').prepend( "<p class='fieldError message-txt'>File is too big</p>" );
  } // Перевірка на розмір файлу в байтах (менше 2000 кB)


  if(normalField) {

    let formData = new FormData();
    formData.append('category', category);
    formData.append('title', title);
    formData.append('text', text);
    formData.append('photo', $('.image')[0].files[0]);

    $.ajax({
      url: 'assets/addpost.php',
      type: 'POST',
      cache: false,
      contentType: false,
      processData: false,
      data: formData,
      
      success: function(response) {
        var jsonData = JSON.parse(response);
        if (jsonData.error1 == "1") {
          $('.result').remove();
          $(".form-post").append( $("<p class='result message-txt'>You have not entered into your account</p>") ).hide().fadeIn(500);
        } else if (jsonData.error2 == "2") {
          $('.result').remove();
          $(".form-post").append( $("<p class='result message-txt'>Error connectiong to DataBase</p>") ).hide().fadeIn(500);
        } else if (jsonData.error3 == "3"){
          $('.result').remove();
          $(".form-post").append( $("<p class='result message-txt'>Error data-input to DataBase</p>") ).hide().fadeIn(500);
        } else if (jsonData.error4 == "4"){
          $('.result').remove();
          $(".form-post").append( $("<p class='result message-txt'>Error data-receiving by the server</p>") ).hide().fadeIn(500);
        } else {

          let number = (jsonData.sucess_date / 31536000) + 1970;
          let year = Math.floor(number);
          let month = Math.floor( (number - year)*365/30.5 );

          let author_number = (jsonData.sucess_author_date/ 31536000) + 1970;
          let author_year = Math.floor(author_number);
          let author_month = Math.floor( (author_number - author_year)*365/30.5 );

          switch(month) {
            case 1:
              month = 'January';
              break;
            case 2:
              month = 'February';
              break;
            case 3:
              month = 'March';
              break;
            case 4:
              month = 'April';
              break;
            case 5:
              month = 'May';
              break;
            case 6:
              month = 'June';
              break;
            case 7:
              month = 'July';
              break;
            case 8:
              month = 'August';
              break;
            case 9:
              month = 'September';
              break;
            case 10:
              month = 'October';
              break;
            case 11:
              month = 'November';
              break;
            case 12:
              month = 'December';
              break;
            default:
              month = '';
              break;
          }

          let cat = jsonData.sucess_category;

          
          if (cat = 1) cat = 'First course';
          else if (cat = 2) cat = 'Main course';
          else if (cat = 3) cat = 'Breakfast';
          else if (cat = 4) cat = 'Supper';
          else if (cat = 5) cat = 'Drinks';
          else if (cat = 6) cat = 'Salads';
          else if (cat = 7) cat = 'Appetizer';
          else if (cat = 8) cat = 'Desserts';
          else if (cat = 9) cat = 'Baking';
          else if (cat = 10) cat = 'Other ...';
          
          

          $('.result').remove();
          $(".form-post").append( $(`<p class='result message-txt'>Data was sent to server, post id = ${jsonData.sucess_post_id}</p>`) ).hide().fadeIn(500);
          $(".form-post").append( $(`<p class='result message-txt'>post author id = ${jsonData.sucess_author_id}</p>`) ).hide().fadeIn(500);
          $(".form-post").append( $(`<p class='result message-txt'>Category = ${cat}</p>`) ).hide().fadeIn(500);
          $(".form-post").append( $(`<p class='result message-txt'>Title = ${jsonData.sucess_title}</p>`) ).hide().fadeIn(500);
          $(".form-post").append( $(`<p class='result message-txt'>Receipt = ${jsonData.sucess_text}</p>`) ).hide().fadeIn(500);
          $(".form-post").append( $(`<p class='result message-txt'>post was published in ${month}, ${year}</p>`) ).hide().fadeIn(500);
          $(".form-post").append( $(`<img class='result' width="875px" height="400px" src="data:image/jpeg;base64, ${jsonData.sucess_image}" alt="">`) ).hide().fadeIn(500);

          $(".form-post").append( $(`<p class='result message-txt'>${jsonData.sucess_name}</p>`) ).hide().fadeIn(500);
          $(".form-post").append( $(`<p class='result message-txt'>${jsonData.sucess_email}</p>`) ).hide().fadeIn(500);
          $(".form-post").append( $(`<p class='result message-txt'>on this site from ${author_month}, ${author_year}</p>`) ).hide().fadeIn(500);
          $(".form-post").append( $(`<img class='result' width="100px" height="100px" src="data:image/jpeg;base64, ${jsonData.sucess_author_image}" alt="">`) ).hide().fadeIn(500);
        } 
        
      },
      error: function(){
        $('.resultMessage').remove();
        $(".form-post").append( $("<p class='resultMessage message-txt'>Oww! Chech your Internet connection, or restart this page</p>") ).hide().fadeIn(500);
      }
    });
    
    $(".validateBtn").prop("disabled", true);
  } // відправка даних через Ajax запрос на сервер 

});