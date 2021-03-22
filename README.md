# Calculator
A vanilla javascript calculator that uses the Model-View-Controller (MVC) design pattern.

View calculator [here](https://jordanallybrown.github.io/calculator/). For iOS mobile devices, hide toolbar to see full calculator view. 

## Model
#### **Description**
Manages the data which will be the math expression that the calculator will evaluate and compute a result.
#### **Implementation**
- Evaluates the user's infix expression, converts to postfix, and then computes result. 
- Implement Stack (LIFO) using a Singly LinkedList as the underlying data structure
- Use the Factory Design Pattern to create different types of operators (instead of using switch cases) so that additional operators in the future are easily extended

## View
#### **Description**
Generates and renders the display of the calculator using HTML, CSS and DOM manipulation (eventlisteners).

## Controller
#### **Description**
Connects the calculator and the view, which takes the user's math expression given by the View and calls the calculator to evaluate the expression, then handles callbacks to give the user feedback. Acts as a link and mediator between the model and view since, according to the MVC pattern, those two should never interact (or have knowledge of) with one another. 