import React from "react";
import troll from './troll.png'
import memeData from './data'

function Header() {
    return (
        <header className="header flex">
            <img src={troll} className="header-image" />
            <h2 className="header-title text-xl font-bold">Meme Generator</h2>
            <h4 className="header-line font-medium">React Course - Project 3</h4>
        </header>
    );
}

function Meme() {
    /*
    here an example of adding an event listener in react would be given. we can define a function over the return statement in the component. then add any event like
    <button onClick={functionName}>My button</button>
    note the the function name is without the parentheses.
    */
    const [allMemeImages, setAllMemeImages] = React.useState(memeData);

    function getMemeImage() {
        const memesArray = allMemeImages.data.memes
        const randomNumber = Math.floor(Math.random() * memesArray.length)
        return memesArray[randomNumber].url;
    }

    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        memeImage: "http://i.imgflip.com/1bij.jpg"
    }); //here we used the useState function of react which sets the initial state of the value together with providing the function required to change the state of that value

    const handleClick = () => {
        setMeme((prevMeme) => {
            return {
                ...prevMeme, 
                memeImage: getMemeImage()
            }
        }); //here we used the function for setImage provided by the useState react function to change the state of a variable monitored by react.
    }

    return (
        <div className="form flex flex-col">
            <div className="inputs flex w-full justify-center">
                <input className="top-text" placeholder="Top Text" type="text"></input>
                <input className="bottom-text" placeholder="Bottom Text" type="text"></input>
            </div>
            <button onClick={handleClick} className="btn w-full">Get a new meme image 🖼</button>
            <img src={meme.memeImage} />
        </div>
    );
}

export default function App() {
    return (
        <div>
            <Header />
            <Meme />
        </div>
    );
}

/*
What react does if we have changing variable in a component is that it uses its first ever value evry time in the rendering this means that if the value of that variable changes it would not affect the changes in the rendering. for react to save the changes we use something called useState in react.
*/
/*
Similarly we can useState of an object here is an example
const [contact, setContact] = React.useState({
    firstName: "John",
    lastName: "Doe",
    phone: "+1 (719) 555-1212",
    email: "itsmyrealname@example.com",
    isFavorite: false
})

let starIcon = contact.isFavorite ? "star-filled.png" : "star-empty.png"

function toggleFavorite() {
    setContact(prevContact => ({
        ...prevContact,
        isFavorite: !prevContact.isFavorite
    }))
}
here we used the object spread operator and then changed its value. js uses the last defined value of similar keys in the object.
*/