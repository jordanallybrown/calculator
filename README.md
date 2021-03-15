# Calculator
A vanilla javascript calculator that uses the Model-View-Controller (MVC) design pattern.

How to run: Once calculator is live, will include a link to view.

## Model
#### **Description**
Manages the data which will be the math expression that the calculator will evaluate and compute a result.
#### **Implementation**
- Evaluates the user's infix expression, converts to postfix, and then computes result. 
- Implement Stack (LIFO) using a Singly LinkedList as the underlying data structure

## View
#### **Description**
Generates and renders the display of the calculator using HTML, CSS and DOM manipulation (eventlisteners).

## Controller
#### **Description**
Connects the calculator and the view, which takes the user's math expression given by the View and calls the calculator to evaluate the expression, then handles callbacks to give the user feedback. Acts as a link and mediator between the model and view since, according to the MVC pattern, those two should never interact (or have knowledge of) with one another. 