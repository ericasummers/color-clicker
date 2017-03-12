<?php

    class Box
    {
        public $id;
        public $color;
        public $shape;
        public $time;
        public $points;

        function __construct($color, $shape, $time, $points, $id = null)
        {
            $this->color = $color;
            $this->shape = $shape;
            $this->time = $time;
            $this->points = $points;
            $this->id = $id;
        }

        function save()
        {
            $GLOBALS['DB']->exec("INSERT INTO boxes (color, shape, view_time, points) VALUES ('{$this->color}', '{$this->shape}', {$this->time}, {$this->points});");
            $this->id = $GLOBALS['DB']->lastInsertId();
        }

        static function getAll()
        {
            $returned_boxes = $GLOBALS['DB']->query("SELECT * FROM boxes ORDER BY color;");
            $all_boxes = array();
            foreach($returned_boxes as $box) {
                $color = $box['color'];
                $shape = $box['shape'];
                $time = $box['view_time'];
                $points = $box['points'];
                $id = $box['id'];
                $new_box = new Box($color, $shape, $time, $points, $id);
                array_push($all_boxes, $new_box);
            }
            return $all_boxes;
        }

        static function deleteAll()
        {
            $GLOBALS['DB']->exec("DELETE FROM boxes;");
        }


    }

?>
