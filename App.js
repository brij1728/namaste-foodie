const heading = React.createElement('h1', {id: 'heading'}, 'Hello World from React!');
console.log(heading); // object representation of the element
const root = ReactDOM.createRoot( document.getElementById('root'));
root.render(heading); // render the element to the DOM