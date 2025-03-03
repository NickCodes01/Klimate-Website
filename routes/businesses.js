import {Router} from 'express';
const router = Router();
//import {businessData} from '../data/index.js';
import {create, get, remove, update, getAll} from '../data/businesses.js';
import validation from '../validation.js';
import { createReview } from '../data/reviews.js';

router.route('/new').get(async (req, res) => {
  const business = await getAll();
  res.render('businesses/new', {business: business});
});
router
  .route('/')
  .get(async (req, res) => {
    try {
      const businessList = await getAll();
      res.render('businesses/index', {businesses: businessList});
    } catch (e) {
      res.status(500).json({error: e.message});
    }
  })
  .post(async (req, res) => {
    const businessData = req.body;
    let errors = [];
    try {
      businessData.businessName = validation.checkString(businessData.businessName, 'Name');
    } catch (e) {
      errors.push(e);
    }

    try {
      businessData.type = validation.checkString(businessData.type, 'Type');
    } catch (e) {
      errors.push(e);
    }

    try {
      businessData.address = validation.checkString(businessData.address, 'Address');
    } catch (e) {
      errors.push(e);
    }

    try {
      businessData.description = validation.checkString(businessData.description, 'Description');
    } catch (e) {
      errors.push(e);
    }

    try {
      businessData.link = validation.checkString(businessData.link, 'Website');
    } catch (e) {
      errors.push(e);
    }

    // try {
    //   businessData.phoneNumber = validation.checkString(businessData.phoneNumber, 'Phone Number');
    // } catch (e) {
    //   errors.push(e);
    // }

    if (errors.length > 0) {
      res.render('businesses/new', {
        errors: errors,
        hasErrors: true,
        business: businessData,
      });
      return;
    }

    try {
      const {businessName, type, address, description, link, phoneNumber} = businessData;
      const newBusiness = await create(businessName, type, address, description, link, phoneNumber);
      res.redirect(`/businesses/${newBusiness._id}`);
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
      const business = await get(req.params.id);
      res.render('businesses/single', {business: business});
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
      const businessName = req.body.businessName;
      let deletedBusiness = await remove(businessName);
      res.status(200).json(deletedBusiness);
    } catch (e) {
      let status = e[0];
      let message = e[1];
      res.status(status).json({error: message});
    }
  });

  router.post('/:id/reviews', async (req, res) => {
    const businessId = req.params.id;
    const reviewData = req.body;


    // if (!reviewData || typeof reviewData !== 'object') { ////////
    //   throw new Error('Invalid review data'); //////////
    // }
//-----------------------
    // let errors = [];
    // try {
    //   reviewData.title = validation.checkString(reviewData.title, 'Title');
    // } catch (e) {
    //   errors.push(e);
    // }

    // try {
    //   reviewData.reviewerName = validation.checkString(reviewData.reviewerName, 'Reviewer Name');
    // } catch (e) {
    //   errors.push(e);
    // }

    // try {
    //   reviewData.review = validation.checkString(reviewData.review, 'Review');
    // } catch (e) {
    //   errors.push(e);
    // }

    // try {
    //   reviewData.rating = validation.checkNumber(reviewData.rating, 'Rating');
    // } catch (e) {
    //   errors.push(e);
    // }


    // if (errors.length > 0) {
    //   res.render('/businesses/single', {
    //     errors: errors,
    //     hasErrors: true,
    //     business: reviewData,
    //   });
    //   return;
    // }

    
    try {
      const {title, reviewerName, review, rating} = reviewData;

      // if (!title || !reviewerName || !review || !rating) { ////////
      //   throw new Error('Please provide all fields'); //////////
      // } //////////


      await createReview(businessId, title, reviewerName, review, rating);
      res.redirect(`/businesses/${businessId}`);
    } catch (e) {
      res.status(500).json({error: e})
    }
  })

////////////////////////////////////////////////////////
//   router.get('/:id/reviews', async (req, res) => {
//     try {
//         const businessId = req.params.id;
//         const reviews = await getAllReviews(businessId);
//        // console.log(reviews)
//         res.json(reviews);
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });
/////////////////////////////////////////////

  

 


export default router;