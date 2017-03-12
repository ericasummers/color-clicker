<?php
    class Score
    {
        public $id;
        public $player_name;
        public $player_score;

        function __construct($player_name, $player_score, $id = null)
        {
            $this->player_name = $player_name;
            $this->player_score = $player_score;
            $this->id = $id;
        }

        function setName($new_name)
        {
            $this->player_name = $new_name;
        }

        function setScore($new_score)
        {
            $this->player_score = $new_score;
        }

        function save()
        {
            
        }

    }


?>
