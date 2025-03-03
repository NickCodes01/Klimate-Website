import {Router} from 'express';
const router = Router();

import {getProducts, getAllProducts, createProducts} from '../data/products.js';
import validation from '../validation.js';
import { createProductReview } from '../data/productReviews.js';

router.route('/index').get(async (req, res) => {
  const product = await getAllProducts();
  res.render('products/index', {product: product});
});
router
  .route('/')
  .get(async (req, res) => {
    try {
      const productList = await getAllProducts();
      res.render('products/index', {products: productList});
    } catch (e) {
      res.status(500).json({error: e.message});
    }
  })

  router
  .route('/:id')
  .get(async (req, res) => {
    try {
      req.params.id = validation.checkId(req.params.id, 'Id URL Param');
    } catch (e) {
      return res.status(400).json({error: e});
    }
    try {
      const product = await getProducts(req.params.id);
      res.render('products/single', {product: product});
    } catch (e) {
      res.status(404).json({error: e});
    }
  })

  .post(async (req, res) => {
    const productsData = req.body;
    let errors = [];
    try {
      productsData.productName = validation.checkString(productsData.productName, 'Product Name');
    } catch (e) {
      errors.push(e);
    }

    try {
      productsData.description = validation.checkString(productsData.description, 'Description');
    } catch (e) {
      errors.push(e);
    }

   


    if (errors.length > 0) {
      res.render('products/new', {
        errors: errors,
        hasErrors: true,
        product: productsData,
      });
      return;
    }

    try {
      const {productName, description} = productsData;
      const newProducts = await createProducts(productName, description);
      res.redirect(`/products/${newProducts._id}`);
    } catch (e) {
      res.status(500).json({error: e});
    }
  })
  .put(async (req, res) => {
    res.send('ROUTED TO PUT ROUTE');
  });


  //---------------------------

  router.post('/:id/productReviews', async (req, res) => {
    const productId = req.params.id;
    const reviewData = req.body;
    try {
      const {title, reviewerName, review, rating} = reviewData;
      await createProductReview(productId, title, reviewerName, review, rating);
      res.redirect(`/products/${productId}`);
    } catch (e) {
      res.status(500).json({error: e})
    }
  });



  export default router;