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


var id = document.querySelector('.block').getAttribute('id'); 

let formData = new FormData();
formData.append('id', id);

$.ajax({
  url: 'assets/receipt.php',
  type: 'POST',
  cache: false,
  contentType: false,
  processData: false,
  data: formData,
  
  success: function(response) {
    var jsonData = JSON.parse(response);
    if (jsonData.error1 == "1") {
      $('.result').remove();
      $(".main").prepend( $("<p class='result'>Error entering into DataBase</p>") ).hide().fadeIn(500);
    } 
    else if (jsonData.error2 == "2") {
      $('.result').remove();
      $(".main").prepend( $("<p class='result'>Error data receiving</p>") ).hide().fadeIn(500);
    }
    else if (jsonData.error3 == "3") {
      $('.result').remove();
      $('.main').prepend( $("<p class='result'>Sorry, we can`t find what you were looking for</p>") ).hide().fadeIn(500);
    } 
    else {

      changeJSON(jsonData)
      
      $(`.receipt__img`).attr('src', `data:image/jpeg;base64, ${ jsonData.post_img }`);   
      $(`.receipt__title`).append( `${ jsonData.post_title }` ).hide().fadeIn(500);
      $(`.receipt__txt`).append( `${ changeTxt( jsonData.post_txt ) }` ).hide().fadeIn(500); 

      $(`.author__img`).attr('src', `data:image/jpeg;base64, ${ jsonData.user_img }`);
      $(`.author__name`).append( `${ jsonData.user_name }` ).hide().fadeIn(500);  
      $(`.author__email`).append( `${ jsonData.user_email }` ).hide().fadeIn(500);    
      $(`.author__email`).attr('href', `mailto:${ jsonData.user_email }`); 
      $(`.author__date`).append( `on this site from ${ jsonData.user_month }, ${ jsonData.user_year }` ).hide().fadeIn(500);  
    } 
  },
  error: function(){
      $(".main").append( $("<p class='result'>Ow!!Chech your Internet, or restart this page</p>") ).hide().fadeIn(500);
  }
}); // відправка даних через Ajax запрос на сервер */


function changeTxt(txt) {
  arr = []

  for (let i = 0; i < txt.length; i++) {
    if(txt[i] == '\n') 
        arr[i] = " <br> "
    else if(txt[i] == ' ') 
        arr[i] = " &nbsp; "
    else
        arr[i] = txt[i]
}

  return arr.join("");
}

function changeJSON(jsonData){
  const number = (jsonData.user_date / 31536000) + 1970;
  jsonData.user_year = Math.floor(number);
  jsonData.user_month = Math.floor( (number - jsonData.user_year)*365/30.5 );
  jsonData.user_month = translateToMonth(jsonData.user_month);

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
