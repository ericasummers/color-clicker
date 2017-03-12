<?php

    /**
    * @backupGlobals disabled
    * @backupStaticAttributes disabled
    */

    require_once 'src/Score.php';

    $server = 'mysql:host=localhost:8889;dbname=color_clicker_test';
    $username = 'root';
    $password = 'root';
    $DB = new PDO($server, $username, $password);

    class ScoreTest extends PHPUnit_Framework_TestCase
    {
        protected function tearDown()
        {
            Score::deleteAll();
        }

        function test_saveAndGetAll()
        {
            $player_name = "Bob";
            $player_score = "10";
            $id = null;
            $new_game = new Score($player_name, $player_score, $id);
            $new_game->save();

            $result = Score::getAll();

            $this->assertEquals([$new_game], $result);
        }
    }


?>
