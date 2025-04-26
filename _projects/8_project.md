---
layout: page
title: Online Age Calculator
description: an other project with a background image and giscus comments
img: assets/img/age-calculator.png
importance: 2
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
        <a href="https://github.com/Escanor1986/age-calculator" target="_blank" class="btn btn-primary">
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
        <a href="https://escanor1986.github.io/age-calculator/" target="_blank" class="btn btn-success">
          <i class="fas fa-external-link-alt"></i> Launch Application
        </a>
      </div>
    </div>
  </div>
</div>

## Description

Interactive web application to calculate the exact age from a birth date, developed with fundamental web technologies and particular attention to UX.

This project demonstrates the power of vanilla JavaScript combined with modern development practices to create an elegant and functional application.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/age-calculator.png" title="Age Calculator Interface" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    User interface of the Age Calculator application, showing the input form and results display.
</div>

This project builds on web development fundamentals, with semantic HTML5, CSS3 with variables and animations, and vanilla JavaScript for interactive logic without dependencies. Vite is used as a bundler to optimize performance.

Several methodologies were applied:

- **Mobile-first design** for an optimal responsive experience
- **BEM (Block Element Modifier)** for structured CSS organization
- **Progressive enhancement** to ensure compatibility
- **A11y (accessibility)** with focus on keyboard use and screen readers

The application offers a carefully crafted user experience with:

- **Precise age calculation** in years, months, and days
- **Real-time input validation** with visual feedback
- **Intelligent handling of special cases** (leap years, invalid dates)
- **Result animations** for a visually satisfying experience

The main technical challenge of this project was the advanced use of JavaScript's Date API to accurately calculate differences between dates considering leap years and correctly handle the transition of months of different lengths.

A comprehensive validation system was implemented to verify date validity, prevent future birthdate entries, and provide precise visual and textual feedback on errors.

The project is organized according to a clear architecture with ES6 modules for organized and maintainable code, and a separation of concerns between UI, logic, and validation.

{% raw %}

```javascript
// Extract from the age calculation module
class AgeCalculator {
  /**
   * Calculates the exact age in years, months, and days
   * @param {Date} birthDate - Birth date
   * @param {Date} [toDate=new Date()] - Date to calculate age to
   * @returns {Object} Object containing years, months, and days
   */
  static calculateAge(birthDate, toDate = new Date()) {
    // Input validation
    if (!(birthDate instanceof Date) || isNaN(birthDate)) {
      throw new Error('Invalid birth date');
    }
    
    if (birthDate > toDate) {
      throw new Error('Birth date cannot be in the future');
    }
    
    let years = toDate.getFullYear() - birthDate.getFullYear();
    let months = toDate.getMonth() - birthDate.getMonth();
    let days = toDate.getDate() - birthDate.getDate();
    
    // Adjustment for negative days
    if (days < 0) {
      // Get the number of days in the previous month
      const lastMonth = new Date(toDate.getFullYear(), toDate.getMonth(), 0);
      days = lastMonth.getDate() + days;
      months--;
    }
    
    // Adjustment for negative months
    if (months < 0) {
      months = 12 + months;
      years--;
    }
    
    return {
      years,
      months,
      days
    };
  }
  
  /**
   * Checks if a date is valid
   * @param {number} day - Day
   * @param {number} month - Month (1-12)
   * @param {number} year - Year
   * @returns {boolean} True if the date is valid
   */
  static isValidDate(day, month, year) {
    // Check limits
    if (year < 1 || year > 9999) return false;
    if (month < 1 || month > 12) return false;
    if (day < 1) return false;
    
    // Check number of days in the month
    const maxDays = new Date(year, month, 0).getDate();
    if (day > maxDays) return false;
    
    return true;
  }
  
  /**
   * Checks if a year is a leap year
   * @param {number} year - Year to check
   * @returns {boolean} True if the year is a leap year
   */
  static isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }
}

export default AgeCalculator;
```

{% endraw %}
