import { createContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

export const AppContextProvider = ({children}) => {
    const nav = useNavigate();
    const [isCounting, setIsCounting] = useState(false);
    let [correct, setCorrect] = useState(0);
    let [incorrect, setIncorrect] = useState(0);
    const [incorrectArr, setIncorrectArr] = useState([]);

    //reference for interval
    const myInterval = useRef();

    return (
        <AppContext.Provider
        value={{
            nav,
            myInterval,
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