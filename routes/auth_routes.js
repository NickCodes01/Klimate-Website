//import express, express router as shown in lecture code
import express from 'express';

//import data functions
import { registerUser, loginUser } from '../data/users.js';

//import middleware functions
import { m1, m2, m3, m4, m5, m6 } from '../middleware.js';

const router = express.Router();

const nowDate = new Date();
const m = (nowDate.getMonth() + 1).toString().padStart(2, '0');
const d = nowDate.getDate().toString().padStart(2, '0');
const y = nowDate.getFullYear();
const reviewDate = `${m}/${d}/${y}`;

//middleware
router.use(m1);

router.route('/').get(async (req, res) => {
 
  try {
    if (req.session.user) {
      if (req.session.user.role === 'admin') {
        return res.redirect('/admin');
      }
     
      else {
       return res.redirect('/protected');
      }
    }
    else {
      return res.redirect('/login');
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({error: 'Internal Server Error!'});
  }
});


//-------------------------------------------------------------------------------


//middleware
router.use('/register', m3);


router
  .route('/register')
  .get(async (req, res) => {
    //code here for GET
    try{
    res.render('register');
    } catch (error) {
      res.status(400).json({error: 'Error!'});
    }


    })


//-------------------------------------------------------------------------------


  .post(async (req, res) => {
    //code here for POST
    try {
      const { firstName, lastName, emailAddress, password, role } = req.body;
    const result = await registerUser(firstName, lastName, emailAddress, password, role);
    if (result && result.insertedUser === true) {
      return res.redirect('/login');
    }
    const valid = /^[a-zA-Z]/;


if (!firstName || !lastName || !emailAddress || !password || !role) {
  return res.status(400).render('register', { error: 'All fields needed!' });
}
if (typeof firstName !== 'string' || !valid || firstName.length < 2 || firstName.length > 25) {
  return res.status(400).render('register', { error: 'Invalid input firstName!' });
}
if (typeof lastName !== 'string' || !valid || lastName.length < 2 || lastName.length > 25) {
  return res.status(400).render('register', { error: 'Invalid input lastName!' });
}
//for emailAddress
if (!/^\S+@\S+\.\S+$/.test(emailAddress)) {
  return res.status(400).render('register', { error: 'Invalid email!' });
}
//for password (uppercase(A-Z), lowercase(a-z), num(d) and non-word char(W))
if (password.length < 8 || !/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)/.test(password)) {
  return res.status(400).render('register', { error: 'Invalid password!' });
}
//make sure user email is not already in use
const already = await usersCollection.findOne({ emailAddress: emailAddress.toLowerCase() });
if (already) {
  return res.status(400).render('register', { error: "Email already in use!" });
}
//role is either admin or user, that's it
if (role.toLowerCase() !== 'admin' && role.toLowerCase() !== 'user') {
  return res.status(400).render('register', { error: 'Role must be either admin or user!' });
}


    else {
      return res.status(400).render('register', { error: "Error!" });
    }
    } catch (error) {
      console.log(error);
      return res.status(400).render('register', { error: "Error! Invalid Input!" });
    }
   
  })


//-------------------------------------------------------------------------------


//middleware
router.use('/login', m2);


router
  .route('/login')
  .get(async (req, res) => {
    //code here for GET
    try {
      res.render('login', {registrationLink: '/register'});
    } catch (error) {
      res.status(400).json({error: 'Error!'});
    }
   
  })


//-------------------------------------------------------------------------------


  .post(async (req, res) => {
    //code here for POST
    try {
      const {emailAddress: emailAddress, password: password} = req.body;
      if (!emailAddress || !password) {
        return res.status(400).render('login', {error: 'Email or password error!!'})
      }
      const em = /^\S+@\S+\.\S+$/;
      if (!em.test(emailAddress)) {
        return res.status(400).render('login', {error: "Invalid email format!!"})
      }
      const pa = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)/;
      if (!pa.test(password)) {
        return res.status(400).render('login', {error: "Invalid password format!!"})
      }


      const user = await loginUser(emailAddress, password);


      if (!user) {
        return res.status(400).render('login', {error: "Invalid email or password!!"})
      }


      req.session.user = {
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
        role: user.role
      };


      console.log("User logged in:", req.session.user);


      if (user.role === 'admin') {
        return res.redirect('/admin');
      }
      else {
        return res.redirect('/protected');
      }
    } catch (error) {
      res.status(400).render('login', {error: 'Error: Either the email address or password is invalid'});
    }
  });


//-------------------------------------------------------------------------------  


//middleware
router.use('/protected', m4);


router.route('/protected').get(async (req, res) => {
  //code here for GET
  try {
    if (!req.session.user) {
      return res.redirect('/login');
    }
    const AD = req.session.user.role === 'admin';

//console.log('User:', req.session.user);

    res.render('protected', {
    //   firstName: req.session.user.firstName,
    //   lastName: req.session.user.lastName,
      user: req.session.user,
    //   currentTime: new Date().toLocaleString(),
    currentTime: reviewDate,
      role: req.session.user.role,
      //this is so we can return to the admin route from the protected route
      AD: AD
    });
  } catch (error) {
    res.status(400).json({error: 'Error!'})
  }
});




//-------------------------------------------------------------------------------


//middleware
router.use('/admin', m5);


router.route('/admin').get(async (req, res) => {
  //code here for GET
  try {
    if (!req.session.user || req.session.user.role !== 'admin') {
      return res.status(403).send('Forbidden');
    }
    res.render('admin', {
      user: req.session.user,
    //   currentTime: new Date().toLocaleString()
    currentTime: reviewDate
    });
  } catch (error) {
    res.status(400).json({error: 'Error!'})
  }
});


//-------------------------------------------------------------------------------


router.route('/error').get(async (req, res) => {
  //code here for GET
  try {
    res.status(404).render('error', { message: 'Page Not Found!' });
  } catch (error) {
    res.status(400).json({error: 'Page not found!'});
  }
});


//-------------------------------------------------------------------------------


router.get('/logout', async (req, res) => {
  try {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session', err);
      return res.status(400).json({ error: 'Internal error'});
    }
    console.log('User logged out successfully');
    return res.redirect('/login');
  });
} catch (error) {
  console.error('Error logging out:', error);
  return res.status(400).json({error: 'Internal error'});
}
});






export default router;

