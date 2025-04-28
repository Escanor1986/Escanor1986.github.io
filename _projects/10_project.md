---
layout: page
title: ChâTop API
img: assets/img/chatop_api.png
description: RESTful API for a secure property rental platform
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
        <a href="https://github.com/Escanor1986/Cha_Top_Back" target="_blank" class="btn btn-primary">
          <i class="fab fa-github"></i> View Repository
        </a>
      </div>
    </div>
  </div>
</div>

## Description

ChâTop is a secure RESTful API built with Spring Boot for a property rental platform, featuring JWT authentication, image handling, and comprehensive property management capabilities.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/chatop_api.png" title="ChâTop API Architecture" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    API architecture diagram showing the relationship between controllers, services, and data repositories in the ChâTop backend.
</div>

This project is a robust backend API for a property rental platform, built using modern Java technologies and best practices. The API provides all necessary features for managing rental properties, user accounts, and bookings.

The technical stack includes:

- **Framework**: Spring Boot for rapid API development
- **Security**: JWT-based authentication and authorization
- **Database**: MySQL with Spring Data JPA for persistence
- **Documentation**: OpenAPI/Swagger for interactive API documentation
- **Testing**: JUnit and Mockito for comprehensive test coverage
- **Image Handling**: File upload and storage for property images

## Key Features

The ChâTop API supports a complete set of operations for property rental management:

- **User Management**: Registration, authentication, and profile management
- **Property CRUD Operations**: Create, read, update, and delete rental properties
- **Booking System**: Create and manage property reservations
- **File Management**: Upload and retrieve property images
- **Security**: Role-based access control and data protection

The architecture follows a clean, layered approach with separation of concerns:

- **Controller Layer**: RESTful endpoints with input validation
- **Service Layer**: Business logic and transaction management
- **Repository Layer**: Data access and persistence
- **DTO Pattern**: Separate data transfer objects for API responses
- **Mapper Components**: Clean conversion between entities and DTOs

This project demonstrates my proficiency in Java backend development, API design, and implementing security best practices in enterprise applications.

{% raw %}
```java
@RestController
@RequestMapping("/api/rentals")
public class RentalController {

    private final RentalService rentalService;
    private final AuthenticationService authService;
    
    @Autowired
    public RentalController(RentalService rentalService, AuthenticationService authService) {
        this.rentalService = rentalService;
        this.authService = authService;
    }
    
    @GetMapping
    public ResponseEntity<List<RentalDTO>> getAllRentals() {
        List<RentalDTO> rentals = rentalService.getAllRentals();
        return ResponseEntity.ok(rentals);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<RentalDTO> getRentalById(@PathVariable("id") Long id) {
        RentalDTO rental = rentalService.getRentalById(id);
        return ResponseEntity.ok(rental);
    }
    
    @PostMapping
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<RentalDTO> createRental(
            @RequestBody @Valid RentalCreationDTO rentalDTO,
            Authentication authentication) {
        
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Long userId = authService.getUserIdFromUsername(userDetails.getUsername());
        
        RentalDTO createdRental = rentalService.createRental(rentalDTO, userId);
        return ResponseEntity
                .created(URI.create("/api/rentals/" + createdRental.getId()))
                .body(createdRental);
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<RentalDTO> updateRental(
            @PathVariable("id") Long id,
            @RequestBody @Valid RentalUpdateDTO rentalDTO,
            Authentication authentication) {
        
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Long userId = authService.getUserIdFromUsername(userDetails.getUsername());
        
        RentalDTO updatedRental = rentalService.updateRental(id, rentalDTO, userId);
        return ResponseEntity.ok(updatedRental);
    }
}
```
{% endraw %}
