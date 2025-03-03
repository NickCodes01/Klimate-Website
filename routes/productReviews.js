// Import the express router as shown in the lecture code
import {Router} from 'express';
const router = Router();
import {createProductReview, getProductReview, removeProductReview, updateProductReview, getAllProductReviews} from '../data/productReviews.js';
import {ObjectId} from 'mongodb';
// Note: please do not forget to export the router!

//-------------------------------------------------------------------------------------------------- .get

router
  .route('/:productId')
  .get(async (req, res) => {
    //code here for GET


       //try getting the post by ID
       try {
        const productReview1 = await getAllProductReviews(req.params.productId);
        return res.json(productReview1);
      } catch (e) {
        return res.status(400).json({e});
      }
    })


  //-------------------------------------------------------------------------------------------------- .post


  .post(async (req, res) => {
    //code here for POST

    //const { productId } = req.params;
    
    const reviewData = req.body;
    let errors = [];
    try {
      reviewData.title = validation.checkString(reviewData.title, 'Title');
    } catch (e) {
      errors.push(e);
    }

    try {
      reviewData.reviewerName = validation.checkString(reviewData.reviewerName, 'Reviewer Name');
    } catch (e) {
      errors.push(e);
    }

    try {
      reviewData.review = validation.checkString(reviewData.review, 'Review');
    } catch (e) {
      errors.push(e);
    }

    try {
      reviewData.rating = validation.checkNumber(reviewData.rating, 'Rating');
    } catch (error) {
      errors.push(e);
    }

  

    if (errors.length > 0) {
      res.render('products/new', {
        errors: errors,
        hasErrors: true,
        review: reviewData,
      });
      return;
    }

    try {
      const { title, reviewerName, review, rating } = reviewData;
     // const productId = req.params.productId;
      const newestReview = await createProductReview(title, reviewerName, review, rating);
       return res.json(newestReview);
     } catch (e) {
       return res.status(400).json(e);
     }
   })


//-------------------------------------------------------------------------------------------------- .get
 

router
  .route('/productReview/:reviewId')
  .get(async (req, res) => {
    //code here for GET


    try {
      const review = await getProductReview(req.params.reviewId);
      return res.json(review);
    } catch (e) {
        //lecture code and live session says to use .json below, not .send 
      return res.status(400).json(e);
    }
  })


//-------------------------------------------------------------------------------------------------- .patch


  .patch(async (req, res) => {
    //code for PATCH

  

  try{
    const { title, reviewerName, review, rating } = req.body;
    const updateObject = {};

if (title !== undefined) updateObject.title = title;
if (reviewerName !== undefined) updateObject.reviewerName = reviewerName;
if (review !== undefined) updateObject.review = review;
if (rating !== undefined) updateObject.rating = rating;

    const reviewId = req.params.reviewId;


    const updatedReview = await updateProductReview(reviewId, updateObject);
    return res.json(updatedReview);
   } catch (e) {
    //lecture code and live session says to use .json below, not .send
  return res.status(400).json(e);
}
    })


//-------------------------------------------------------------------------------------------------- .delete


  .delete(async (req, res) => {
    //code here for DELETE


    try {
      let deletedProduct = await removeProductReview(req.params.reviewId);
      return res.json(deletedProduct);
    } catch (e) {
      return res.status(400).json({error: e});
    }
})


//--------------------------------------------------------------------------------------------------

  export default router;


  