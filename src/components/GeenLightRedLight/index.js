import { useLocation } from "react-router-dom";
import {useState, useEffect, useContext} from "react"

import Registration from "../Registration"

import "./index.css"
import userContext from "../../contexts/UserContext";

const apiConstants = {
    playing : "PLAYING",
    gameOver : "GAME OVER",
    gameWon : "GAME IS WON"
}



function GreenLightRedLight () {
    // const location = useLocation();
    // const playerData = location.state?.playerData || {};  
    const { reqName, reqEmail, reqNumber, reqLevel } = useContext(userContext);
    
    const [score, setScore] = useState(0)
    const [color, setColor] = useState(getRandomColor())
    const [gameState , setGameState] = useState(apiConstants.playing)

    function getRandomColor () {
        const randomNum = Math.random();
        const randomColor = randomNum > 0.5 ? "green" : "red";
        return randomColor
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
          setColor(getRandomColor());
        }, 1500);
    
        return () => {
          clearInterval(intervalId);
        };
      }, []);


    
      
    const onClickColor = () => {
        console.log("click triggered")
        if (color === "green"){
            setScore(score + 1)
            if (score + 1 === 10) {
                setGameState(apiConstants.gameWon)
            }
        getRandomColor()
        }
        else {

            setGameState(apiConstants.gameOver)
        }

    }

    

    const gamePlayingComponent = () => (
        <div className="game-container" >
            <div className= {`color-container ${color}`} onClick={onClickColor}  >
                <p>  </p>
            </div>
        </div>
    )

    const gameOverComponent = () => (
        <h1> Game Over ! </h1>
    )

    const GameWonComponent = () => (
        <h1> Congrats. You have Won the Game </h1>
    )

    const gameComponent = () => {
        switch (gameState) {
            case apiConstants.playing:
                return gamePlayingComponent()
            case apiConstants.gameOver:
                return gameOverComponent()
            case apiConstants.gameWon:
                return GameWonComponent()    
            default:
                return null
                
        }
    }

    return(
        <div className="app-container" >
            <div className="navbar" >
                <div className="details-container" >

                    <div className="details" >
                        <h2>Welcome to the Game, {reqName}!</h2>
                        <p>Email: {reqEmail}</p>
                    </div> 

                    <div className="details" >
                        <p>Number: {reqNumber}</p>
                        <p>Level: {reqLevel}</p>
                    </div>

                </div>
                <h1> Score : {score} </h1>
           </div>  
           {gameComponent()}  
           
        </div>
    )

}

export default GreenLightRedLight

