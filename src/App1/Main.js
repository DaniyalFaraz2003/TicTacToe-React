import React from 'react';
import image from './back.jpeg'
function Main() {
    return (
        <main className='mainContainer'>
            <img src={image} />
            <h1 className="text text-3xl font-extrabold">Fun Facts About React</h1>
            <ul className='list-none text-white text-center font-bold font-mono text-xl'>
                <li>Was first released in 2013</li>
                <li>Was originally created by Jordan Walke</li>
                <li>Has well over 100K stars on GitHub</li>
                <li>Is maintained by Facebook</li>
                <li>Powers thousands of enterprise apps including mobile apps</li>
            </ul>

        </main>
    );
}

export default Main;