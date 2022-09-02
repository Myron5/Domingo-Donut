<?php
session_start();
    class Data {
        // properties
        private $host;
        private $name;
        private $pass;
        private $db;

        private $conn;

        //constructor
        function __construct($host, $name, $pass, $db ) {
            $this->host = $host;
            $this->name = $name;
            $this->pass = $pass;
            $this->db = $db;
        }
        
        //method adds new user to db
        function add__user($username, $email, $password, $time, $img) {
            if( $username ) {

                $this->conn = new mysqli("{$this->host}", "{$this->name}", "{$this->pass}", "{$this->db}");
                if($this->conn->connect_error) {
                    echo json_encode(array('error2' => '2'));
                    $this->conn->close();
                    exit();
                } 

                $sql = "SELECT id FROM `users` WHERE name = '$username';";
                $result = $this->conn->query($sql);
                $result = $result->fetch_array(MYSQLI_NUM);
                if($result[0]) {
                    echo json_encode(array('error1' => '1'));
                    $this->conn->close();
                    exit();
                }


                $sql = "INSERT INTO `users` (`id`, `name`, `email`, `password`, `date`, `images`) 
                VALUES (NULL, '$username', '$email', MD5('$password'), '$time', '$img');";

                if($this->conn->query($sql)) {
                    $sql = "SELECT * FROM `users` WHERE name = '$username';";
                    $result = $this->conn->query($sql);
                    $result = $result->fetch_array(MYSQLI_ASSOC);
        
                    setcookie ("username", $username, time() + 2592000);
                    setcookie ("password", $password, time() + 2592000);

                    echo json_encode(array(
                        'user_name' => $result["name"], 
                        'user_email' => $result["email"],
                        'user_date' => $result["date"],
                        'user_img' => base64_encode($result["images"])
                    ));

                    $this->conn->close();
                } 
                else {
                    echo json_encode(array('error3' => 3));
                    $this->conn->close();
                    exit();
                } 
            } 
            else {
                echo json_encode(array('error4' => 4));
                exit();
            } 
        }
                                                                 
        //method checks account
        function checks__user($username, $password) {

            $this->conn = new mysqli("{$this->host}", "{$this->name}", "{$this->pass}", "{$this->db}");
            if($this->conn->connect_error) {
                echo json_encode(array('error2' => 2));
                $this->conn->close();
                exit();
            } 

            $sql = "SELECT `id` FROM `users` WHERE `name` = '$username';";
            $result = $this->conn->query($sql);
            $result = $result->fetch_array(MYSQLI_ASSOC);

            if($result["id"]) {

                $sql = "SELECT `password` FROM `users` WHERE name = '$username';";
                $result = $this->conn->query($sql);
                $result = $result->fetch_array(MYSQLI_ASSOC);
            
                if($result["password"]) {

                    if(md5($password) != $result["password"]) {
                        echo json_encode(array('error3' => 3));
                        $this->conn->close();
                        exit();
                    } 
                    else if(md5($password) == $result["password"]) {

                        $sql = "SELECT * FROM `users` WHERE name = '$username';";
                        $result = $this->conn->query($sql);
                        $result = $result->fetch_array(MYSQLI_ASSOC);
            
                        setcookie ("username", $username, time() + 2592000);
                        setcookie ("password", $password, time() + 2592000);

                        unset($SESSION["username"]);
                        unset($SESSION["password"]);

                        $_SESSION["username"] = $username;
                        $_SESSION["password"] = $password;

                        echo json_encode(array(
                            'user_name' => $result["name"], 
                            'user_email' => $result["email"],
                            'user_date' => $result["date"],
                            'user_img' => base64_encode($result["images"])
                        ));

                        $this->conn->close();
                    }

                }
                else {
                    echo json_encode(array('error4' => 4));
                    $this->conn->close();
                    exit();
                } 

            } 
            else {
                echo json_encode(array('error1' => 1));
                $this->conn->close();
                exit();
            }
            
        }

        //method adds new post to db
        function add__post($category, $title, $text, $time, $img) {
            if( $category ) {

                $this->conn = new mysqli("{$this->host}", "{$this->name}", "{$this->pass}", "{$this->db}");

                $sessio = $_SESSION["username"];
                if(!$sessio) {
                    echo json_encode(array('error1' => 1));
                    $this->conn->close();
                    exit();
                } // Перевірка на існування author_id

                $sql = "SELECT `id`, `name`, `email`, `date`, `images`  FROM `users` WHERE `name`='$sessio';";
                $result_author = $this->conn->query($sql);
                $result_author = $result_author ->fetch_array(MYSQLI_ASSOC);
                $result_id = $result_author["id"];

                $sql = "INSERT INTO `posts` (`author_id`, `category`, `title`, `text`, `date`, `image`) 
                    VALUES ('$result_id', '$category', '$title', '$text', '$time', '$img');";

                if($this->conn->connect_error) {
                    echo json_encode(array('error2' => 2));
                    $this->conn->close();
                    exit();
                } 
                if($this->conn->query($sql)) {
                    $sql = "SELECT * FROM `posts` WHERE `title` = '$title' AND `date` = '$time' AND `text` = '$text';";
                    $result = $this->conn->query($sql);
                    $result = $result->fetch_array(MYSQLI_ASSOC);

                    $author_id = $result["author_id"];
                    $sql = "SELECT * FROM `users` WHERE `id` = '$author_id';";
                    $author_result = $this->conn->query($sql);
                    $author_result = $author_result->fetch_array(MYSQLI_ASSOC);

                    echo json_encode(array(
                        'post_id' => $result["post_id"], 
                        'post_cat' => $result["category"], 
                        'post_title' => $result["title"], 
                        'post_date' => $result["date"], 
                        'post_img' => base64_encode($result["image"]),

                        'user_name' => $author_result['name'], 
                        'user_email'=> $author_result['email'], 
                        'user_date' => $author_result['date'], 
                        'user_img' => base64_encode($author_result['images']) )
                    );

                    $this->conn->close();
                } 
                else {
                    echo json_encode(array('error3' => 3));
                    $this->conn->close();
                    exit();
                } 
            } 
            else {
                echo json_encode(array('error4' => 4));
                exit();
            } 

        }
        
        // < ------------------------------------------------------------------------------------------- >

        //відсилає 10 рецептів з заданого рядка
        function get_request_list($request, $current) {
            $this->conn = new mysqli("{$this->host}", "{$this->name}", "{$this->pass}", "{$this->db}");
            $sql = "SELECT COUNT(`post_id`) FROM `posts` WHERE `title` LIKE '%$request%' OR `text` LIKE '%$request%';";
            $result = $this->conn->query($sql);



            if( $request ) {
                $this->conn = new mysqli("{$this->host}", "{$this->name}", "{$this->pass}", "{$this->db}");

                if($this->conn->connect_error) {
                    echo json_encode(array('error1' => 1));
                    $this->conn->close();
                    exit();
                } 

                $sql = "SELECT COUNT(`post_id`) FROM `posts` WHERE `title` LIKE '%$request%' OR `text` LIKE '%$request%';";
                $count = $this->conn->query($sql);
                $count = $count->fetch_array(MYSQLI_NUM);

                $max = floor($count[0] / 10) + 1;
                if($count[0] % 10 == 0) 
                    $max--;
                
                $remainder = $count[0] % 10;
                if($current != $max)
                    $remainder = 10;
                    
                $lim_lower = ($current-1)*10;
                $lim_upper = $current*10;

                $sql = "SELECT * FROM `posts` WHERE `title` LIKE '%$request%' OR `text` LIKE '%$request%' ORDER BY `post_id` DESC LIMIT $lim_lower, $lim_upper;";
                $result = $this->conn->query($sql);

                $array = array();
                foreach($result as $row) {
                    $id = $row['author_id'];
                    $sql = "SELECT * FROM `users` WHERE `id` = '$id';";
                    $author_result = $this->conn->query($sql);
                    $author_result = $author_result->fetch_array(MYSQLI_ASSOC);

                    $array[] = array(
                        'post_id' => $row['post_id'], 
                        'post_cat' => $row['category'], 
                        'post_title' => $row['title'], 
                        'post_date' => $row['date'], 
                        'post_img' => base64_encode($row['image']),

                        'user_name' => $author_result['name'], 
                        'user_email'=> $author_result['email'], 
                        'user_date' => $author_result['date'], 
                        'user_img' => base64_encode($author_result['images']),

                        'links_count' => $max, 
                        'posts_count' => $remainder
                    );                          
                }

                if(!$array[0]) {
                    echo json_encode(array('error3' => 3));
                    $this->conn->close();
                    exit();
                }

                echo json_encode($array);

                $this->conn->close();
            }
            else {
                echo json_encode(array('error2' => 2));
                exit();
            }
        }

        //відсилає 10 рецептів з однієї категорії
        function get_category_list($category, $current) { 
            if( $category ) {
                $this->conn = new mysqli("{$this->host}", "{$this->name}", "{$this->pass}", "{$this->db}");

                if($this->conn->connect_error) {
                    echo json_encode(array('error1' => 1));
                    $this->conn->close();
                    exit();
                } 

                $sql = "SELECT COUNT(`post_id`) FROM `posts` WHERE `category` = '$category';";
                $count = $this->conn->query($sql);
                $count = $count->fetch_array(MYSQLI_NUM);

                $max = floor($count[0] / 10) + 1;
                if($count[0] % 10 == 0) 
                    $max--;
                
                $remainder = $count[0] % 10;
                if($current != $max)
                    $remainder = 10;
                    
                $lim_lower = ($current-1)*10;
                $lim_upper = $current*10;

                $sql = "SELECT * FROM `posts` WHERE `category`= $category ORDER BY `post_id` DESC  LIMIT $lim_lower, $lim_upper;";
                $result = $this->conn->query($sql);

                $array = array();
                foreach($result as $row) {

                    $id = $row['author_id'];
                    $sql = "SELECT * FROM `users` WHERE `id` = '$id';";
                    $author_result = $this->conn->query($sql);
                    $author_result = $author_result->fetch_array(MYSQLI_ASSOC);

                    $array[] = array(
                        'post_id' => $row['post_id'], 
                        'post_cat' => $row['category'], 
                        'post_title' => $row['title'], 
                        'post_date' => $row['date'], 
                        'post_img' => base64_encode($row['image']),

                        'user_name' => $author_result['name'], 
                        'user_email'=> $author_result['email'], 
                        'user_date' => $author_result['date'], 
                        'user_img' => base64_encode($author_result['images']),

                        'links_count' => $max, 
                        'posts_count' => $remainder
                    );             
                }

                if(!$array[0]) {
                    echo json_encode(array('error3' => 3));
                    $this->conn->close();
                    exit();
                }

                echo json_encode($array);

                $this->conn->close();
            }
            else {
                echo json_encode(array('error2' => 2));
                exit();
            }
        }

        // < ------------------------------------------------------------------------------------------- >

        function get__receipt($id) { 
            if( $id ) {
                $this->conn = new mysqli("{$this->host}", "{$this->name}", "{$this->pass}", "{$this->db}");

                if($this->conn->connect_error) {
                    echo json_encode(array('error1' => 1));
                    $this->conn->close();
                    exit();
                } 

                $sql = "SELECT * FROM `posts` WHERE `post_id` = '$id';";
                $result = $this->conn->query($sql);

                if(!$result) {
                    echo json_encode(array('error3' => 3));
                    $this->conn->close();
                    exit();
                }

                $array = array();
                $result = $result->fetch_array(MYSQLI_ASSOC);

                $author_id = $result['author_id'];
                $sql = "SELECT * FROM `users` WHERE `id` = '$author_id';";
                $author_result = $this->conn->query($sql);
                $author_result = $author_result->fetch_array(MYSQLI_ASSOC);

                $array = array(
                    'post_title' => $result['title'], 
                    'post_txt' => $result['text'],
                    'post_img' => base64_encode($result['image']),

                    'user_name' => $author_result['name'], 
                    'user_email'=> $author_result['email'], 
                    'user_date' => $author_result['date'], 
                    'user_img' => base64_encode($author_result['images'])
                );                        
                

                if(!$array) {
                    echo json_encode(array('error3' => 3));
                    $this->conn->close();
                    exit();
                }

                echo json_encode($array);

                $this->conn->close();
            }
            else {
                echo json_encode(array('error2' => 2));
                exit();
            }
        }

        function get_random_3() { 
            $this->conn = new mysqli("{$this->host}", "{$this->name}", "{$this->pass}", "{$this->db}");

            if($this->conn->connect_error) {
                echo json_encode(array('error1' => 1));
                $this->conn->close();
                exit();
            } 

            $sql = "SELECT MIN(`post_id`) FROM `posts`;";
            $result = $this->conn->query($sql);
            $result = $result->fetch_array(MYSQLI_NUM);
            $min = $result[0];
            
            $sql = "SELECT MAX(`post_id`) FROM `posts`;";
            $result = $this->conn->query($sql);
            $result = $result->fetch_array(MYSQLI_NUM);
            $max = $result[0];

            $array = array();
            for ($i = 0; $i<3; $i++) {
                $id = rand($min, $max);
                $sql = "SELECT `post_id`, `title`, `image` FROM `posts` WHERE `post_id` = $id;";
                $result = $this->conn->query($sql);
                $result = $result->fetch_array(MYSQLI_ASSOC);

                $array[] = array($result['post_id'], $result['title'], base64_encode($result['image']));                        
            }

            if(!$array[0][0]) {
                echo json_encode(array('error3' => 3));
                $this->conn->close();
                exit();
            }

            echo json_encode($array);

            $this->conn->close();
        }
    }

    $object = new Data("192.168.1.66", "Myron1", "password", "domingodonut");
?>

