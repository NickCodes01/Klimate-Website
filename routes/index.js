// import businessRoutes from './businesses.js';
// import userRoutes from './users.js';


import businessRoutes from './businesses.js';
import reviewsRoutes from './reviews.js';
import userRoutes from './users.js';
import projectsRoutes from './projects.js';
import TipsGuidesRoutes from './TipsGuides.js';
import forumRoutes from './forum.js';
import productsRoutes from './products.js';
import productReviewsRoutes from './productReviews.js';
import calculatorRoutes from './calculator.js';



import router from './routesApi.js'; ////////////////////


import path from 'path';
import {static as staticDir} from 'express';

// const __dirname = path.dirname(new URL(import.meta.url).pathname);

const constructorMethod = (app) => {
  app.use('/businesses', businessRoutes);
  app.use('/users', userRoutes);
  //app.get('/about', (req, res);
  app.use('/reviews', reviewsRoutes);
  app.use('/projects', projectsRoutes);
  app.use('/TipsGuides', TipsGuidesRoutes);
  app.use('/forums', forumRoutes);
  app.use('/products', productsRoutes);
  app.use('/productReviews', productReviewsRoutes); 
  app.use('/calculator', calculatorRoutes);
  app.use('/public', staticDir('public'));

  app.use('/ajax', router); ///////////////////////////

  app.use((req, res, next) => {
    const {path} = req;
    if (
      path.startsWith('/businesses') ||
      path.startsWith('/users') ||
      path.startsWith('/reviews') ||
      path.startsWith('/projects') ||
      path.startsWith('/TipsGuides') ||
      path.startsWith('/forum') ||
      path.startsWith('/products') ||
      path.startsWith('/productReviews') ||
      path.startsWith('/calculator') ||
      path.startsWith('/public') ||

      path.startsWith('/ajax') /////////////////////////

    ) {
      next();
    } else {
      res.status(404).render('error', {message: 'Page cannot be found!'});
    }
  });
  //uncomment
// app.get('/', (req, res) => {
//   res.render('welcome')
// });

///////////////////////////////////////////////////////////////////////////////////////
app.use('/ajax', (req, res) => {
  try {
    res.sendFile(path.resolve('static', 'webpage.html'));
  } catch (error) {
    console.error('Error sending static file', error);
    res.status(500).send('ISE!');
  }
});
////////////////////////////////////////////////////////////////////////////////

  // app.use('*', (req, res) => {
  //   res.redirect('/forum'); ////////////////////////
  //   //res.status(404).render('error', {message: 'Page cannot be found!'});
  // });

};

export default constructorMethod;