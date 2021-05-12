const sequelize = require('../../config/connection');
const { User, Post, Comment } = require('../models');
const bcrypt = require('bcrypt');

const userSeedData = require('./userSeedData.json');
const postSeedData = require('./postSeedData.json');
const commentSeedData = require('./commentSeedData.json');
const { post } = require('../controllers/routes/api/blogPost-routes');

User.addHook('beforeBulkCreate', async (newUsers) => {
    encryptUsers = [];
    for (const newUser of newUsers) {
        newUser.password = await bcrypt.hash(newUser.password, 10);
        encryptUsers.push(newUser);
    }
    return encryptUsers;
});

const seedDatabase = async () => {
    try {
     
        await sequelize.sync({ force: true });
        // bulk create users
        const newUsersData = await User.bulkCreate(userSeedData);
        const newUsers = newUsersData.map((user) => user.get({ plain: true }));
        // map posts to random users
        const posts = postSeedData.map((post) => {
            const randUserId = newUsers[getRandomInt(newUsers.length)].id;
            return { ...post, userId: randUserId }
        });
        
        // bulk create posts
        const newPostsData = await Post.bulkCreate(posts);
        const newPosts = newPostsData.map((post) => post.get({ plain: true }));
        // map comments to random users and posts
        const comments = commentSeedData.map((comment) => {
            const randUserId = newUsers[getRandomInt(newUsers.length)].id;
            const randPostId = newPosts[getRandomInt(newPosts.length)].id;
            return { ...comment, userId: randUserId, postId: randPostId };
        })
        // bulk create comments
        const newCommentsData = await Comment.bulkCreate(comments);
        console.log(newCommentsData);

        process.exit(0);
        
    } catch (err) {
        console.log(err);
    }
    
};

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
};

seedDatabase();