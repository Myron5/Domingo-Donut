<?php
    require "../../assets/main_class.php";

    $category = $_POST['category'];
    $request = $_POST['request'];
    $current = $_POST['current'];

    if($request) {
        $object->get_request_list($request, $current);
    }
    else if($category) {
        $object->get_category_list($category, $current);
    }
?>