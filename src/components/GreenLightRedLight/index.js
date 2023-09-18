import {useNavigate } from "react-router-dom";
import {useState, useEffect, useRef} from "react"

import "./index.css"

/* using apiConstants for setting game state */
const apiConstants = {
    playing : "PLAYING",
    gameOver : "GAME OVER",
    gameWon : "GAME IS WON"
}

function GreenLightRedLight () {
    const navigate = useNavigate()

    /* Getting the user data from localstorage and parsifying it to object */
    const stringifiedPlayerData = localStorage.getItem("playerDetails");
    const playerData = JSON.parse(stringifiedPlayerData)
    
    /* Destructuring the UserData */
    const { name, email, number, level } = playerData;
    const reqName = name.charAt(0).toUpperCase() + name.slice(1);
    const reqLevel = level.charAt(0).toUpperCase()+level.slice(1);
    let winScore = null;
    let colorChangeTime = null;
    if (level === "easy") {
        winScore = 10;
        colorChangeTime = 1500;
    }
    else if (level === "medium") {
        winScore = 15;
        colorChangeTime = 1250;
    }
    else {
        winScore = 25;
        colorChangeTime = 1000;
    }

    /* Setting the Required State Components  */ 
    const [score, setScore] = useState(0)
    const [gameTimer, setGameTimer] = useState(40)
    const [color, setColor] = useState(getRandomColor())
    const [gameState , setGameState] = useState(apiConstants.playing)
    
    /* using useRef for setInterval timer id's which can sustain a re-render*/
    const gameTimerId = useRef(null)
    const randomColorId = useRef(null)

    function getRandomColor () {
        const randomNum = Math.ceil(Math.random() * 10);
        const randomColor = randomNum > 5 ? "green" : "red";
        // console.log(randomColor)
        return randomColor
    }

    function timerDecrement() {
        setGameTimer((prevTime) => {
          if (prevTime === 1) {
            clearInterval(gameTimerId.current);
            setGameState(apiConstants.gameOver);
            return 0;
          } else {
            return prevTime - 1;
          }
        });
      }

    /* useEffects for updating the callbacks at time intervals */  
    useEffect(()=> {
        gameTimerId.current = setInterval(() => {
            timerDecrement();  
        },1000);
        
        return () => {
            clearInterval(gameTimerId.current);
        };
    },[])

    useEffect(() => {
        randomColorId.current = setInterval(() => {
          setColor(getRandomColor());
        }, colorChangeTime);
    
        return () => {
          clearInterval(randomColorId.current);
        };
      }, [colorChangeTime]);


      useEffect(() => {
        if (gameState === apiConstants.gameWon || gameState === apiConstants.gameOver) {
          clearInterval(randomColorId.current);
        }
      }, [gameState]);
      
    /* for increasing score  */  
    const onClickColor = () => {
        console.log("click triggered")
        if (color === "green"){
            setScore(score + 1)
            if (score + 1 === winScore) {
                setGameState(apiConstants.gameWon)
                clearInterval(gameTimerId.current)
            }
        getRandomColor()
        }
        else {
            setGameState(apiConstants.gameOver)
            clearInterval(gameTimerId.current)
        }

    }

    const onClickRestart = () => {
        window.location.reload()
    }

    /* game components to be displayed based on game state   */

    const gamePlayingComponent = () => (
        <div className="game-container" >
            {/* mobile score component  */}  
            <h2 className="font-red mobile-timer " > Timer : {gameTimer} </h2>

            <div className="mobile-score-container" >
                 <h2 className="font-blue mobile-scores " > Win Score : {winScore} </h2>
                 <h2 className="font-green mobile-scores " > Your Score : {score} </h2>
             </div>
            
            <div className= {`color-container ${color}`} onClick={onClickColor}  >
                <p>  </p>
            </div>
        </div>
    )

    const gameOverComponent = () => (
        <div className="game-container" >
            {/* mobile score component  */}  
            <h2 className="font-red  mobile-timer " > Timer : {gameTimer} </h2>

            <div className="mobile-score-container" >
                <h2 className="font-blue mobile-scores " > Win Score : {winScore} </h2>
                <h2 className="font-green mobile-scores " > Your Score : {score} </h2>
            </div>

            <h1 className="font-red" > Game Over ! </h1>
            <button type="button" className="restart-button" onClick={onClickRestart} > Restart </button>
        </div>
    )

    const GameWonComponent = () => (
        <div className="game-container" >
            {/* mobile score component  */}  
            <h2 className="font-red mobile-timer " > Timer : {gameTimer} </h2>

            <div className="mobile-score-container" >
                <h2 className="font-blue mobile-scores " > Win Score : {winScore} </h2>
                <h2 className="font-green mobile-scores " > Your Score : {score} </h2>
            </div>

            <h1 className="font-green mobile-game-won "> Congrats. You have Won the Game </h1>
            <button type="button" className="play-again-button"  onClick={onClickRestart} > Play Again ? </button>
        </div>
        
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

    const onClickLogout = async() => {
        await localStorage.removeItem("authentication")
        navigate("/", {replace : true})
    }

    return(
        <div className="app-container" >
            <div className="navbar" >
                <div className="details-container" >

                    <div className="details" >
                        <p>Welcome to the Game, <span className="name" > {reqName} </span></p>
                        <p>Email: <span className="name" > {email} </span></p>
                    </div> 

                    <div className="details" >
                        <p>Number: <span className="name" > {number} </span></p>
                        <p>Level: <span className="name" > {reqLevel} </span></p>
                    </div>

                </div>
                
                <div className="score-container" >
                    <h3 className="font-blue" > Win Score : {winScore} </h3>
                    <h3 className="font-green" > Your Score : {score} </h3>
                </div>

                <h1 className="font-red" > Timer : {gameTimer} </h1>
                <button type="button" className="logout-button"  onClick={onClickLogout} > End Game  </button>
           </div> 

           {/* mobile navbar  */ } 
           <div className="mobile-navbar" >
                <p> Hello <span className="name" > {reqName} </span> </p>
                <p>Level: <span className="name" > {reqLevel} </span></p>
                <button className="logout-button" type="button" onClick={onClickLogout}  > End Game </button>
           </div>


           {gameComponent()}  
           
        </div>
    )

}

export default GreenLightRedLight

