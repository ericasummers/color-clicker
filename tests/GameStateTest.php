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
    }

?>
