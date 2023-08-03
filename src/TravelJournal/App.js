import React from "react";
import earth from './R.png'
import data from './data'
import locLogo from './location.png'

function Top() {
    return (
        <nav className=" top-part flex justify-center">
            <img src={earth} className="logo" />
            <p className="text-white font-bold">My Travel Journal</p>
        </nav>
    );
}

function Card(props) {
    return (
        <div className="card flex">
            <div className="image-section p-0">
                <img src={props.item.image} alt="image" className="image" />
            </div>
            <div className="description-section flex flex-col">
                <div className="top flex">
                    <img src={locLogo} className="locLogo"/>
                    <p>{props.item.location.toUpperCase()}</p>
                    <a className="text-gray-400 underline" href={props.item.googleMapsUrl}>View On Google Maps</a>
                </div>
                <div className="bottom">
                    <h1 className="text-3xl font-extrabold">{props.item.title}</h1>
                    <p className="font-bold">{props.item.startDate}-{props.item.endDate}</p>
                    <p>{props.item.description}</p>
                </div>
            </div>
        </div>
    );
}

function Main() {
    const cards = data.map((item) => {
        return <Card 
            item={item}
        />
    })
    return (
        <main>
            {cards}
        </main>
    );
}

export default function App() {
    return (
        <div>
            <Top />
            <Main />
        </div>
    );
}