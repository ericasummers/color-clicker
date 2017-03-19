<?php
    class GameState
    {
        public $id;
        public $round;
        public $player_id;
        public $player_score;
        public $play_time;

        function __construct($round, $player_id, $player_score, $play_time, $id = null)
        {
            $this->round = $round;
            $this->player_id = $player_id;
            $this->player_score = $player_score;
            $this->play_time = $play_time;
            $this->id = $id;
        }

        function getRound()
        {
          return $this->round;
        }

        function setRound($round)
        {
          $this->round = (string) $round;
        }

        function getPlayerId()
        {
          return $this->player_id;
        }

        function setPlayerId($new_id)
        {
          $this->player_id = $new_id;
        }

        function getPlayerScore()
        {
          return $this->player_score;
        }

        function setPlayerScore($new_score)
        {
          $this->player_score = $new_score;
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

        }

        static function getAll()
        {

        }

        static function deleteAll()
        {
          $GLOBALS['DB']->exec("DELETE FROM game_states;");
        }

    }

?>
