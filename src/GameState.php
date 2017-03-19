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
          $GLOBALS['DB']->exec("INSERT INTO game_states (round, player_id, player_score, play_time) VALUES ('{$this->round}', {$this->player_id}, {$this->player_score}, {$this->play_time});");
          $this->id = $GLOBALS['DB']->lastInsertId();
        }

        static function getAll()
        {
          $returned_states = $GLOBALS['DB']->query("SELECT * FROM game_states;");
          $all_states = [];
          foreach($returned_states as $state) {
            $round = $state['round'];
            $player_id = $state['player_id'];
            $player_score = $state['player_score'];
            $play_time = $state['play_time'];
            $id = $state['id'];
            $new_state = new GameState($round, $player_id, $player_score, $play_time, $id);
            array_push($all_states, $new_state);
          }
          return $all_states;
        }

        static function deleteAll()
        {
          $GLOBALS['DB']->exec("DELETE FROM game_states;");
        }

        static function find($player_id)
        {
          $found_state = [];
          $result = $GLOBALS['DB']->query("SELECT * FROM game_states WHERE player_id = {$player_id};");
          foreach($result as $state) {
            $round = $state['round'];
            $player_id = $state['player_id'];
            $player_score = $state['player_score'];
            $play_time = $state['play_time'];
            $id = $state['id'];
            $new_state = new GameState($round, $player_id, $player_score, $play_time, $id);
            array_push($found_state, $new_state);
          }
          return $found_state;
        }

    }

?>
