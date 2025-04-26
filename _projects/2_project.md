---
layout: page
title: Telesport
img: assets/img/telesport_1.png
description: Angular sports data visualization application
importance: 2
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
        <a href="https://github.com/Escanor1986/Telesport" target="_blank" class="btn btn-primary">
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
        <a href="https://escanor1986.github.io/Telesport" target="_blank" class="btn btn-success">
          <i class="fas fa-external-link-alt"></i> Launch Application
        </a>
      </div>
    </div>
  </div>
</div>

## Description

Angular application deployed on GitHub Pages with Olympic sports data visualization and interactive statistics tables.

Telesport is a sports data application developed with **Angular** that presents Olympic Games statistics, including medal tables and interactive charts.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/telesport_1.png" title="Telesport main dashboard" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/telesport_2.png" title="Data visualization with charts" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    User interface of Telesport showing the main dashboard and graphical data visualizations of Olympic statistics.
</div>

The project leverages several advanced Angular features to provide a smooth and interactive user experience. Data management is fully reactive thanks to the extensive use of Observables and RxJS, allowing real-time updates.

The modular architecture with lazy loading optimizes loading performance, while HTTP interceptors and authentication guards ensure application security. Data visualization is made possible through integration with a powerful charting library.

The main features include:

- **Angular Routing** with navigation between sections
- **RxJS data streams** for reactive data management
- **Interactive charts** for exploring Olympic performance data
- **Responsive design** optimized for mobile and desktop devices

Advanced techniques were used to ensure optimal performance:

- OnPush Change Detection Strategy
- Intelligent change detection
- Complex calculations memoization
- List virtualization to handle large data volumes

You can explore the application deployed on [GitHub Pages](https://escanor1986.github.io/Telesport) and check the [source code on GitHub](https://github.com/Escanor1986/Telesport).

{% raw %}

```typescript
// Example of Angular service with reactive data management
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { Medal, Country } from '../models/olympic.model';

@Injectable({
  providedIn: 'root'
})
export class OlympicService {
  private apiUrl = 'assets/data/olympic-medals.json';
  private countriesSubject = new BehaviorSubject<string[]>([]);
  private yearsSubject = new BehaviorSubject<number[]>([]);
  
  constructor(private http: HttpClient) {
    this.loadInitialData();
  }
  
  private loadInitialData(): void {
    this.http.get<Medal[]>(this.apiUrl).pipe(
      tap(medals => {
        const countries = [...new Set(medals.map(m => m.country))];
        const years = [...new Set(medals.map(m => m.year))];
        this.countriesSubject.next(countries);
        this.yearsSubject.next(years);
      }),
      shareReplay(1)
    ).subscribe();
  }
  
  getFilteredMedals(): Observable<Medal[]> {
    const countries$ = this.countriesSubject.asObservable();
    const years$ = this.yearsSubject.asObservable();
    
    return combineLatest([
      countries$, 
      years$, 
      this.http.get<Medal[]>(this.apiUrl)
    ]).pipe(
      map(([selectedCountries, selectedYears, allMedals]) => {
        return allMedals.filter(medal => 
          selectedCountries.includes(medal.country) && 
          selectedYears.includes(medal.year)
        );
      })
    );
  }
  
  // Other service methods...
}
```

{% endraw %}
