import React from "react";
import jokes from "./boxes";

function Count (props) {
    return (
        <div className="counts bg-green-600 text-white">
            {props.count}
        </div>
    );
}

function Counter () {
    const [count, setCount] = React.useState(0);
    const add = () => {
        setCount((prevCount) => prevCount + 1);
    }
    const sub = () => {
        setCount((prevCount) => prevCount - 1);
    }

    return (
        <main>
            <div className="counter flex">
                <button onClick={sub} className="sub bg-slate-500 text-teal-100 text-2xl font-bold">-</button>
                <Count count={count} />
                <button onClick={add} className="add bg-slate-500 text-teal-100 text-2xl font-bold">+</button>
            </div>
        </main>
    );
}



function Box (props) {
    //the concept of state being initialized using the prop coming from above is called the derived state. The docs say that you probably wont need derived state. unifed state is what we need right now. remember we made square state in the app component. we are gonna use that to monitor all the states of the boxes. So for that to happen, we need to find in the parent component which box was clicked right. so we can do this by passing the id of the box in the toggle function in the parent component. then passing the id as argument in the function call being sent to the box's event listener. For that we make another function inside the event listener and make that function call the toggle function with the required args.
    
    // const [on, setOn] = React.useState(props.on);
    // function toggle() {
    //     setOn((prevState) => !prevState);
    // }



    const style = {
        backgroundColor: props.on ? "#222222" : "transparent"
    }
    return (
        <div onClick={() => props.toggle(props.id)} style={style} className="box"></div>
    );
}

function Joke(props) {
    const [isShown, setIsShown] = React.useState(false);
    function toggle() {
        setIsShown(prev => !prev)
    }
    /**
     * Challenge:
     * - Create state `isShown` (boolean, default to `false`)
     * - Add a button that toggles the value back and forth
     */
    return (
        <div>
            {props.setup && <h3 className="font-bold text-xl my-3">{props.setup}</h3>}
            {isShown && <p className="text-gray-600">{props.punchline}</p>}
            <button onClick={toggle} className=" bg-slate-400 toggle-punchline">{isShown ? "Hide Punchline" : "Show Punchline"}</button>
            <hr />
        </div>
    )
    // these here are examples of conditional rendering. note that if there are more than two choices of options to choose from then we can use a simple switch or if else statements outside the JSX.
}

export default function App() {
    // const [square, setSquare] = React.useState(boxes);
    // // ok so we can apply dynamic styles too in react. styles that can change based on some code. so we init an object called styles. note that the attributes it is using is of the dom.styles. then we can pass the style object directly in jsx elements as properties.
    // function toggle(id) {
    //     // setSquare((prevValue) => {
    //     //     let newArray = [];
    //     //     for (const value of prevValue) {
    //     //         if (value.id === id) {
    //     //             let newObj = {
    //     //                 ...value,
    //     //                 on: !value.on
    //     //             };
    //     //             newArray.push(newObj);
    //     //         }
    //     //         else newArray.push(value);
    //     //     }
    //     //     return newArray;
    //     // })
    //     // Lol this was the nalla way of doing this. now the pro version using the .map
    //     setSquare((prevValue) => {
    //         return prevValue.map((value) => {
    //             return value.id === id ? {...value, on: !value.on} : value;
    //         })
    //     })
    // }
    

    // const box = square.map((value) => {
    //     return <Box on={value.on} toggle={toggle} id={value.id}/>
    // });
    const jokeElements = jokes.map(joke => {
        return (
            <Joke 
                key={joke.id}
                setup={joke.setup} 
                punchline={joke.punchline} 
            />
        )
    })
    return (
        <div className="flex flex-wrap">
            {/* <Counter /> */}
            {/* {box} */}
            {jokeElements}
        </div>
    ); 
}

/*
So the workflow of react is that it goes top down. that is that first it would render the App component and then any other component which falls down the road. But whenever any state change occurs in a components state. react re renders the component. that means the code inside the component runs again.
*/
/*
Ok so suppose that a child component has to change a prop sent to the child component and child component has to modify the prop, what we can do is send the state setter function in as well as a prop with the state variable. then we can call the state setter function in the child component so that it can change the state of the parent state.
*/
/*
I am doing the boxes challenge here.
*/