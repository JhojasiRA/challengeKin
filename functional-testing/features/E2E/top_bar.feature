Feature: As a user, I want to navigate into the top bar of homePage

    Background: Be on the Le Mans portal
        Given the user opens the Le Mans portal
        When the user submits the form with its credentials
        And the user accept the EULA testing eula "false"

    @Topbar
    Scenario: navigate into top bar help collection
        When the user goes inside on the help icon
        And the user goes inside on Online help option
        Then the user should see the page "FactoryTalk Hub Help Collection"

    @Topbar
    Scenario: navigate into top bar getting started collection
        When the user goes inside on the help icon
        And the user goes inside on getting started option
        Then the user should see "FactoryTalk Hub Getting Started Collection" page tittle
    @Topbar
    Scenario: navigate into top bar provide feedback
        When the user goes inside on the help icon
        And the user goes inside on provide feedback option

    @Topbar
    Scenario: navigate into top bar release notes
        When the user goes inside on the help icon
        And the user goes inside on Release Notes
        Then the user should see page with title "FactoryTalk Hub Release Notes Collection"

    @Topbar
    Scenario: navigate into about option
        When the user goes inside on the help icon
        And the user clicks on about option
        And the user clicks on its profile
        Then the user should see the login page

    @Test2
    Scenario: navigate into top bar providing feedback 
        When the user goes inside on the help icon
        And the user goes inside on provide feedback option 
        And the user submits the form with feedback information
        Then user should not see the feedback modal

    @Test2
    Scenario: navigate into top bar enhancement request
        When the user goes inside on the help icon
        And the user goes inside on provide feedback option 
        And the user submits the form with enhancement request information
        Then user should not see the feedback modal

    @Test2
    Scenario: navigate into top bar reporting an issue
        When the user goes inside on the help icon
        And the user goes inside on provide feedback option 
        And the user submits the form with issue information
        Then user should not see the feedback modal

    @Test2
    Scenario: navigate into top bar reporting a feedback without text
        When the user goes inside on the help icon
        And the user goes inside on provide feedback option 
        And the user does not submit the form with text info
        Then user should see a message "Feedback is required"
                                        
       