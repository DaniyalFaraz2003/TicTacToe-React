import React from "react";
import logo from './airbnb 1.png'
import image from './Group 77.png'
import rad from './rad.png'
import jokedata from "./jokedata";
import data from './data'

function Card(props) { //adding the props to the component makes it reusable. if we log the props object it is in form of a js object with the keys being the prop name and the values being the value of the prop. so we can access the values using only the dot notation of the js object. 

    //here we have a new concept of making the jsx print arrays. suppose we have an array of strings
    //const array = [<h1 className="text-3xl font-extrabold">Daniyal</h1>, <h1 className="text-3xl font-extrabold">Mustafa</h1>, <h1 className="text-3xl font-extrabold">Daniyal</h1>, <h1 className="text-3xl font-extrabold">Abdullah</h1>]; //so here we can see that jsx elements is rendered by an array.
    //when we print the array see that it just combines all the strings and display them as it is.
    return ( //we use the concept of conditional rendering to render the soldout icon for the cards that were already sold out.
        <div className="card relative">
            {/* {array} */}
            {props.soldout === 0 && <div className="absolute m-1 bg-white p-1">Sold Out</div>} 
            <img src={props.props.coverImg} className="card-image w-full"/>
            <div className="card-stats">
                <span>{props.props.stats.rating}</span>
                <span className="text-gray-600">({props.reviewCount}) \</span>
                <span className="text-gray-600">{props.country}</span>
            </div>
            <p className=" text-ellipsis">{props.props.title}</p>
            <p><span className="font-bold">For {props.price}</span> / person</p>
        </div>
    );
}

function Nav() {
    return (
        <nav className=' h-16 bg-white p-3 shadow-black shadow'>
            <img src={logo} className="w-30 h-10"></img>
        </nav>
    );
}

function Hero() {
    return (
        <section className="hero">
            <img src={image} className="hero-photo"/>
            <h1 className="hero-header text-3xl font-extrabold">Online Experiences</h1>
            <p className="hero-text">Join unique interactive activities led by one-of-a-kind hosts—all without leaving home.</p>
        </section>
    );
}

function Jokes(props) {
    //this component is to demonstrate how we can import external data and make reusable components by rendering them as we want.
    return (
        <div>
            {props.setup && <h3 className="text-xl font-bold">Setup: {props.setup}</h3>} 
            <p>Punchline: {props.punchline}</p>
            <hr />
        </div>
    );
    //the && operator checks if the condition on the left is true if it is then renders the thing on the right.
}

export default function App() {
    // const jokesComponents = jokedata.map((value) => {
    //     return <Jokes setup={value.setup} punchline={value.punchline}/>
    // }); //here using the map method we inserted data into the jokes component which came from external data source. now we can easily render this array of jokes component in the jsx.
    const cards = data.map((value) => {
        return <Card 
            // image={value.coverImg}
            // rating={value.stats.rating}
            // reviewCount={value.stats.reviewCount}
            // country={value.location}
            // text={value.title}
            // price={value.price}
            // soldout={value.openSpots} //this can sometimes happen tha the props being sent to a component can get a lot in amount. what we do then is simple. we just send in the whole object.
            props={value}
            //and one even better using the object spread syntax which is just {...value} what this does is break the object into its properties and then pass each property like that show above. i.e coverImg={value.coverImg} etc
        />
    });
    return (
        <div className="flex flex-col">
            <Nav />
            <Hero />
            <section className="p-2 flex mx-2 overflow-x-auto gap-3">
                {cards}
            </section>
            {/* {jokesComponents} here we can just easily render the whole array. */}
        </div>
        //so now here we added props to the component 'card' so that we can use this data inside the component making reusable components. to pass in props which are not strings we can just surround the value in curly braces and it would treat the value as one of the vanilla javascript. then it could be anything from floats, numbers, arrays, objects whatever vanilla js has to offer.
    );
}

/*
Ok so new concept:
within jsx if we surround something with curly braces it is interpreted as js code like:
function App() {
    let date = new Date();
    return (
        <h1>It is currently about {date.getHours() % 12} 'o clock!</h1>
    );
}

another new concept is the object destructuring that is suppose there is an object:
let person = {
    name: "daniyal",
    age: 19
}
so we can destructure the object like this:
const {name, age} = person;
now we can use the name and age separately. note that we have to use the names of the properties themselves we cannot assign custom names of our own.
*/

