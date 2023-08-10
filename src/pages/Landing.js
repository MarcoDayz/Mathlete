import { useContext } from "react";
import AppContext from "../context/AppContext";

const Landing = () => {
    const {nav} = useContext(AppContext);

    return (
    <div className="spash-main">
        <h1>Welcome to Mathlite</h1>
        <p>You'll have 1 minute to answer as many addition, subtraction, and multiplication problems as possible.</p>
        <p>Good Luck!</p>
        <button onClick={() => nav('/pref_setup')}>Get Started</button>
    </div>
    )
}
export default Landing;