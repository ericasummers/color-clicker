<?php

    /**
    * @backupGlobals disabled
    * @backupStaticAttributes disabled
    */

    require_once 'src/Box.php';
    require_once 'src/Score.php';

    $server = 'mysql:host=localhost:8889;dbname=color_clicker_test';
    $username = 'root';
    $password = 'root';
    $DB = new PDO($server, $username, $password);

    class BoxTest extends PHPUnit_Framework_TestCase
    {
        protected function tearDown()
        {
            Box::deleteAll();
            Score::deleteAll();
        }

        function test_saveAndGetAll()
        {
            $color = 'red';
            $shape = 'square';
            $time = 1500;
            $points = 2;
            $id = null;
            $new_box = new Box($color, $shape, $time, $points);
            $new_box->save();

            $result = Box::getAll();

            $this->assertEquals([$new_box], $result);
        }

    }

?>
