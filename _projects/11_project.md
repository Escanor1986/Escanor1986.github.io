---
layout: page
title: Spring Tennis Manager
img: assets/img/spring_tennis.png
description: Java Spring Boot application for tennis tournament management
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
        <a href="https://github.com/Escanor1986/Spring_Tennis" target="_blank" class="btn btn-primary">
          <i class="fab fa-github"></i> View Repository
        </a>
      </div>
    </div>
  </div>
</div>

## Description

Spring Tennis Manager is a comprehensive Java application built with Spring Boot that handles tennis tournament management, player registration, match scheduling, and results tracking.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/spring_tennis.png" title="Spring Tennis Manager Dashboard" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Dashboard interface of the Spring Tennis Manager application, showing tournament overview and player statistics.
</div>

This project demonstrates advanced Spring Boot implementation for a domain-specific application. The system provides tennis club administrators with tools to manage tournaments, players, matches, and statistical data.

The technical stack includes:

- **Framework**: Spring Boot with Spring MVC and Spring Data
- **Database**: MySQL with Hibernate ORM
- **Frontend**: Thymeleaf templates with Bootstrap for responsive UI
- **Security**: Spring Security with role-based access control
- **Reporting**: Dynamic PDF generation using JasperReports
- **Testing**: JUnit, Mockito, and Spring Test framework

## Key Features

Spring Tennis Manager offers a comprehensive set of features for tennis tournament administration:

- **Player Management**: Registration, profiles, and performance tracking
- **Tournament Organization**: Creation, scheduling, and bracket generation
- **Match Management**: Score recording, statistics, and result publication
- **Ranking System**: Automatic player ranking based on match outcomes
- **Reporting**: Tournament schedules, match results, and player statistics
- **Administrative Tools**: User management and system configuration

The application follows a clean architecture with separation of concerns:

- **Controller Layer**: Handling HTTP requests and user interface
- **Service Layer**: Implementing business logic and operations
- **Repository Layer**: Data access through Spring Data repositories
- **Entity Layer**: Domain model with JPA annotations
- **DTO Layer**: Data transfer objects for API responses

This project showcases my expertise in Java enterprise development, demonstrating proficiency in Spring ecosystem technologies and implementation of complex domain-specific business logic.

{% raw %}
```java
@Service
@Transactional
public class TournamentServiceImpl implements TournamentService {

    private final TournamentRepository tournamentRepository;
    private final PlayerRepository playerRepository;
    private final MatchRepository matchRepository;
    
    @Autowired
    public TournamentServiceImpl(
            TournamentRepository tournamentRepository,
            PlayerRepository playerRepository,
            MatchRepository matchRepository) {
        this.tournamentRepository = tournamentRepository;
        this.playerRepository = playerRepository;
        this.matchRepository = matchRepository;
    }
    
    @Override
    public List<TournamentDTO> getAllTournaments() {
        return tournamentRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Override
    public TournamentDTO createTournament(TournamentCreationDTO dto) {
        validateTournamentDates(dto);
        
        Tournament tournament = new Tournament();
        tournament.setName(dto.getName());
        tournament.setStartDate(dto.getStartDate());
        tournament.setEndDate(dto.getEndDate());
        tournament.setLocation(dto.getLocation());
        tournament.setSurfaceType(dto.getSurfaceType());
        tournament.setCategory(dto.getCategory());
        tournament.setMaxParticipants(dto.getMaxParticipants());
        tournament.setStatus(TournamentStatus.REGISTRATION_OPEN);
        
        Tournament savedTournament = tournamentRepository.save(tournament);
        return convertToDTO(savedTournament);
    }
    
    @Override
    public void registerPlayerForTournament(Long tournamentId, Long playerId) throws TournamentException {
        Tournament tournament = tournamentRepository.findById(tournamentId)
                .orElseThrow(() -> new EntityNotFoundException("Tournament not found"));
                
        Player player = playerRepository.findById(playerId)
                .orElseThrow(() -> new EntityNotFoundException("Player not found"));
                
        if (tournament.getStatus() != TournamentStatus.REGISTRATION_OPEN) {
            throw new TournamentException("Registration is closed for this tournament");
        }
        
        if (tournament.getPlayers().size() >= tournament.getMaxParticipants()) {
            throw new TournamentException("Tournament has reached maximum number of participants");
        }
        
        if (tournament.getPlayers().contains(player)) {
            throw new TournamentException("Player already registered for this tournament");
        }
        
        tournament.getPlayers().add(player);
        tournamentRepository.save(tournament);
    }
    
    @Override
    public void generateMatches(Long tournamentId) throws TournamentException {
        Tournament tournament = tournamentRepository.findById(tournamentId)
                .orElseThrow(() -> new EntityNotFoundException("Tournament not found"));
                
        if (tournament.getStatus() != TournamentStatus.REGISTRATION_CLOSED) {
            throw new TournamentException("Cannot generate matches: tournament registration is not closed");
        }
        
        // Implementation of tournament bracket generation algorithm
        List<Player> players = new ArrayList<>(tournament.getPlayers());
        Collections.shuffle(players); // Random seeding for this example
        
        int roundNumber = 1;
        int matchNumber = 1;
        
        for (int i = 0; i < players.size(); i += 2) {
            if (i + 1 < players.size()) {
                Match match = new Match();
                match.setTournament(tournament);
                match.setPlayer1(players.get(i));
                match.setPlayer2(players.get(i + 1));
                match.setRound(roundNumber);
                match.setMatchNumber(matchNumber++);
                match.setStatus(MatchStatus.SCHEDULED);
                
                matchRepository.save(match);
            }
        }
        
        tournament.setStatus(TournamentStatus.IN_PROGRESS);
        tournamentRepository.save(tournament);
    }
    
    private TournamentDTO convertToDTO(Tournament tournament) {
        TournamentDTO dto = new TournamentDTO();
        dto.setId(tournament.getId());
        dto.setName(tournament.getName());
        dto.setStartDate(tournament.getStartDate());
        dto.setEndDate(tournament.getEndDate());
        dto.setLocation(tournament.getLocation());
        dto.setSurfaceType(tournament.getSurfaceType());
        dto.setCategory(tournament.getCategory());
        dto.setStatus(tournament.getStatus());
        dto.setPlayerCount(tournament.getPlayers().size());
        dto.setMaxParticipants(tournament.getMaxParticipants());
        return dto;
    }
    
    private void validateTournamentDates(TournamentCreationDTO dto) {
        if (dto.getStartDate().isAfter(dto.getEndDate())) {
            throw new IllegalArgumentException("Start date cannot be after end date");
        }
        
        if (dto.getStartDate().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Tournament cannot start in the past");
        }
    }
}
```
{% endraw %}
