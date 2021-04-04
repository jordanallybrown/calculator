# Calculator
A vanilla javascript calculator which design is modeled (partially) using the Model-View-Controller (MVC) design pattern. However, since this project was smaller I decided to condense everything into a Model (for logic) and Viewer (which calls model and displays the UI). 

View calculator [here](https://jordanallybrown.github.io/calculator/). For iOS mobile devices, hide toolbar to see full calculator view. 

## Takeaways
- Evaluates the user's infix expression, converts to postfix, and then computes result. 
- Implement Stack (LIFO) using a Singly LinkedList as the underlying data structure
- Use the Factory Design Pattern to create different types of operators (instead of using switch cases) so that additional operators in the future are easily extended