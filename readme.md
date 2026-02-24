1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
The main difference between getElementById, getElementsByClassName and querySelector /querySelectorAll lies in their selection of flexibility(which is a kind of selector they accept). The key difference are getElementById It selects a single element by its unique id attribute. Ex: myID. getElementsByClassName- It selects elements by their class names. Ex: myClass.
 querySelector /querySelectorAll- It selects the first/all elements that matches the CSS selector. Ex: .myClass.


2. How do you create and insert a new element into the DOM?
To create and insert a new element I have to follow some steps. That are-
1.	Create a new element using the ` method.
2.	Add the contents to the new element using the .textContent or .innerHTML.
3.	Then finding the parent use .appendChild()


3. What is Event Bubbling? And how does it work?
Event bubbling is a concept of JavaScript DOM event. Where and event starts from the target element and then it moves upward to its parent elements. 
It works like when you click on and element (like a div where the button is inside of the div):
1.	The event happens on that element(button) when it is clicked.
2.	Then it “bubbles up to its parent element which is div.
3.	Then it continues to get higher to its predecessor (body -> html -> document).
 

4. What is Event Delegation in JavaScript? Why is it useful?
Event Delegation is a design pattern of JavaScript. This is technique where attaching a single event listener to a parent element instead of adding separate listeners to every single child element.
This is useful. Because, it has better performance, handles dynamic elements and it keeps the codes clean and organized. 


5. What is the difference between preventDefault() and stopPropagation() methods?
The difference between preventDefault() and stopPropagation() methods are –
preventDefault(): This stops the browser's default behavior of the element (like a link navigating to a URL).
stopPropagation():  This stops the event from traveling between the DOM (bubbling up to parent elements).





