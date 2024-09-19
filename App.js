/*

<div id='parent'>
	<div id='child>
		<h1 id="heading">Hello World from React!</h1>
	</div>
	<div id='child>
		<h1 id="heading">Greeting from Mars!</h1>
	</div>
</div>
 */

const parent = React.createElement('div', {id: 'parent'},
	React.createElement('div', {id: 'child'},
		[React.createElement('h1', {}, 'Hello World from React World!'), React.createElement('p', {}, 'This is a paragraph')]
	),
	React.createElement('div', {id: 'child'},
		[React.createElement('h1', {}, 'HGreeting from Mars!'), React.createElement('p', {}, 'This is a paragraph')]
	),
	
);
// const heading = React.createElement('h1', {id: 'heading'}, 'Hello World from React!');
// console.log(heading); // object representation of the element
const root = ReactDOM.createRoot( document.getElementById('root'));
// root.render(heading); // render the element to the DOM
root.render(parent);