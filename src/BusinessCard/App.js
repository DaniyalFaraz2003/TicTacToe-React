import React from "react";
import image from './mine.PNG'
import twit from './twit.png'
import insta from './insta.png'
import linked from './in.png'
import git from './git.png'

function App () {
    return (
        <main className=" bg-gray-800 flex items-center justify-center w-screen h-screen py-5">
            <div className="card bg-slate-950 self-center m-5 flex flex-col rounded-xl overflow-hidden h-full">
                <div className="image m-0 p-0 box-border">
                    <img src={image} className="w-full h-full"/>
                </div>
                <div className="info">
                    <h3 className="text-center text-lg font-extrabold">Daniyal Faraz</h3>
                    <p className="text-gray-600 text-xs text-center">Software Engineer</p>
                    <p className="text-center text-white font-thin text-xs my-1">@IHS.co</p>
                    <div className="flex justify-evenly my-3">
                        <button className=" bg-white w-1/3 h-7 text-gray-800 text-sm rounded-xl">Email</button>
                        <button className=" bg-blue-400 w-1/3 text-white text-sm rounded-xl">Linked In</button>
                    </div>
                </div>
                <div className="about-section ps-6 pe-3">
                    <h4 className=" text-lg font-bold">About</h4>
                    <p className="about text-xs pe-2">Crafting innovative web solutions and making the internet better through hard work and consistency in my field. </p>
                    <h4 className=" text-lg font-bold">Interests</h4>
                    <p className=" text-xs pe-2">Developing both web and mobile as well as desktop applications. Know a lot about music and have passion in playing football. </p>
                </div>
                <div className="footer flex justify-around bg-white align-middle items-center">
                    <img src={twit} className="w-9 h-7" />
                    <img src={linked} className="w-7 h-7"/>
                    <img src={git} className="w-10 h-6"/>
                    <img src={insta} className="w-6 h-6"/>
                </div>
            </div>
        </main>
    );
}

export default App;