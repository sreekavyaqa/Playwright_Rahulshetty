Feature: Error Validations
@Validations
@foo
  Scenario Outline: Placing the Order
    Given A Login to ECommerce2 application with "<username>" and "<password>"
    Then  Verify Error Message is displayed
Examples:
|username               | password |
|harekrishna@gmail.com  | Test@123 |
|rahuhetty@gmail.com    | Test@123 |

#Parametrization,parllel,html,rerun failed testcases