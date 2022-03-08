Feature: Access different applications among the Hub

  @Test
  Scenario: A user accesses the Vault application
    Given the user access the portal URL
    When the user types the credentials
      And the user is redirected to the landpage
      And the user accesses the Vault
    Then the Vault app is opened

  @Test
  Scenario: A user accesses the FTRA application
    Given the user access the portal URL
    When the user types the credentials
      And the user is redirected to the landpage
      And the user accesses the FTRA app
    Then the FTRA app is opened afa
