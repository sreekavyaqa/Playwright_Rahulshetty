Feature: Ecommerce Validations
@Regression
  Scenario: Placing the Order
    Given A Login to ECommerce application with "harekrishna@gmail.com" and "Test@123"
    When I add "ZARA COAT 4" to the cart
    Then verify "ZARA COAT 3" is displayed in the cart
    When Enter Validations and Place the Order
    Then  Verify Order is displayed in Order DetailsPage

 Scenario Outline: Placing the Order
    Given A Login to ECommerce2 application with "<username>" and "<password>"
    Then  Verify Error Message is displayed
Examples:
|username               | password |
|harekrishna@gmail.com  | Test@123 |
|rahuhetty@gmail.com    | Test@123 |