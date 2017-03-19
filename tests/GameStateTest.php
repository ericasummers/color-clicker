<?php

    /**
    * @backupGlobals disabled
    * @backupStaticAttributes disabled
    */

    require_once 'src/GameState.php';

    $server = 'mysql:host=localhost:8889;dbname=color_clicker_test';
    $username = 'root';
    $password = 'root';
    $DB = new PDO($server, $username, $password);

    class GameStateTest extends PHPUnit_Framework_TestCase
    {
      protected function tearDown()
      {
        GameState::deleteAll();
      }

      function test_saveAndGetAll()
      {
        $round = '1';
        $player_id = 3;
        $player_score = 7;
        $play_time = 50;
        $new_gameState = new GameState($round, $player_id, $player_score, $play_time);
        $new_gameState->save();

        $result = GameState::getAll();

        $this->assertEquals([$new_gameState], $result);
      }

      function test_find()
      {
        $round = '1';
        $player_id = 3;
        $player_score = 7;
        $play_time = 50;
        $new_gameState = new GameState($round, $player_id, $player_score, $play_time);
        $new_gameState->save();

        $round2 = '1';
        $player_id2 = 5;
        $player_score2 = 11;
        $play_time2 = 50;
        $new_gameState2 = new GameState($round2, $player_id2, $player_score2, $play_time2);
        $new_gameState2->save();

        $result = GameState::find($new_gameState2->player_id);

        $this->assertEquals([$new_gameState2], $result);
      }
    }

?>
