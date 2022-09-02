<?php
  $category = $_GET['category'];
  $request = $_GET['request'];
  $current = $_GET['current'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Domingo Donut</title>
    <link rel="shortcut icon" href="../assets/img/page_logo.png"/>
    <link rel="stylesheet" href="../assets/media.css">
    <link rel="stylesheet" href="assets/list.css">
</head>
<body>

    <!-- ----------------------------------------- Хедер -------------------------------------------->



    <div class="wrapper">
      <div class="background-cover">
        <header class="header">
          <div class="header__container _container">
            <!---------------------- Лого ---------------------->
            <a href="../index.html" class="header__logo"> <img width="100px" src="../assets/img/sm_donut_logo.png" alt=""> </a>

            <!---------------------- Навігація ---------------------->
            <nav class="header__menu">
              <ul class="menu__list">
                <li class="menu__item"> 
                  <div class="menu__link menu__link-1"> 
                    <img width="25px" src="../assets/img/category.png" alt="">      
                    Categories  
                    <ul class="cat">
                      <li>
                        <a href="../List/list_main.php?current=1&category=1" class="cat__link"> First course </a>
                      </li>

                      <li>
                        <a href="../List/list_main.php?current=1&category=2" class="cat__link"> Main course </a>
                      </li>

                      <li>
                        <a href="../List/list_main.php?current=1&category=3" class="cat__link"> Breakfast </a>
                      </li>

                      <li>
                        <a href="../List/list_main.php?current=1&category=4" class="cat__link"> Supper </a>
                      </li>
                      
                      <li>
                        <a href="../List/list_main.php?current=1&category=5" class="cat__link"> Drinks </a>
                      </li>

                      <li>
                        <a href="../List/list_main.php?current=1&category=6" class="cat__link"> Salads </a>
                      </li>

                      <li>
                        <a href="../List/list_main.php?current=1&category=7" class="cat__link"> Snacks </a>
                      </li>

                      <li>
                        <a href="../List/list_main.php?current=1&category=8" class="cat__link"> Desserts </a>
                      </li>

                      <li>
                        <a href="../List/list_main.php?current=1&category=9" class="cat__link"> Baking </a>
                      </li>

                      <li>
                        <a href="../List/list_main.php?current=1&category=10" class="cat__link"> Another </a>
                      </li>
                    </ul> 
                  </div>
                </li>
                <li class="menu__item"> <a href="../AddPost/addpost_main.html" class="menu__link menu__link-2"> <img width="25px" src="../assets/img/add-receipe.png" alt="">   Add recipe   </a></li>
                <li class="menu__item"> <a href="../SignUP/signup_main.html" class="menu__link menu__link-3"> <img width="25px" src="../assets/img/sign-up.png" alt="">       Sign up      </a></li>
                <li class="menu__item"> <a href="../SignIN/signin_main.php" class="menu__link menu__link-4"> <img width="25px" src="../assets/img/sign-in.png" alt="">       Sign in      </a></li>
              </ul>
            </nav>
          </div>

          <!---------------------- Пошук ---------------------->
          <div class="header__search">    
            <form class="search__form">             
              <input class="search__input" type="text" placeholder="Search..">
              <button class="search__btn" type="submit"> 
                <img src="../assets/img/search_.png" width="56px" alt=""> 
              </button>   
            </form>  
          </div> 
        </header>

        <!-------------------------------------------- Мейн -------------------------------------------->
       
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
            
        <main class="main">
          <!-- Тут будуть блоки з рецептами -->
          <!-- Тут будуть блоки з рецептами -->
          <!-- Тут будуть блоки з рецептами -->
          <!-- Тут будуть блоки з рецептами -->
          <!-- Тут будуть блоки з рецептами -->
        </main>

        <!-- Кубик  -->
        <div class="cube-links"> </div>

        <br><br><br><br>
      </div>

      <!-------------------------------------------- Футер -------------------------------------------->

      <footer class="footer">
        <div class="footer__container _container">

          <a href="../index.html" target="_blank" class="footer__logo"> <img width="100px" src="../assets/img/sm_donut_logo.png" alt="" class="fotter-logo"> </a>
          
          <div class="footer__socials-block">
            <p class="footer__socials-title"> We in social networks </p>
            <a href="https://www.instagram.com/domingo_donut/" class="inst-link footer__social" target="_blank"> Instagram </a> 
            <a href="https://t.me/Domingo_Donut" class="telega-link footer__social" target="_blank"> Telegram </a>
            <br><br>
          </div>

          <div class="footer__quick-block">
            <h5 class="footer__quick-title"> Quick links </h5>
            <ul class="footer__quick-links">
              <li> <a href="../AddPost/addpost_main.html" class="footer__quick-link" target="_blank"> Add recipe </a> </li>
              <li> <a href="../SignIN/signin_main.php" class="footer__quick-link" target="_blank"> Sign in </a> </li>
              <li> <a href="../SignUP/signup_main.html" class="footer__quick-link" target="_blank"> Sign up </a> </li>
            </ul>
            <br><br>
          </div>

          <div class="footer__mail-block">
            <h5 class="footer__mail-title"> Contact us! </h5>
            <a class="footer__mail" href="mailto:Dom1ngo.D0nut3@gmail.com"> Dom1ngo.D0nut3@gmail.com </a>
            <br><br><br><br>
            <p class="footer__mail-txt"> "Don't put off until dinner what you can eat for lunch." </p>  
          </div>

        </div>
      </footer>

      <!-------------------------------------------- Права -------------------------------------------->

      <div class="copyrights">
        <br><br><br>
        <p class="copyrights__txt">&copy; Copyrights. All rights reserved.</p>
      </div>

      <div class="block"
        category = "<?= $category; ?>"
        request = "<?= $request; ?>"
        current = "<?= $current; ?>"
      ></div> 
    </div>
    
  <script src="../assets/jQuerry.js"></script>
  <script src="assets/list.js"></script>  
</body>
</html>