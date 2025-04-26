---
layout: page
title: Odoo Hackathon 2024
img: assets/img/hackathon_1.png
description: Cloud-Native web application deployed on GCP
importance: 1
category: work
giscus_comments: true
---

# Links & Resources

  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Live Demo</h5>
        <p class="card-text">Experience the application in action through the live deployment.</p>
        <a href="https://prime-garfish-currently.ngrok-free.app/" target="_blank" class="btn btn-success">
          <i class="fas fa-external-link-alt"></i> Launch Application
        </a>
      </div>
    </div>
  </div>

## Description

Cloud-Native architecture deployed on Google Cloud Platform with Kubernetes, Docker, and React.

Odoo Hackathon is a modern web application demonstrating advanced DevOps technologies and modern distributed architectures, created during a development hackathon.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/hackathon_1.png" title="Main application interface" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/hackathon_2.png" title="Dashboard with data visualization" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    User interface of the Odoo Hackathon 2024 application, featuring a responsive design and data visualization.
</div>

The application is built on a three-tier architecture, fully containerized and orchestrated. This project allowed me to deepen my DevOps skills and implement a complete infrastructure on Google Cloud Platform.

The technical stack includes:

- **Frontend**: React (Vite) with reusable component architecture
- **Backend**: Node.js/Express for a high-performance RESTful API
- **Database**: MariaDB for data storage
- **Infrastructure**: Kubernetes (GKE), Docker, Google Artifact Registry
- **CI/CD**: Continuous integration and deployment via GitHub Actions

**Current deployment**: After the hackathon, the application was redeployed to a private Raspberry Pi server where it runs 24/7, demonstrating its flexibility and optimization for diverse hardware environments.

The code is structured according to development best practices:

- Microservices architecture for optimal scalability
- Secure access and data protection
- Centralized monitoring and logging
- Automated testing and continuous integration

This project showcases my ability to design and implement complex cloud-native applications while following DevOps best practices and maintaining high standards of performance and security.

{% raw %}

```javascript
// Sample React code used in the project
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Dashboard = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    // Fetching data from the API
    fetchAnalyticsData().then(response => {
      setData(response.data);
    });
  }, []);
  
  return (
    <div className="dashboard-container">
      <h2>Performance Analytics</h2>
      <LineChart width={800} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default Dashboard;
```

{% endraw %}
