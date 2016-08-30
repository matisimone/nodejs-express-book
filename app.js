var express = require('express');

var app = express();

// set up handlebars view engine
handlebars = require('express3-handlebars').create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

/*The static middleware allows you to designate one or more directories as containing
static resources that are simply to be delivered to the client without any special handling.
This is where you would put things like images, CSS files, and client-side JavaScript files.
This subdirectory is called public (we call it public because
anything in this directory will be served to the client without question).*/
app.use(express.static(__dirname + '/public'));

/*app.get is the method by which we’re adding routes.
This method takes two parameters: a path and a function.
The path is what defines the route.
The function you provide will get invoked when the route is matched. The parameters
passed to that function are the request and response objects.*/
app.get('/', function (req, res) {
    /*For now, we’re just returning plaintext with a status code of 200
    (Express defaults to a status code of 200—you don’t have to specify it explicitly).*/
    //res.type('text/plain');
    //res.send('Home Page');

    // with handlebars
    res.render('home');
});

app.get('/about', function (req, res) {
    // res.type sets the Content-Type header
    /*res.type('text/plain');
    res.send('About Page');*/
    var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', { fortune: randomFortune });
});

// custom 404 page
/*app.use is the method by which Express adds middleware.
You can think of this as a catch-all handler for anything that didn’t get matched by a
route. This brings us to a very important point: in Express, the order in which routes and
middleware are added is significant. If we put the 404 handler above the routes, the home
page and About page would stop working: instead, those URLs would result in a 404.*/
app.use(function (req, res, next) {
    res.status(404);
    res.render('404');
});

// custom 500 page
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

var fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
];