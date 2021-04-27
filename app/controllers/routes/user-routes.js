const router = require('express').Router();
const { User } = require('../../models');
// TODO: require auth middleware

// /user

// Create a user
router.post('/register', (req, res) => {
    // TODO
});

// Login a user
router.post('/login', (req, res) => {
    // TODO
});

// Logout a user
router.post('/logout', (req, res) => {
    // TODO
});

// Read all blog posts by user
router.get('/:username/posts', auth, (req, res) => {
    // TODO
});

module.exports = router;


