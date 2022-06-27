<?php
    require "../../assets/main_class.php";

    $username = $_POST['username'];
    $password = $_POST['password'];

    $object->checks__user($username, $password);
?>