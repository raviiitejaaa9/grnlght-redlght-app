import { useState, useContext } from "react"

import UserContext from "../../contexts/UserContext";

import "./index.css"
import userContext from "../../contexts/UserContext";

const Registration = () => {

    const {reqName, reqEmail, reqNumber, reqLevel, changeUserDetails} = useContext(userContext)

    const [name,setName] = useState("");
    const [email, setEmail] = useState("");
    const [number,setNumber] = useState("");
    const [level, setLevel] = useState("easy");
    const [errorMsg, setErrorMsg] = useState("");

    /* Submit Event  */
    const submitForm = (event) => {
        event.preventDefault()

        if (name === ""){
            setErrorMsg("*Please Enter your Gaming Name")
        } 
        else if (email === "") {
            setErrorMsg("*Please Enter your mail Address")
        }
        else if (email !== "") {
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (emailPattern.test(email)) {
                setErrorMsg("");
            } else {
                setErrorMsg("Please enter a valid Email");
            }
        }
        else if (number === "") {
            setErrorMsg("*Please Enter your Number")
        } 
        else if (!NaN(number)){
            setErrorMsg("*Number should consist of digits only")
        }
        else {
            changeUserDetails({
                reqName : name,
                reqEmail : email,
                reqNumber : number,
                reqLevel : level,
            })
            
            const playerData = {
                name,
                email,
                number,
                level
            }
            const stringifiedData = JSON.stringify(playerData);
            const savedDetails = localStorage.setItem("playerDetails",stringifiedData);
            console.log(localStorage.getItem("playerDetails"))
        }
        
        
    }


    /* Blur Events  */
    const onNameBlur = (event) => {
        const enteredName = event.target.value
        // console.log("name blur triggered")
        // console.log(enteredName === "")
        if (enteredName === "") {
            setErrorMsg("*Please Enter your Gaming Name");
        }
        else{
            setErrorMsg("");
        }
    } 

    const onEmailBlur = (event) => {
        const enteredEmail = event.target.value;
        if (enteredEmail === "") {
            setErrorMsg("You have to enter your mail address ");
        } else {
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (emailPattern.test(enteredEmail)) {
                setErrorMsg("");
            } else {
                setErrorMsg("Please enter a valid mail address");
            }
        }
    }

    const onNumberBlur = event => {
        const enteredNumber = event.target.value;
        if (enteredNumber === "") {
            setErrorMsg("*Please Enter your Valid Number");
        } else {
            const isNumberValid = enteredNumber.split('').every(character => !isNaN(character));
            if (isNumberValid) {
                setErrorMsg("");
            } else {
                setErrorMsg("*Number should only consist of digits");
            }
        }
    }

    /* Change Events */

    const onNameChange = (event) => {
        const enteredName = event.target.value
        // console.log("name change triggered")
        setName(enteredName);
    }

    const onEmailChange = (event) => {
        const enteredEmail = event.target.value 
        setEmail(enteredEmail)
    }

    const onNumberChange = (event) => {
        const enteredNumber = event.target.value;
        setNumber(enteredNumber);

    }

    const onLevelChange = (event) => {
        const selectedLevel = event.target.value
        setLevel(selectedLevel);
    }


    
    // returning an form element 
    return(
        <div className="registration-page" >
            <h1 className="game-head" > <span className="green-color" >GreenLight</span> <span className="red-color" > RedLight </span> Game  </h1>
            <form onSubmit = {submitForm} className="registration-form" >
                <div className="input-container"  >
                    <label className="label-el"  htmlFor="name" > Name </label>
                    <input required onChange = {onNameChange} onBlur={onNameBlur} className="input-el"  type = "input" placeholder="Enter your Gaming Name" id = "name"/>    
                </div>

                <div className="input-container"  >
                    <label className="label-el"  htmlFor="email" > Email </label>
                    <input required onChange={onEmailChange}  onBlur={onEmailBlur}  className="input-el"  type="email" placeholder="Enter your Email" id = "email"   />
                </div>

                <div className="input-container"  >
                    <label className="label-el"  htmlFor="number" > Number </label>
                    <input required onChange={onNumberChange} onBlur={onNumberBlur}  className="input-el"  type = "input" placeholder="Enter your Number" id = "number"   />
                </div>

                <div className="radio-input-container" >
                    <div className="radio-input" >
                        <label htmlFor="easy" className="radio-label"  > Easy </label>
                        <input 
                        onChange = {onLevelChange} className="radio-el" 
                        type = "radio" name = "difficulty" 
                        id = "easy" value = "easy" defaultChecked />
                    </div>

                    <div className="radio-input"  >
                        <label htmlFor="medium"className="radio-label" > Medium </label>
                        <input 
                        onChange = {onLevelChange} className="radio-el"
                        type = "radio" name = "difficulty" 
                        id = "medium" value = "medium" />
                    </div>

                    <div className="radio-input" >
                        <label htmlFor="hard" className="radio-label" > Hard </label>
                        <input 
                        onChange = {onLevelChange} className="radio-el"
                        type = "radio" name = "difficulty" 
                        id = "hard" value = "hard" />
                    </div>
                </div>
                <p className="error-el" > {errorMsg} </p>
                <button className="submit-button" type = "submit" >
                    Start Game 
                </button>
            </form>
        </div>
    )

}

export default Registration