import { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";


const Results = () => {
    const {correct, incorrect, incorrectArr, nav} = useContext(AppContext);

    return (
        <div className="rslt-main">
            <button onClick={() => nav(-1)}>Try Again</button>
            <button onClick={() => nav("/pref_setup", {replace: true})}>Change Preference</button>
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
};

export default Results;