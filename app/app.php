<?php
    date_default_timezone_set('America/Los_Angeles');
    require_once __DIR__."/../vendor/autoload.php";
    require_once __DIR__."/../src/Box.php";
    require_once __DIR__."/../src/Score.php";
    require_once __DIR__."/../src/GameState.php";

    $app = new Silex\Application();

    $server = 'mysql:host=localhost:8889;dbname=color_clicker';
    $username = 'root';
    $password = 'root';
    $DB = new PDO($server, $username, $password);

    $app->register(new Silex\Provider\TwigServiceProvider(), array('twig.path' => __DIR__.'/../views'));

    $app['debug'] = true;

    use Symfony\Component\HttpFoundation\Request;
    Request::enableHttpMethodParameterOverride();

    $app->get("/", function() use ($app) {
      $new_state = new GameState();
      $new_state->save();
      $player_id = 1;
      $new_state->setPlayerId($player_id);

        return $app['twig']->render('home.html.twig', array('scores' => Score::getAll(), 'state_id' => $new_state->getId()));
    });

    $app->post("/add-score", function() use ($app) {
        $name = $_POST['player_name'];
        $score = $_POST['player_score'];
        $new_score = new Score($name, $score);
        $new_score->save();

        return $app['twig']->render('home.html.twig', array('scores' => Score::getAll()));
    });

    $app->delete("/delete_all", function() use ($app) {
        Score::deleteAll();

        return $app['twig']->render('home.html.twig', array('scores' => Score::getAll()));
    });

    return $app;
?>
