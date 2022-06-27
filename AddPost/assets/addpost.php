<?php
    require "../../assets/main_class.php";

    $category = $_POST['category'];
    $title = $_POST['title'];
    $text= $_POST['text'];
    $time = time();
    $img = addslashes( file_get_contents( $_FILES['photo'] ['tmp_name'] ));

    $object->add__post($category, $title, $text, $time, $img);
?>