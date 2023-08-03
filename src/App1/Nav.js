import React from 'react';
import image from './reactIcon.png'

function Nav() {
	return (
		<nav>
			<img src={image} alt='react here'/>
			<h3 className="text-xl font-bold">ReactFacts</h3>
			<h4 className="text-lg font-medium">React Course - Project 1</h4>
		</nav>
	);
}

export default Nav;
