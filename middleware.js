/*
You can choose to define all your middleware functions here, 
export them and then import them into your app.js and attach them that that.
add.use(myMiddleWare()). you can also just define them in the app.js if you like as seen in lecture 10's lecture code example. If you choose to write them in the app.js, you do not have to use this file. 
*/



//===============

export const m1 = (req, res, next) => {
    const timestamp = new Date().toUTCString();
    const method = req.method;
    const route = req.originalUrl;
    const isAuthenticated = req.session.user ? true : false;
    const role = isAuthenticated ? req.session.user.role : 'Non-Authenticated User';
    
    
    //log
    console.log(`[${timestamp}]: ${method} ${route} (${role})`);
    
    if (isAuthenticated) {
        if (route === '/logout') {
            req.session.destroy((err) => {
                if (err) {
                    console.error('EDS', err);
                    return res.status(500).json({error: 'ISE'});
                }
                console.log("Logged out!!!");
                return res.render('logout');
            });
        }
        else {
            next();
        }
    }
    else { 
        if (route === '/register' || route === '/login') {
            next();
        }
        else {
            return res.redirect('/login');
        }
       
    }
};


//-----------------------------------------------------------------------------

export const m2 = (req, res, next) => {

if (req.session.user) {
    return res.redirect('/');
}
else {
    next();
}
};

//-----------------------------------------------------------------------------

export const m3 = (req, res, next) => {

    if (req.session.user) {
       
        return res.redirect('/');
        }
        else {
            next();
        }
        };
    
//-----------------------------------------------------------------------------

export const m4 = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    } 
    else {
   return next();  
    }
};

//-----------------------------------------------------------------------------

export const m5 = (req, res, next) => {

 if (!req.session.user || req.session.user.role !== 'admin') {
    return res.status(403).render('error', { message: 'No permission' });
}
else {
next();
}
};



//-----------------------------------------------------------------------------

export const m6 = (req, res, next) => {
    console.log('Middleware called!')
     if (!req.session.user) {
        console.log("user not logged in!")
        return res.redirect('/login');
        
    } 
    else {
        console.log("user is logged in!")
        next();  
    }
    
};

