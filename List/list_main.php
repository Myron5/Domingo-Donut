<?php
  $category = $_GET['category'];
  $request = $_GET['request'];
  $current = $_GET['current'];
?>


<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Category List</title>
    <link rel="shortcut icon" href="../assets/img/page_logo.png"/>
    <link rel="stylesheet" href="../assets/media.css">
    <link rel="stylesheet" href="assets/list.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
  </head>
  <body>
    
<div class="hed-fot">                               <!--header-->
    <div class="header">
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
              <a class="navbar-brand hed-i" href="../index.html"><img src="../assets/img/sm_donut_logo.png" alt="" class="donut-logo"></a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item dropdown nav-pod">
                        <a class="cat-f dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Categories
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                          <li><a class="dropdown-item" href="list_main.php?current=1&category=1">First course</a></li>
                          <li><a class="dropdown-item" href="list_main.php?current=1&category=2">Main course</a></li>
                          <li><a class="dropdown-item" href="list_main.php?current=1&category=3">Breakfast</a></li>
                          <li><a class="dropdown-item" href="list_main.php?current=1&category=4">Supper</a></li>
                          <li><a class="dropdown-item" href="list_main.php?current=1&category=5">Drinks</a></li>
                          <li><a class="dropdown-item" href="list_main.php?current=1&category=6">Salads</a></li>
                          <li><a class="dropdown-item" href="list_main.php?current=1&category=7">Appetizer</a></li>
                          <li><a class="dropdown-item" href="list_main.php?current=1&category=8">Desserts</a></li>
                          <li><a class="dropdown-item" href="list_main.php?current=1&category=9">Baking</a></li>
                          <li><a class="dropdown-item" href="list_main.php?current=1&category=10">Other...</a></li>
                        </ul>
                      </li>
                  <li class="nav-item nav-pod"> 
                    <a class="cat-f" href="../AddPost/addpost_main.html">Add recipe<img src="../assets/img/recipes.png" alt="" class="icon_hed"></a> 
                  </li>
                  <li class="nav-item nav-pod">
                    <a class="cat-f" href="../SignUP/signup_main.html">Sign up<img src="../assets/img/add-user.png" alt="" class="icon_hed"></a>  <!--nav-link ?????? ??????????-->
                  </li>
                  <li class="nav-item nav-pod">
                    <a class="cat-f" href="../SignIN/signin_main.php">Sign in<img src="../assets/img/refer.png" alt="" class="icon_hed"></a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
    </div>          <!--header end-->
     
      <div class="search-bar">    <!--search-->

        <form class="example">             
          <input class="search-ph" type="text" placeholder="Search..">
          <button type="submit"> 
            <img src="../assets/img/search.png" alt="" class="search_icon"> 
          </button>   <!-- ?????? ?????????? -->
        </form>
      
      </div>                        <!--end search-->

    <div class="receipts">     
    </div>

    <!--pagination-->
    <div class="pagination justify-content-center">
    </div>
    <!--pagination end-->



                                                            <!-- FOOTER -->
<div class="d-flex flex-column h-100">
  <footer class="w-100 py-4 flex-shrink-0">
      <div class="container py-4">
          <div class="row gy-4 gx-5">
              <div class="col-lg-4 col-md-6">
                  <a href="../index.html"><img src="../assets/img/sm_donut_logo.png" alt="" class="fotter-logo"> </a>
                  
                 <div>
                  <p class="sm-txt-fotter underlogo_txt">We in social networks</p>
                  <a href="https://www.instagram.com/domingo_donut/" class="inst-link social" target="_blank">Instagram</a> 
                  <a href="https://t.me/Domingo_Donut" class="telega-link social" target="_blank">Telegram</a>
                 </div> 
              </div>
              <div class="col-lg-2 col-md-6">
                  
              </div>
              <div class="col-lg-2 col-md-6">
                  <h5 class="text-white mb-3">Quick links</h5>
                  <ul class="list-unstyled text-muted">
                      <li><a href="../AddPost/addpost_main.html" class="social" target="_blank">Add recipe</a></li>
                      <li><a href="../SignIN/signin_main.php" class="social" target="_blank">Sign in</a></li>
                      <li><a href="../SignUP/signup_main.html" class="social" target="_blank">Sign up</a></li>
                  </ul>
              </div>
              <div class="col-lg-4 col-md-6">
                  <h5 class="text-white mb-3">Contact us!</h5>
                  <a class="sm-txt-fotter-gmail" href="mailto:Dom1ngo.D0nut3@gmail.com">Dom1ngo.D0nut3@gmail.com</a>
                  <p class="sm-txt-fotter">"Don't put off until dinner what you can eat for lunch."</p>  
              </div>
          </div>
      </div>
  </footer>
  <div class="black">
    <p class="sm-txt-fotter black-fotter">&copy; Copyrights. All rights reserved.</p>
  </div>
</div>

<div class="block"
  category = "<?= $category; ?>"
  request = "<?= $request; ?>"
  current = "<?= $current; ?>"
></div>  <!-- !xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx! -->

<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.5/dist/umd/popper.min.js" integrity="sha384-Xe+8cL9oJa6tN/veChSP7q+mnSPaj5Bcu9mPX5F5xIGE0DVittaqT5lorf0EI7Vk" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.min.js" integrity="sha384-kjU+l4N0Yf4ZOJErLsIcvOU2qSb74wXpOhqTvwVx3OElZRweTnQ6d31fXEoRD1Jy" crossorigin="anonymous"></script>
<script src="https://code.jquery.com/jquery-3.6.0.js"></script>
<script src="assets/list.js"></script>  
</body>
</html>