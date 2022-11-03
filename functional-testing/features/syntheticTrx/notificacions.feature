Feature: Notifications

    Background:  Be on the Le Mans portal
        Given the user opens the Le Mans portal
        When the user submits the form with its credentials
        And the user accepts the EULA testing eula "false"
        
    @Notifications @SyntheticTrx 
    Scenario: Delete a notification from the panel
        When the user goes to the notification option
        And the user removes a notification from the panel
        Then the user will see one notification less on his NavBar
    @Notifications @SyntheticTrx
    Scenario: Delete a notification from the VIEW ALL page
        When the user goes to the notification option
        And the user clears one notification on the view all page
        Then the user will see one notification less on his NavBar
    @Notifications @SyntheticTrx 
    Scenario: Delete all notification from the VIEW ALL page
        When the user goes to the notification option
        And the user clears all notifications on the view all page
        Then The user will see an empty page
    @Notifications @SyntheticTrx
    Scenario: Delete all notification from the panel
        When the user goes to the notification option
        And the user clears all notifications on the panel notification
        Then The user will see an "All Clear" panel