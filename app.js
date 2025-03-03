import express from 'express';
const app = express();
import configRoutes from './routes/index.js';
import exphbs from 'express-handlebars';

import indexRouter from './routes/index.js'; ////////////
//import apiRouter from './routes/routesApi.js'; ////////////


//new
import session from 'express-session';
import router from './routes/auth_routes.js'
import { m1, m2, m3, m4, m5, m6 } from './middleware.js';

import routesApi from './routes/routesApi.js';

//import { seedDatabase } from './tasks/seed.js';

//new
app.use(session({
  name: 'AuthState',
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false
}));

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
  // If the user posts to the server with a property called _method, rewrite the request's method
  // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
  // rewritten in this middleware to a PUT route
  if (req.body && req.body._method) {
    req.method = req.body._method;
    delete req.body._method;
  }

  // let the next middleware run:
  next();
};

app.use('/public', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(rewriteUnsupportedBrowserMethods);

app.engine('handlebars', exphbs.engine({defaultLayout: 'main',

helpers: {
  asJSON: (obj, spacing) => {
    if (typeof spacing === 'number')
      return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

    return new Handlebars.SafeString(JSON.stringify(obj));
  },

  partialsDir: ['views/partials/']
}
}));

app.set('view engine', 'handlebars');

//new
app.use(m1);
app.use('/logout', m6);
app.use('/login', m2);
app.use('/register', m3);
app.use('/protected', m4);
app.use('/admin', m5);

app.use(express.static('public')); ///////////////////////////
//app.use('/api', apiRouter); ////////////////////////////
//indexRouter(app); /////////////////////////////

//import routesApi from './routes/routesApi.js';
app.use('/api', routesApi);

//seedDatabase().then(() => {

//new
app.use('/', router);
  configRoutes(app);

  

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});

//});