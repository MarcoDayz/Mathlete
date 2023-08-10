import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";

const PreferenceSetup = () => {
    const {setIsCounting, nav} = useContext(AppContext);
    //controlled component
    const [subject, setSubject] = useState("");
    const [timelimit, setTimelimit] = useState(0);

    useEffect(() => {
        setIsCounting(false)
    },[])

    const handleChange = (e) => {
        let name = e.target.name;
        if(name === "subject"){
            setSubject(e.target.value)
        }
        if(name === "timelimit"){
            setTimelimit(e.target.value)
        }
    }

    const handlePreferences = (e) => {
        e.preventDefault()
        //to trigger counting state and navigate to quiz compo
        setIsCounting(true)
        handleNavigate()
        //reset input state
        storePreferences()
        setSubject("")
        setTimelimit(0)
    }

    const handleNavigate = () => {
        nav("/mathlite_quiz");
    }

    const storePreferences = () => {
        sessionStorage.setItem("s", subject);
        sessionStorage.setItem("t", timelimit);
    }

    return (
        <div className="pref-main">
            <h3>Select your preferences</h3>
            {/* <h3>Goodluck</h3> */}
            <form className="form" onSubmit={handlePreferences}>
                {/* <h1>Preference</h1> */}
                <select className="s" name="subject" value={subject} onChange={handleChange} required={true}>
                    <option value={""}>Math Subject</option>
                    <option value={"combo"}>All Subjects</option>
                    <option value={"+"}>Addition (+)</option>
                    <option value={"*"}>Multiplication (x)</option>
                    <option value={"-"}>Subtraction (-)</option>
                </select>
                <select name="timelimit" value={timelimit} onChange={handleChange} required={true}>
                    <option value={""}>Timelimit</option>
                    <option value={60}>60 sec</option>
                    <option value={120}>120 sec</option>
                </select>
                <input type="submit" value={"Start Mathlete"}/>
            </form>
        </div>
    )
};

export default PreferenceSetup;