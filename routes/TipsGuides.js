import {Router} from 'express';
const router = Router();

import {getTipsGuides, getAllTipsGuides, createTipsGuides} from '../data/TipsGuides.js';
import validation from '../validation.js';

router.route('/index').get(async (req, res) => {
  const TG = await getAllTipsGuides();
  res.render('TipsGuides/index', {TG: TG});
});
router
  .route('/')
  .get(async (req, res) => {
    try {
      const TGList = await getAllTipsGuides();
      res.render('TipsGuides/index', {TipsGuides: TGList});
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
      const TG = await getTipsGuides(req.params.id);
      res.render('TipsGuides/single', {TG: TG});
    } catch (e) {
      res.status(404).json({error: e});
    }
  })

  .post(async (req, res) => {
    const TipsGuidesData = req.body;
    let errors = [];
    try {
      TipsGuidesData.author = validation.checkString(TipsGuidesData.author, 'Author');
      console.log(typeof (TipsGuidesData));
    } catch (e) {
      errors.push(e);
    }

    try {
      TipsGuidesData.title = validation.checkString(TipsGuidesData.title, 'Title'); /////////////////////////////////////////////////////////////////
      console.log(typeof (TipsGuidesData));
    } 
    catch (e) {
      errors.push(e);
    }

    

    try {
      TipsGuidesData.text = validation.checkString(TipsGuidesData.text, 'Text');
      console.log(typeof (TipsGuidesData));
    } catch (e) {
      errors.push(e);
    }



    if (errors.length > 0) {
      res.render('TipsGuides/new', {
        errors: errors,
        hasErrors: true,
        TG: TipsGuidesData,
      });
      return;
    }

    try {
      const {author, title, text} = TipsGuidesData;
      const newTipsGuides = await createTipsGuides(author, title, text);
      res.redirect(`/TipsGuides/${newTipsGuides._id}`);
    } catch (e) {
      res.status(500).json({error: e});
    }
  })
  .put(async (req, res) => {
    res.send('ROUTED TO PUT ROUTE');
  });




  export default router;