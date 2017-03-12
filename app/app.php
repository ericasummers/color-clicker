<?php
    date_default_timezone_set('America/Los_Angeles');
    require_once __DIR__."/../vendor/autoload.php";
    require_once __DIR__."/../src/Box.php";
    require_once __DIR__."/../src/Score.php";

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
        $blank_form = array();

        return $app['twig']->render('home.html.twig', array('stylists' => Stylist::getAll()));
    });

    $app->post("/add-stylist", function() use ($app) {
        $name = $_POST['name'];
        $specialty = $_POST['specialty'];
        $blank_form = array();
        if (!$name || !$specialty) {
            array_push($blank_form, "empty");
        } else {
            $new_stylist = new Stylist($name, $specialty);
            $new_stylist->save();
        }
        return $app['twig']->render('home.html.twig', array('stylists' => Stylist::getAll(), 'blank_form' => $blank_form));
    });

    return $app;
?>
