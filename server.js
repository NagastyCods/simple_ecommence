const express = require('express');
const path = require('path');
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieSession = require('cookie-session');
const { profile } = require('console');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));
// app.use(cookieSession({
//     name: 'session',
//     keys:[process.env.SESSION_SECRET],
//     maxAge: 24 * 60 * 60* 1000  // 1 day
// }));
// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser((user, done) => done(null, user));
// passport.deserializeUser((user, done) => done(null, user));

// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: '/auth/google/callback'


// }, (accessToken, refreshToken, profile, done) => {
//     return done(null, profile);
// }));

// redirect to Google for auth

// app.get('/auth/google',passport.authenticate('google', {
//     scope: ['profile', 'email']
// }));

// Google redirect here after Login
// app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/'}),
// (req,res)=>{
//     res.redirect('/dashboard');// redirect to user page
// }
// );

// protected dashboard

// app.get('/dashboard', (req, res) => {
//     if(!req.user) return res.redirect('/');
//     res.send(`<h1> Welcome ${req.user.displayName}</h1><p><a href="/logout">Logout</a></p>`);
// });
// app.get('/logout', (req,res) =>{
//     req.logout(() =>{
//         res.redirect('/');
//     });
// });


// Route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public',  'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});