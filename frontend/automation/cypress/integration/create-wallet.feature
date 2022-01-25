Feature: Create wallet tests

  Scenario: Create new wallet
    Given I navigate to the wallet page
    Then I can see the create new wallet button
    When I click create new
    Then I see the create wallet form
    When I submit the create wallet form
    Then I see a warning message, the wallet version and recovery phrase
    When I click view wallet button
    Then I am redirected to the wallets page
