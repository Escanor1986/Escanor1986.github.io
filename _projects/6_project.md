---
layout: page
title: PixCircle
description: Modern web application with Angular 19
img: assets/img/pix_circle.png
importance: 4
category: fun
giscus_comments: true
---
# Links & Resources

<div class="row">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Source Code</h5>
        <p class="card-text">Check out the complete source code and documentation on GitHub.</p>
        <a href="https://github.com/Escanor1986/PixCircle" target="_blank" class="btn btn-primary">
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
        <a href="https://escanor1986.github.io/PixCircle" target="_blank" class="btn btn-success">
          <i class="fas fa-external-link-alt"></i> Launch Application
        </a>
      </div>
    </div>
  </div>
</div>

## Description

Responsive web application developed with Angular 19, TypeScript, and SCSS, demonstrating the use of modern framework features to create a fluid and interactive user experience.

PixCircle leverages the latest technologies from the Angular ecosystem to provide a scalable architecture and optimal performance.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/pix_circle.png" title="PixCircle interface" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Main user interface of PixCircle, illustrating the modern design and ergonomics of the application.
</div>

This project leverages the most recent technologies from the Angular world, with a particular focus on new features of Angular 19 such as Standalone Components and Signals for reactive state management.

The modular architecture with lazy loading optimizes performance, while the use of TypeScript 5 ensures strict typing and easier maintenance. Modular SCSS styles allow for advanced customization of the user interface.

The application integrates several innovative features:

- **Advanced navigation system** with nested routing and animated transitions
- **Reactive data management** with Signals and RxJS
- **Optimized performance** with OnPush Change Detection
- **Advanced UI/UX** with fluid animations and responsive design

The development of PixCircle overcame several technical challenges, notably the migration to Angular 19 with its new APIs and paradigms, as well as the design of a scalable architecture promoting long-term maintainability.

The project benefits from a continuous integration and deployment workflow via GitHub Actions for build and test automation, with deployment on GitHub Pages.

{% raw %}

```typescript
// Example using Signals in an Angular 19 component
import { Component, computed, effect, input, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { DataService } from "../../services/data.service";
import { Item } from "../../models/item.model";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="dashboard-container">
      <h1>Dashboard</h1>

      <div class="filters">
        <button *ngFor="let category of categories()" (click)="selectedCategory.set(category)" [class.active]="selectedCategory() === category">
          {{ category }}
        </button>
      </div>

      <div class="items-grid">
        <div *ngFor="let item of filteredItems()" class="item-card" [routerLink]="['/items', item.id]">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
          <span class="badge">{{ item.category }}</span>
        </div>
      </div>

      <div class="summary">
        <p>Total items: {{ totalCount() }}</p>
        <p>Filtered items: {{ filteredItems().length }}</p>
      </div>
    </div>
  `,
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent {
  // Using input() replacing @Input()
  searchTerm = input<string>("");

  // Signals for local state
  selectedCategory = signal<string>("All");
  items = signal<Item[]>([]);
  isLoading = signal<boolean>(true);

  // Value automatically calculated from other signals
  categories = computed(() => {
    const uniqueCategories = new Set(this.items().map((item) => item.category));
    return ["All", ...Array.from(uniqueCategories)];
  });

  // Reactive filtering of items
  filteredItems = computed(() => {
    return this.items().filter((item) => {
      // Filter by category
      if (this.selectedCategory() !== "All" && item.category !== this.selectedCategory()) {
        return false;
      }

      // Filter by search term
      if (this.searchTerm() && !item.title.toLowerCase().includes(this.searchTerm().toLowerCase())) {
        return false;
      }

      return true;
    });
  });

  // Reactive total count
  totalCount = computed(() => this.items().length);

  constructor(private dataService: DataService) {
    // Effect to observe changes
    effect(() => {
      console.log(`Selected category: ${this.selectedCategory()}`);
      console.log(`Number of filtered items: ${this.filteredItems().length}`);
    });

    // Loading data
    this.loadItems();
  }

  private async loadItems() {
    try {
      const data = await this.dataService.getItems();
      this.items.set(data);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
```

{% endraw %}
