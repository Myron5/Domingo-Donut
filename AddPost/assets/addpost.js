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

window.addEventListener( "pageshow", function ( event ) {
  var historyTraversal = event.persisted || ( typeof window.performance != "undefined" && window.performance.navigation.type === 2 );
  if ( historyTraversal ) {
    // Handle page restore.
    window.location.reload();
  }
});

var fields = document.querySelectorAll('.input')

$(".form__btn").on("click", function(event) {

  event.preventDefault() // не обновлює сторінку при натисканні на кнопку (дуже потрібна хуйня)
  $('.sm-result').remove(); // Очищення помилок (після зміни поля)
  $('.result').remove(); // Очищення помилок (після зміни поля)

  let normalField = true

  let category = $(".category__select").val();
  let title = $(".title__input").val();
  let text = $(".text__input").val();

  for (var i = 0; i < fields.length; i++) {
    if (!fields[i].value.trim()) {
      normalField = false
      $(`.form__box:eq(${i})`).prepend( "<p class='sm-result'> Empty field </p>" );
    }
  } // Перевірка полей на пустоту 
  if ( title.length > 35 ) {
    normalField = false
    $('.form__box:eq(1)').prepend( "<p class='sm-result'> Title is too long </p>" );
  } // Перевірка імені на кількість символів (менше 35)
  else if ( text.length > 65530 ) {
    normalField = false
    $('.form__box:eq(2)').prepend( "<p class='sm-result'> Receipt is too long </p>" );
  } // Перевірка імені на кількість символів (менше 65530)

  var file = document.getElementById("img").files[0];
  if ( fields[3].value != "" && 2048000 < file.size ) {
    normalField = false
    $('.form__box:eq(3)').prepend( "<p class='sm-result'> File is too big </p>" );
  } // Перевірка на розмір файлу в байтах (менше 2000 кB)
  if ( fields[3].value != "" && "image/jpeg" != file.type ) {
    normalField = false
    $('.form__box:eq(3)').prepend( `<p class='sm-result'> Error filetype ${file.type} is not compatible with required type (.jpg) </p>` );
  } // Перевірка на тип


  if(normalField) {

    let formData = new FormData();
    formData.append('category', category);
    formData.append('title', title);
    formData.append('text', text);
    formData.append('photo', file);

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
          $(".main").append( $("<p class='result'> You have not entered into your account </p>") ).hide().fadeIn(500);
        } else if (jsonData.error2 == "2") {
          $('.result').remove();
          $(".main").append( $("<p class='result'> Error connectiong to DataBase </p>") ).hide().fadeIn(500);
        } else if (jsonData.error3 == "3"){
          $('.result').remove();
          $(".main").append( $("<p class='result'> Error data-input to DataBase </p>") ).hide().fadeIn(500);
        } else {

          changeJSON(jsonData)

          $('.result').remove();
          $(".background-cover br").remove();
          $(".main").append( $(`<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>`) );
          $(".main").append( $(`
            <div class="main__receipt">
              <div class="receipt">
                <img class="receipt__img" width="568px" height="320px" src="data:image/jpeg;base64, ${jsonData.post_img}" alt="">        
                <div class="receipt-block">
                  <h1 class="receipt__title"> ${jsonData.post_title} </h1>
                  <p class="receipt__category"> ( ${jsonData.post_cat} ) </p> 
                  <p class="receipt__date"> post was published in ${jsonData.post_month}, ${jsonData.user_year} </p>
                  <a class="receipt__link" href="../ReceiptPage/receipt_main.php?id=${jsonData.post_id}"> 
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Go to 
                  </a>
                </div>
              </div> 
              <div class="author">
                <img class="author__img" width="50px" height="50px" src="data:image/jpeg;base64, ${jsonData.user_img}" alt="">
                <div class="author-block">
                  <h1 class="author__name"> ${jsonData.user_name} </h1>
                  <a href="mailto:${jsonData.user_email}" class="author__email"> ${jsonData.user_email} </a>
                  <p class="author__date"> on this site from ${jsonData.user_month}, ${jsonData.user_year} </p>
                </div> 
              </div>
            </div>
            <br><br><br><br><br>
          `)).hide().fadeIn(500);
        }  
      },
      error: function(){
        $('.result').remove();
        $(".main").append( $("<p class='result'> Oww! Chech your Internet connection, or restart this page </p>") ).hide().fadeIn(500);
      }
    });
    
    document.getElementsByClassName("add-recipe")[0].style.display = "none";
  } // відправка даних через Ajax запрос на сервер 

});


function changeJSON(jsonData){
  const number = (jsonData.post_date / 31536000) + 1970;
  jsonData.post_year = Math.floor(number);
  jsonData.post_month = Math.floor( (number - jsonData.post_year)*365/30.5 );

  const user_number = (jsonData.user_date / 31536000) + 1970;
  jsonData.user_year = Math.floor(user_number);
  jsonData.user_month = Math.floor( (user_number - jsonData.user_year)*365/30.5 );


  jsonData.post_month = translateToMonth(jsonData.post_month)
  jsonData.user_month = translateToMonth(jsonData.user_month)

  jsonData.post_cat = translateToCategory(jsonData.sucess_category)


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
  function translateToCategory(category){
    switch(category) {
      case '1':
        return 'First course';
        break;
      case '2':
        return 'Main course';
        break;
      case '3':
        return 'Breakfast';
        break;
      case '4':
        return 'Supper';
        break;
      case '5':
        return 'Drinks';
        break;
      case '6':
        return 'Salads';
        break;
      case '7':
        return 'Appetizer';
        break;
      case '8':
        return 'Desserts';
        break;
      case '9':
        return 'Baking';
        break;
      case '10':
        return 'Other ...';
        break;
    }
  }
}
