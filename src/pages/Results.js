import { useContext } from "react";
import AppContext from "../context/AppContext";


const Results = () => {
    const {correct, setCorrect, incorrect, setIncorrect, incorrectArr, setIncorrectArr, nav, setIsCounting} = useContext(AppContext);

    const getPercent = () => {
        const total = correct + incorrect;
        if(total === 0){
            return 0;
        }else{
            return Math.floor((correct / (correct + incorrect)) * 100);
        }
    }

    const handleNav = () => {

        setIncorrectArr([])
        setCorrect(0)
        setIncorrect(0)
        setIsCounting(true)
        nav("/mathlite_quiz")
    }

    return (
        <div className="rslt-main">
            <button onClick={handleNav}>Try Again</button>
            <button onClick={() => nav("/pref_setup", {replace: true})}>Change Preference</button>
            <h1>Results</h1>
            <h3>{correct} of {correct + incorrect} correct</h3>
            <h3>{getPercent()}% {getPercent() > 59 ? "Pass" : "Fail"}</h3>
            {incorrectArr.length === 0 && correct > 0 ?
            <h1><span>Congratulations, you answered all the questions correct!</span></h1>
            :
            <>
                <h1><span>Incorrect Answers: {incorrect}</span></h1>
                <div className="incorrect-container">
                    {incorrectArr.map((e, i) => (
                        <h3 key={i}>{e.problem} = {e.solution}</h3>
                    ))}
                </div>
            </>
            }
        </div>
    )
};

export default Results;