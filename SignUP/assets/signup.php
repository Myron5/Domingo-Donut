<?php
    require "../../assets/main_class.php";

    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $time = time();
    $img = addslashes( file_get_contents( $_FILES['user_photo_file'] ['tmp_name'] ));

    $object->add__user($username, $email, $password, $time, $img);
?>