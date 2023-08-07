import { useState } from "react";
import { genProblem } from "./math";

const App = () => {
    const [incorrectArr, setIncorrectArr] = useState([]);
    const [equation, setEquation] = useState(genProblem());
    const [index, setIndex] = useState(Math.floor(Math.random() * 4));
    let [counter, setCounter] = useState(60);
    const [value, setValue] = useState("");
    const [started, setStarted] = useState(false);
    const [showResults, setShowResults] = useState(false);
    let [correct, setCorrect] = useState(0);
    let [incorrect, setIncorrect] = useState(0);

    const timer = () => {
        const t = setInterval(() => {
            setCounter(counter -= 1);
            if(counter <= 0){
                clearInterval(t);
                setShowResults(true)
                setCounter(60)
            }
        }, 1000);
    }

    const newEquation = () => {
        setEquation(genProblem())
    }

    const handleSelect = (e) => {
        setValue(parseInt(e.target.value))
    }

    const handleResetForm = () => {
        newEquation()
        document.getElementById("form").reset();
        setValue("")
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(value === ''){
            return;
        }else if(value === parseInt(equation.solution)){
            setCorrect(correct+=1);
        }else{
            let {problem} = equation;
            const savedIncorrect = {problem: problem, solution: value}
            setIncorrectArr([savedIncorrect,...incorrectArr])
            setIncorrect(incorrect+=1);
        }
        handleResetForm()
        randomize()
    }

    const randomize = () => {
        setIndex(Math.floor(Math.random() * 4))
    }

    const handleStarted = () => {
        if(showResults){
            setShowResults(!showResults)
            setIncorrectArr([])
            setCorrect(0)
            setIncorrect(0)
        }
        if(!started){
            setStarted(true)
        }  
        timer()  
    }

    if(showResults){
        return (
            <div className="rslt-main">
                <button onClick={handleStarted}>Try Again</button>
                <h1>Results</h1>
                <h3>{correct} of {correct + incorrect} correct</h3>
                <h3>{Math.floor((correct / (correct + incorrect)) * 100) || 0}% Accuracy</h3>
                {incorrectArr.length === 0 && correct > 0 ?
                <h1>Congratulations, you answered all the questions correct!</h1>
                :
                <>
                    <h1>Incorrect Answers: {incorrect}</h1>
                    <div className="incorrect-container">
                        {incorrectArr.map((e, i) => (
                            <h3 key={i}>{e.problem} = {e.solution}</h3>
                        ))}
                    </div>
                </>
                }
            </div>
        )
    }else{
        return (
            <>
                {!started ?
                <div className="spash-main">
                    <h1>Welcome to Mathlite</h1>
                    <p>You'll have 1 minute to answer as many addition, subtraction, and multiplication problems as possible.</p>
                    <p>Good Luck!</p>
                    <button onClick={handleStarted}>Start Mathlite</button>
                </div>
                :
                <div className="quiz-main">
                    <h1>Timer: {counter}</h1>
                    <h1>{equation.problem} = __</h1>
                    <form id="form" onSubmit={handleSubmit}>
                        <div>
                            <input type="radio" id="answer" name="answers" value={index === 0? equation.solution : equation.solution-2} onClick={handleSelect}/>
                            <label htmlFor="answer"> {index === 0? equation.solution : equation.solution-2}</label><br/>
                        </div> 
                        <div>
                            <input type="radio" id="answer2" name="answers" value={index === 1? equation.solution : equation.solution+1} onClick={handleSelect}/>
                            <label htmlFor="answer2"> {index === 1? equation.solution : equation.solution+1}</label><br/>
                        </div> 
                        <div>
                            <input type="radio" id="answer3" name="answers" value={index === 2? equation.solution : equation.solution-1} onClick={handleSelect}/>
                            <label htmlFor="answer3"> {index === 2? equation.solution : equation.solution-1}</label><br/>
                        </div>
                        <div>
                            <input type="radio" id="answer4" name="answers" value={index === 3? equation.solution : equation.solution+2} onClick={handleSelect}/>
                            <label htmlFor="answer4"> {index === 3? equation.solution : equation.solution+2}</label><br/>
                        </div>
                        <input className="form-btn" type="submit" value={'Send'}/>
                    </form>
                </div>
                }
            </>
        )
    }
};

export default App;