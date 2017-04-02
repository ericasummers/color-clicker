<?php
    class GameState
    {
        public $id;
        public $round;
        public $total_score;
        public $play_time;

        function __construct($play_time = 0, $round = 1, $total_score = 0, $id = null)
        {
            $this->round = $round;
            $this->total_score = $total_score;
            $this->play_time = $play_time;
            $this->id = $id;
        }

        function getRound()
        {
          return $this->round;
        }

        function setRound($round)
        {
          $this->round = $round;
        }

        function getTotalScore()
        {
          return $this->total_score;
        }

        function setTotalScore($new_score)
        {
          $this->total_score = $new_score;
        }

        function getPlayTime()
        {
          return $this->play_time;
        }

        function setPlayTime($new_time)
        {
          $this->play_time = $new_time;
        }

        function getId()
        {
          return $this->id;
        }

        function save()
        {
          $GLOBALS['DB']->exec("INSERT INTO game_states (round, total_score, play_time) VALUES ({$this->round}, {$this->total_score}, {$this->play_time});");
          $this->id = $GLOBALS['DB']->lastInsertId();
        }

        static function getAll()
        {
          $returned_states = $GLOBALS['DB']->query("SELECT * FROM game_states;");
          $all_states = [];
          foreach($returned_states as $state) {
            $play_time = $state['play_time'];
            $round = $state['round'];
            $total_score = $state['total_score'];
            $id = $state['id'];
            $new_state = new GameState($play_time, $round, $total_score, $id);
            array_push($all_states, $new_state);
          }
          return $all_states;
        }

        static function deleteAll()
        {
          $GLOBALS['DB']->exec("DELETE FROM game_states;");
        }

        static function find($id)
        {
          $found_state = null;
          $result = $GLOBALS['DB']->query("SELECT * FROM game_states WHERE id = {$id};");
          foreach($result as $state) {
            $play_time = $state['play_time'];
            $round = $state['round'];
            $total_score = $state['total_score'];
            $id = $state['id'];
            $found_state = new GameState($play_time, $round, $total_score, $id);
          }
          return $found_state;
        }

    }

?>
