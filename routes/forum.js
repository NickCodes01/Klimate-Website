// Import the express router as shown in the lecture code
import {Router} from 'express';
const router = Router();
import {createForum, getForum, removeForum, updateForum, getAllForum} from '../data/forum.js';
//import {businessData} from '../data/index.js';
import validation from '../validation.js';
import { createReview } from '../data/reviews.js';

router.route('/new').get(async (req, res) => {
  const forum = await getAllForum();
  res.render('forums/new', {forum: forum});
});
router
  .route('/')
  .get(async (req, res) => {
    try {
      const forumList = await getAllForum();
      res.render('forums/index', {forums: forumList});
    } catch (e) {
      res.status(500).json({error: e.message});
    }
  })
  .post(async (req, res) => {
    const forumData = req.body;
    let errors = [];
   
    try {
      forumData.userId = validation.checkString(forumData.userId, 'Username');
    } catch (e) {
      errors.push(e);
    }

    try {
      forumData.text = validation.checkString(forumData.text, 'Text');
    } catch (e) {
      errors.push(e);
    }


    if (errors.length > 0) {
      res.render('forums/index', {
        errors: errors,
        hasErrors: true,
        forum: forumData,
      });
      return;
    }

    try {
      const {userId, text} = forumData;
      const newForum = await createForum(userId, text);
      res.redirect(`/forums/${newForum._id}`);
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
      const forum = await getForum(req.params.id);
      res.render('forums/single', {forum: forum});
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
      const userId = req.body.userId;
      let deletedForum = await removeForum(userId);
      res.status(200).json(deletedForum);
    } catch (e) {
      let status = e[0];
      let message = e[1];
      res.status(status).json({error: message});
    }
  });

  // router.post('/:id/reviews', async (req, res) => {
  //   const businessId = req.params.id;
  //   const reviewData = req.body;
  //   try {
  //     const {title, reviewerName, review, rating} = reviewData;
  //     await createReview(businessId, title, reviewerName, review, rating);
  //     res.redirect(`/businesses/${businessId}`);
  //   } catch (e) {
  //     res.status(500).json({error: e})
  //   }
  // });


export default router;