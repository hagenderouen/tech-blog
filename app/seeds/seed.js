const sequelize = require('../../config/connection');
const { User, Post, Comment } = require('../models');

const userSeedData = require('./userSeedData.json');
const postSeedData = require('./postSeedData.json');
const commentSeedData = require('./commentSeedData.json');

const seedDatabase = async () => {
    try {
     
        await sequelize.sync({ force: true });
        // bulk create users
        const usersData = await User.bulkCreate(userSeedData, {
            returning: true
        });
        // de-serializes user data
        const users = usersData.map((user) => user.get({ plain: true }));
        // bulk create posts assign user_id value to random user
        for (const post of postSeedData) {
            const randUserId = users[getRandomInt(users.length)].id;
            const newPost = await Post.create(
                {
                ...post,
                userId: randUserId,
                }
            );
        };

        const postsData = await Post.findAll();
        const posts = postsData.map((post) => post.get({ plain: true }));        
        // bulk create comments, assign to random post_id and user_id of random user
        for (const comment of commentSeedData) {
            const randPostId = posts[getRandomInt(posts.length)].id;
            const randCommentUserId = users[getRandomInt(users.length)].id
            
            await Comment.create(
                {
                    ...comment,
                    postId: randPostId,
                    userId: randCommentUserId
                }
            );
        };

        process.exit(0);
        
    } catch (err) {
        console.log(err);
    }
    
};

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
};

seedDatabase();