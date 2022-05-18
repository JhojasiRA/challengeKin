Feature: As a user, I want to narrow down the services cards I see on screen so I can easily find the one I need

    Background:  Be on the Le Mans portal
        Given the user open the Le Mans portal
        And the user submit the form with its credentials
        And the user accept the EULA testing eula "false"

    @HomeFilters @SyntheticTrx
    Scenario: Filter All Apps
        When the user filter by all cards
        Then user should see all the service cards currently available

    @HomeFilters @SyntheticTrx
    Scenario: Filter Design Hub services
        When the user filter by design hub cards
        Then user should see the service cards associated with design hub

    @HomeFilters @SyntheticTrx
    Scenario: Filter Operations Hub services
        When the user filter by operation hub cards
        Then user should see the service cards associated with operation hub

    @HomeFilters @SyntheticTrx
    Scenario: Filter Maintenance Hub services
        When the user filter by maintenance hub cards
        Then user should see the service cards associated with maintenance hub

