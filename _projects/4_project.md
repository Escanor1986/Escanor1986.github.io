---
layout: page
title: House Way
img: assets/img/house_way.png
description: Fullstack vacation rental platform
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
        <a href="https://github.com/Escanor1986/Vacations_RBNB_Rentals" target="_blank" class="btn btn-primary">
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
        <a href="https://escanor1986.github.io/Vacations_RBNB_Rentals/#/signup" target="_blank" class="btn btn-success">
          <i class="fas fa-external-link-alt"></i> Launch Application
        </a>
      </div>
    </div>
  </div>
</div>

## Description

Fullstack vacation rental application inspired by Airbnb, developed with React for the frontend, Node.js/Express for the backend, and MongoDB for the database.

House Way is a complete platform allowing users to search, book, and manage vacation rentals, with a modern and secure architecture.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/house_way.png" title="House Way main interface" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    User interface of House Way, displaying available rental listings and search functionality.
</div>

This application adopts a clearly separated three-tier architecture, with a React frontend, Node.js/Express backend, and MongoDB database. Communication between layers is ensured by a secure REST API.

The platform offers a complete set of features:

- **User management** with secure JWT authentication
- **Complete CRUD operations** for rental listings with photo uploads
- **Booking system** with availability verification
- **Administration panel** for property owners and administrators

Several measures have been implemented to ensure security and performance:

- **Input validation** with Joi/Yup on backend and frontend
- **Protection against injections** and other vulnerabilities
- **Query optimization** with pagination and lazy loading
- **Caching** of frequently accessed data

The application is deployed with a distributed architecture on GitHub Pages for the frontend, Heroku for the backend, and MongoDB Atlas for the database.

{% raw %}

```javascript
// Extract from Express backend for property management
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const Property = require('../models/property');
const upload = require('../config/multer');
const cloudinary = require('../config/cloudinary');

// Route to create a new property
router.post('/', authenticate, upload.array('images', 10), async (req, res) => {
  try {
    // Check user permissions
    if (req.user.role !== 'owner' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
    
    // Process uploaded images
    const imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        imageUrls.push(result.secure_url);
      }
    }
    
    // Create the new property
    const newProperty = new Property({
      title: req.body.title,
      description: req.body.description,
      location: {
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        coordinates: {
          lat: req.body.latitude,
          lng: req.body.longitude
        }
      },
      price: req.body.price,
      capacity: req.body.capacity,
      amenities: req.body.amenities.split(','),
      images: imageUrls,
      owner: req.user.id
    });
    
    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Other routes for property management...

module.exports = router;
```

{% endraw %}
