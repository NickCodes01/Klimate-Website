// Import the express router as shown in the lecture code
import {Router} from 'express';
const router = Router();
import {createReview, getReview, removeReview, updateReview, getAllReviews} from '../data/reviews.js';
//import {businessData} from '../data/index.js';
import validation from '../validation.js';

router.route('/new').get(async (req, res) => {
  const review = await getAllReviews();
  // const businessId = req.query.businessId;
  res.render('reviews/new', {review: review});
});
router
  .route('/')
  .get(async (req, res) => {
    try {
      const reviewList = await getAllReviews();
      res.render('reviews/index', {reviews: reviewList});
    } catch (e) {
      res.status(500).json({error: e.message});
    }
  })
  .post(async (req, res) => {
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
      res.render('reviews/new', {
        errors: errors,
        hasErrors: true,
        review: reviewData,
      });
      return;
    }

    try {
      const {title, reviewerName, review, rating} = reviewData;
      const newReview = await createReview(title, reviewerName, review, rating);
      res.redirect(`/reviews/${newReview._id}`); //////////////////////////////////////////////////////////////////////////////////////
    } catch (e) {
      res.status(500).json({error: e});
    }
  })
  .put(async (req, res) => {
    res.send('ROUTED TO PUT ROUTE');
  });

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      req.params.id = validation.checkId(req.params.id, 'Id URL Param');
    } catch (e) {
      return res.status(400).json({error: e});
    }
    try {
      const review = await getReview(req.params.id);
      res.render('reviews/single', {review: review});
    } catch (e) {
      res.status(404).json({error: e});
    }
  })

  .delete(async (req, res) => {
    try {
      req.params.id = validation.checkId(req.params.id, 'Id URL Param');
    } catch (e) {
      return res.status(400).json({error: e});
    }
    try {
      const reviewTitle = req.body.title;
      let deletedReview = await removeReview(reviewTitle);
      res.status(200).json(deletedReview);
    } catch (e) {
      let status = e[0];
      let message = e[1];
      res.status(status).json({error: message});
    }
  });


  
 


//--------------------------------------------------------------------------------------------------

   export default router;


  

