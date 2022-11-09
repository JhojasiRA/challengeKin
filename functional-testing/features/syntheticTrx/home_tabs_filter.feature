Feature: Home filters and service tiles

    Background:  Be on the Le Mans portal
        Given the user opens the Le Mans portal
        And the user submits the form with its credentials
        And the user accepts the EULA testing eula "false"

    @HomeFilters @SyntheticTrx 
    Scenario: Filter All Apps
        When the user goes inside to create organization option
        And the user submits the form with its information
        And the user filters by all cards
        Then user should see all the service cards currently available

    @HomeFilters @SyntheticTrx 
    Scenario: Filter Design Hub services
        When the user filters by design hub cards
        Then user should see the service cards associated with design hub

    @HomeFilters @SyntheticTrx 
    Scenario: Filter Operations Hub services
        When the user filters by operation hub cards
        Then user should see the service cards associated with operation hub

    @HomeFilters @SyntheticTrx 
    Scenario: Filter Maintenance Hub services
        When the user filters by maintenance hub cards
        Then user should see the service cards associated with maintenance hub

