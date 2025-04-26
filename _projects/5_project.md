---
layout: page
title: Waver
img: assets/img/waver.png
description: Twitter-inspired social network
importance: 3
category: work
giscus_comments: true
---

# Links & Resources

<div class="row">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Source Code</h5>
        <p class="card-text">Check out the complete source code and documentation on GitHub.</p>
        <a href="https://github.com/Escanor1986/WaveTides" target="_blank" class="btn btn-primary">
          <i class="fab fa-github"></i> View Repository
        </a>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Live Demo</h5>
        <p class="card-text">Experience the application in action through the live deployment.</p>
        <a href="https://waver-493c140e7e9c.herokuapp.com/auth/signin/form" target="_blank" class="btn btn-success">
          <i class="fas fa-external-link-alt"></i> Launch Application
        </a>
      </div>
    </div>
  </div>
</div>

## Description

Microblogging social network inspired by Twitter, developed with Node.js, Express, Pug, and Bootstrap 5 for a dynamic and responsive social experience.

Waver is a platform that allows users to share concise thoughts, follow other users, and interact with a personalized news feed.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/waver.png" title="Waver interface" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Main interface of Waver, showing the news feed and social interaction features.
</div>

Waver uses a server-side rendering stack for optimal performance, combining Node.js and Express for the backend, Pug as a template engine, and Bootstrap 5 for a responsive interface. Dynamic interactions are managed by client-side JavaScript and Socket.io for real-time notifications.

The application offers a complete range of social features:

- **User management** with secure authentication
- **Publications ("Waves")** with text, images, and hashtags
- **Personalized news feed** based on subscriptions
- **Private messaging** between users

Several notable technical aspects have been implemented:

- **Protection against injections** and XSS for enhanced security
- **Caching** of frequent requests to optimize performance
- **Modular middlewares** for a reusable server architecture
- **Pagination** to efficiently handle large amounts of data

The application is deployed on Heroku with automated CI/CD via GitHub, MongoDB Atlas for the database, and Cloudinary for image storage.

{% raw %}

```javascript
// Extract from the posts controller
const Post = require('../models/postModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createPost = catchAsync(async (req, res, next) => {
  // Extract hashtags from content
  const hashtagRegex = /#[a-zA-Z0-9_]+/g;
  const hashtags = req.body.content.match(hashtagRegex) || [];
  
  // Create the post
  const newPost = await Post.create({
    content: req.body.content,
    author: req.user._id,
    hashtags: hashtags.map(tag => tag.substring(1).toLowerCase()),
    image: req.file ? req.file.path : undefined
  });
  
  // Notify followers via Socket.io
  const followers = await User.find({ following: req.user._id });
  followers.forEach(follower => {
    if (req.io.sockets.connected[follower.socketId]) {
      req.io.sockets.connected[follower.socketId].emit('new-post', {
        authorName: req.user.username,
        authorId: req.user._id,
        postId: newPost._id
      });
    }
  });
  
  res.status(201).render('partials/post', {
    post: newPost,
    user: req.user,
    moment: require('moment')
  });
});

// Get news feed
exports.getFeed = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;
  
  // MongoDB aggregation for personalized feed
  const posts = await Post.aggregate([
    {
      $match: {
        $or: [
          { author: { $in: [...req.user.following, req.user._id] } },
          { hashtags: { $in: req.user.interests || [] } }
        ]
      }
    },
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: limit },
    {
      $lookup: {
        from: 'users',
        localField: 'author',
        foreignField: '_id',
        as: 'authorDetails'
      }
    },
    { $unwind: '$authorDetails' }
  ]);
  
  res.status(200).render('feed', {
    title: 'Your Feed',
    posts,
    user: req.user,
    moment: require('moment'),
    currentPage: page,
    hasMore: posts.length === limit
  });
});
```

{% endraw %}
