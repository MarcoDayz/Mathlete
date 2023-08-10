import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { genProblem } from "../math";

const Quiz = () => {
    const {isCounting, setIsCounting, myInterval, setIncorrectArr, incorrectArr, nav} = useContext(AppContext);
    let {setCorrect, setIncorrect, correct, incorrect} = useContext(AppContext);
    const [value, setValue] = useState("");
    let [count, setCount] = useState("" || parseInt(sessionStorage.getItem("t")));
    const [sub, setSub] = useState("" || sessionStorage.getItem("s"));
    const [equation, setEquation] = useState(genProblem(sub));
    const [index, setIndex] = useState(Math.floor(Math.random() * 4));

    useEffect(() => {
        setIncorrectArr([])
        setCorrect(0)
        setIncorrect(0)
        setIsCounting(true)
        return () => clearInterval(myInterval.current);
      }, []);

    useEffect(() => {
        if(isCounting){
            myInterval.current = setInterval(() => {
                setCount(count -= 1)
                checkCount()
                // console.log(count)
            }, 1000)
        }else{
            clearInterval(myInterval.current)
            myInterval.current = null
        }

    }, [isCounting]);

    function resetCounter() {
        clearInterval(myInterval.current);
        myInterval.current = null;
        setCount(0);
        setIsCounting(false);
      }

    const checkCount = () => {
        if(count <= 0){
            resetCounter()
            nav("/mathlite_results")
        }
    }

    const randomize = () => {
        setIndex(Math.floor(Math.random() * 4))
    }

    const handleResetForm = () => {
        setEquation(genProblem(sub))
        document.getElementById("form").reset();
        setValue("")
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(value, typeof value)
        if(value === ''){
            return;
        }else if(value === parseInt(equation.solution)){
            setCorrect(correct+=1);
        }else{
            let {problem} = equation;
            let savedIncorrect = {problem: problem, solution: value}
            setIncorrectArr([savedIncorrect,...incorrectArr])
            setIncorrect(incorrect+=1);
        }
        handleResetForm()
        randomize()
    }

    const handleSelect = (e) => {
        setValue(parseInt(e.target.value))
    }

    return (
        <div className="quiz-main">
            <h1>Timer: {count}</h1>
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
    )
};

export default Quiz;