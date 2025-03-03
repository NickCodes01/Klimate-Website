import {Router} from 'express';
const router = Router();

import {getProjects, getAllProjects, createProjects} from '../data/projects.js';
import validation from '../validation.js';

router.route('/index').get(async (req, res) => {
  const project = await getAllProjects();
  res.render('projects/index', {project: project});
});
router
  .route('/')
  .get(async (req, res) => {
    try {
      const projectList = await getAllProjects();
      res.render('projects/index', {projects: projectList});
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
      const project = await getProjects(req.params.id);
      res.render('projects/single', {project: project});
    } catch (e) {
      res.status(404).json({error: e});
    }
  })

  .post(async (req, res) => {
    const projectsData = req.body;
    let errors = [];
    try {
      projectsData.projectName = validation.checkString(projectsData.projectName, 'Project Name');
    } catch (e) {
      errors.push(e);
    }

    try {
      projectsData.eventLocation = validation.checkString(projectsData.eventLocation, 'Event Location');
    } catch (e) {
      errors.push(e);
    }

    try {
      projectsData.eventDate = validation.checkString(projectsData.eventDate, 'Event Date');
    } catch (e) {
      errors.push(e);
    }

    try {
      projectsData.description = validation.checkString(projectsData.description, 'Description');
    } catch (e) {
      errors.push(e);
    }

    try {
      projectsData.link = validation.checkString(projectsData.link, 'Link');
    } catch (e) {
      errors.push(e);
    }



    if (errors.length > 0) {
      res.render('projects/new', {
        errors: errors,
        hasErrors: true,
        project: projectsData,
      });
      return;
    }

    try {
      const {projectName, eventLocation, eventDate, description, link} = projectsData;
      const newProjects = await createProjects(projectName, eventLocation, eventDate, description, link);
      res.redirect(`/projects/${newProjects._id}`);
    } catch (e) {
      res.status(500).json({error: e});
    }
  })
  .put(async (req, res) => {
    res.send('ROUTED TO PUT ROUTE');
  });



  export default router;