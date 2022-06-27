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

        let number = ( jsonData[0][4] / 31536000) + 1970;
        let year = Math.floor(number);
        let month = Math.floor( (number - year)*365/30.5 );

        let author_number = (jsonData[0][9] / 31536000) + 1970;
        let author_year = Math.floor(author_number);
        let author_month = Math.floor( (author_number - author_year)*365/30.5 );

        let cate = jsonData[0][1];

        month = changeToMonth(month);
        author_month = changeToMonth(author_month);

        cate = changeToCategory(cate);
        
        $(`.card-block`).append($(`
          <div class="main-info-block">
            <img width="600px" height="315px" src="data:image/jpeg;base64, ${jsonData[0][5]}"  alt="" class="img-cat-main">
              <div class="main-rec-info col-md-4">
                <h3 class="cat-block-title">${jsonData[0][2]}</h3>
                <h6 class="cat-block-p">${cate}</h6>
                <h6 class="cat-block-p">post was published in ${month}, ${year}</h6>
              </div> 
          </div>
          <div class="cat-user-info">
            <div class="cat-user-info-block">
              <img width="50px" height="50px" src="data:image/jpeg;base64, ${jsonData[0][10]}"  alt="User profile photo" class="icon-cat-mar">
              <h6 class="user-info-txt col-md-2">${jsonData[0][7]}</h6>
              <a href="mailto:${jsonData[0][8]}" class="user-info-txt col-md-5">${jsonData[0][8]}</a>
              <h6 class="user-info-txt col-md-5">on this site from ${author_month}, ${author_year}</h6>
            </div>
          </div>
          <div class="rec-des-block">
            <div class="rec-des-title">
            <h3 class="rec-tt-style">Description of dishes</h3>
          </div>
          <div class="rec-des-txt col-md-8 col-xl-10">
            <p class="rec-des-txt-style">
              ${jsonData[0][3]}
            </p>
          </div>
      </div>
        `) ).hide().fadeIn(500);
          
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