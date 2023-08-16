import { createContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

export const AppContextProvider = ({children}) => {
    const nav = useNavigate();
    const [isCounting, setIsCounting] = useState(true);
    let [correct, setCorrect] = useState(0);
    let [incorrect, setIncorrect] = useState(0);
    const [incorrectArr, setIncorrectArr] = useState([]);

    const input = useRef(), input2 = useRef(), input3 = useRef(), input4 = useRef();

    //reference for interval Timeout
    const myInterval = useRef();
    const myTimeout = useRef();

    return (
        <AppContext.Provider
        value={{
            nav,
            myInterval,
            myTimeout,
            input,input2, input3, input4,
            isCounting, setIsCounting,
            correct, setCorrect,
            incorrect, setIncorrect,
            incorrectArr, setIncorrectArr
        }}>
            {children}
        </AppContext.Provider>
    )
};

export default AppContext;