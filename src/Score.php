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
            $GLOBALS['DB']->exec("INSERT INTO scores (player_name, player_score) VALUES ('{$this->player_name}', '{$this->player_score}');");
            $this->id = $GLOBALS['DB']->lastInsertId();
        }

        static function getAll()
        {
            $all_scores = array();
            $returned_rounds = $GLOBALS['DB']->query("SELECT * FROM scores ORDER BY player_score;");
            foreach($returned_rounds as $round) {
                $name = $round['player_name'];
                $score = $round['player_score'];
                $id = $round['id'];
                $new_score = new Score($name, $score, $id);
                array_push($all_scores, $new_score);
            }
            return $all_scores;
        }

        static function deleteAll()
        {
            $GLOBALS['DB']->exec("DELETE FROM scores;");
        }

    }


?>
