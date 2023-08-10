import { useContext } from "react";
import AppContext from "../context/AppContext";

const Landing = () => {
    const {nav} = useContext(AppContext);

    return (
    <div className="spash-main">
        <h1>Welcome to Mathlete</h1>
        <p>Compete against time to answer as many mathematical equations as possible</p>
        <button onClick={() => nav('/pref_setup')}>Get Started</button>
    </div>
    )
}
export default Landing;