---
layout: page
title: Chemin de conscience
img: assets/img/conscience.png
description: Next.js fullstack website for a non-profit
importance: 3
category: work
giscus_comments: true
---

## Links & Resources

<div class="row">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Live Demo</h5>
        <p class="card-text">Experience the application in action through the live deployment.</p>
        <a href="https://www.cheminsdeconscience.com/" target="_blank" class="btn btn-success">
          <i class="fas fa-external-link-alt"></i> Launch Application
        </a>
      </div>
    </div>
  </div>
</div>

## Description

Fullstack website for the Chemins de Conscience A.S.B.L. association developed with Next.js, TypeScript, and Tailwind CSS.

This professional web platform provides a complete digital showcase for an association, integrating modern features through a robust technical stack centered on Next.js.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/conscience.png" title="Chemins de Conscience website homepage" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Main interface of the Chemins de Conscience website, featuring a clean and elegant design suited to the spirit of the association.
</div>

The application is built on a modern architecture using the latest web technologies to ensure optimal performance and exceptional user experience. The site combines an elegant frontend with a secure backend and an SQL database for a complete solution.

Key features include:

- **Interactive image carousel** with smooth transitions
- **Powerful search system** throughout the site content
- **Media management** with optimized image display and integrated video player
- **Secure administration interface** for content management

Several technical optimizations have been implemented:

- **Image Optimization** via Next.js to reduce loading times
- **Automatic Code Splitting** to load only necessary code
- **Intelligent Prefetching** for instant navigation
- **Optimized SEO** with dynamic metadata and structured data

The site is deployed on Vercel with continuous integration from GitHub, automatic SSL certificates, and a global CDN for optimal performance worldwide.

{% raw %}
```tsx
// Example of a Next.js component with TypeScript and Tailwind
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Event } from '@/types/event';

interface EventCardProps {
  event: Event;
  priority?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, priority = false }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  
  const navigateToEventDetail = () => {
    router.push(`/events/${event.slug}`);
  };
  
  return (
    <div 
      className="relative rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={navigateToEventDetail}
    >
      <div className="relative h-48 w-full">
        <Image
          src={event.coverImage || '/images/default-event.jpg'}
          alt={event.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover transition-transform duration-500 ${isHovered ? 'scale-105' : 'scale-100'}`}
          priority={priority}
        />
      </div>
      <div className="p-4">
        <span className="inline-block px-3 py-1 text-sm font-semibold text-teal-800 bg-teal-100 rounded-full mb-2">
          {new Date(event.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
        </span>
        <h3 className="text-xl font-bold mb-2 text-gray-800">{event.title}</h3>
        <p className="text-gray-600 line-clamp-2">{event.shortDescription}</p>
      </div>
    </div>
  );
};

export default EventCard;
```

{% endraw %}
