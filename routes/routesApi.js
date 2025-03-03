// Set-Up Routes

import { Router } from 'express';
const router = Router();
//import express from 'express';
import axios from 'axios';


router
  .route('/ajax')
  .get(async (req, res) => {
    //code here for GET to show static HTML file
    try {
    res.sendFile('static/webpage.html', { root: process.cwd() });
    } catch (error) {
      console.error('Error with static HTML file!', error);
      res.status(500).send("ISE");
    }
  });


  //retrieve the id and its info about the show based on that id
  router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Recieved show, ID is: ", id)
        const  { data } = await axios.get(`http://api.tvmaze.com/shows/${id}`);
        res.json(data);
    } catch (error) {
        console.error('Error with info from TV Maze!', error.message);
        res.status(500).json({error: 'ISE'});
    }
});


  export default router;