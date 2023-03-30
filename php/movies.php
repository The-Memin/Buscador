<?php
require('conexion.php');

$movies = array();

class Movie{
    public $id = "";
    public $title = "";
    public $ranking = "";
    public $year = "";
    public $gender = "";
    public $duration = "";
    public $url = "";

    public function __construct($id, $title, $ranking, $year, $gender, $duration, $url){
        $this->id = $id;
        $this->title = $title;
        $this->ranking = $ranking;
        $this->year = $year;
        $this->gender = $gender;
        $this->duration = $duration;
        $this->url = $url;
    }
}

$records = $conn->prepare("SELECT * FROM movies WHERE 1");
if ($records->execute()) {
    $results = $records->fetchAll(PDO::FETCH_CLASS);
    count($results);

    foreach ($results as $row) {
        $id = $row->id;
        $title = $row->title;
        $ranking = $row->ranking;
        $year = $row->year;
        $gender = $row->gender;
        $duration = $row->duration;
        $url= $row->url;
        $movie = json_encode(new Movie($id, $title, $ranking, $year, $gender, $duration, $url));
        array_push($movies, $movie);
    }
    echo json_encode(array('success' => 1, 'movies' => $movies));
}else{
    echo json_encode(array('success' => 0));
}

?>