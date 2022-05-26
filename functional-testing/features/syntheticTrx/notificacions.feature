Feature: As a user, I want to delete, manage and view the notification on the Nagivation Bar

    Background:  Be on the Le Mans portal
        Given the user open the Le Mans portal
        When the user submit the form with its credentials
        And the user accept the EULA testing eula "false"
        
@Notifications
Scenario: Delete a notification from the panel
    When the user goes to the notification option
    And the user removes a notification from the panel
    Then the user will see one notification less on his NavBar
@Notifications
Scenario: Delete a notification from the VIEW ALL page
    When the user goes to the notification option
    And the user clears one notification on the view all page
    Then the user will see one notification less on his NavBar
@Notifications @testNotif
Scenario: Delete all notification from the VIEW ALL page
    When the user goes to the notification option
    And the user clears all notifications on the view all page
    Then The user will see an empty page
@Notifications @testNotif
Scenario: Delete all notification from the panel
    When the user goes to the notification option
    And the user clears all notifications on the panel notification
    Then The user will see an "All Clear" panel



#generar una nueva notificacion