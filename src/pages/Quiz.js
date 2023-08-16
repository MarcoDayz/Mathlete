import { useContext, useEffect, useState, useRef } from "react";
import AppContext from "../context/AppContext";
import { genProblem } from "../math";
import { useLocation } from "react-router-dom";

const Quiz = () => {
    const {isCounting, setIsCounting, myInterval, myTimeout, setIncorrectArr, incorrectArr, nav, input,input2, input3, input4,} = useContext(AppContext);
    let {setCorrect, setIncorrect, correct, incorrect} = useContext(AppContext);
    const [value, setValue] = useState("");
    let [count, setCount] = useState("" || parseInt(sessionStorage.getItem("t")) - 55);
    const [sub, setSub] = useState("" || sessionStorage.getItem("s"));
    const [equation, setEquation] = useState(genProblem(sub));
    const [index, setIndex] = useState(Math.floor(Math.random() * 4));

    //state for 
    const [barToggle, setBarToggle] = useState(true);
    const {pathname} = useLocation();

    useEffect(() => {
        setIsCounting(true)
        setIncorrectArr([])
        setCorrect(0)
        setIncorrect(0)
        return () => clearTimeout(myTimeout.current), clearInterval(myInterval.current);
      },[]);

    useEffect(() => {
        if(isCounting){
            myInterval.current = setInterval(() => {
                setCount(count -= 1)
                checkCount()
            }, 1000);
        }else{
            clearInterval(myInterval.current)
            myInterval.current = null
        }
    }, [isCounting]);

    useEffect(() => {
        if(pathname === "/mathlite_quiz"){
            myTimeout.current = setTimeout(() => {
                setBarToggle(!barToggle)
                // console.log("Time ran out")
                let {problem} = equation;
                let savedIncorrect = {problem: problem, solution: "_"}
                setIncorrectArr([savedIncorrect,...incorrectArr])
                setIncorrect(incorrect+=1);
                setEquation(genProblem(sub))
                clearSelect()
            }, 3000);
        }else{
            clearTimeout(myTimeout.current)
            myTimeout.current = null;
        }
    },[barToggle])

    const reset = () => {
        clearTimeout(myTimeout.current)
        setBarToggle(!barToggle)
    }

    const clear = () => {
        clearTimeout(myTimeout.current)
        myTimeout.current = null;
    }

    const clearSelect = () => {
        input.current.checked = false;
        input2.current.checked = false;
        input3.current.checked = false;
        input4.current.checked = false;
    }

    function resetCounter() {
        clearInterval(myInterval.current);
        myInterval.current = null;
        setIsCounting(false);
        setCount(0);
      }

    const checkCount = () => {
        if(count < 0){
            resetCounter()
            nav("/mathlite_results")
            clear()
        }
    }

    const randomize = () => {
        setIndex(Math.floor(Math.random() * 4))
    }

    const handleResetForm = () => {
        setEquation(genProblem(sub))
        clearSelect()
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
            let savedIncorrect = {problem: problem, solution: value}
            setIncorrectArr([savedIncorrect,...incorrectArr])
            setIncorrect(incorrect+=1);
        }
        handleResetForm()
        randomize()
        reset()
    }

    const handleSelect = (e) => {
        // console.log(input.current.checked)
        setValue(parseInt(e.target.value))
    }

    return (
        <div className="quiz-main">
            <h1>Timer: {count}</h1>
            <h1>{equation.problem} = __</h1>

            <div className={barToggle? "bar-timer" : "bar-off"}>
                <div></div>
            </div>

            <form id="form" onSubmit={handleSubmit}>
                <div>
                    <input ref={input} type="radio" id="answer" name="answers" value={index === 0? equation.solution : equation.solution-2} onClick={handleSelect}/>
                    <label htmlFor="answer"> {index === 0? equation.solution : equation.solution-2}</label><br/>
                </div> 
                <div>
                    <input ref={input2}  type="radio" id="answer2" name="answers" value={index === 1? equation.solution : equation.solution+1} onClick={handleSelect}/>
                    <label htmlFor="answer2"> {index === 1? equation.solution : equation.solution+1}</label><br/>
                </div> 
                <div>
                    <input ref={input3}  type="radio" id="answer3" name="answers" value={index === 2? equation.solution : equation.solution-1} onClick={handleSelect}/>
                    <label htmlFor="answer3"> {index === 2? equation.solution : equation.solution-1}</label><br/>
                </div>
                <div>
                    <input ref={input4}  type="radio" id="answer4" name="answers" value={index === 3? equation.solution : equation.solution+2} onClick={handleSelect}/>
                    <label htmlFor="answer4"> {index === 3? equation.solution : equation.solution+2}</label><br/>
                </div>
                <input className="form-btn" type="submit" value={'Send'}/>
            </form>
        </div>
    )
};

export default Quiz;