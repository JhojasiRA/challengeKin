Feature: As a user, I want to navigate into the top bar of homePage

    Background: Be on the Le Mans portal
        Given the user open the Le Mans portal
        When the user submit the form with its credentials
        And the user accept the EULA testing eula "false"


    @Topbar
    Scenario: navigate into top bar help collection
        When the user go inside on the help icon
        And the user go inside on Online help option
        Then the user should see the page "FactoryTalk Hub Help Collection"

    @Topbar
    Scenario: navigate into top bar getting started collection
        When the user go inside on the help icon
        And the user go inside on getting started option
        Then the user should see "FactoryTalk Hub Getting Started Collection" page tittle
    @Topbar
    Scenario: navigate into top bar provide feedback
        When the user go inside on the help icon
        And the user go inside on provide feedback option

    @Topbar
    Scenario: navigate into top bar release notes
        When the user go inside on the help icon
        And the user go inside on Release Notes
        Then the user should see page with title "FactoryTalk Hub Release Notes Collection"

    @Topbar
    Scenario: navigate into about option
        When the user go inside on the help icon
        And the user click on about option
        And the user click on its profile
        Then the user should see the login page