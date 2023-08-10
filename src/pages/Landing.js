import { useContext } from "react";
import AppContext from "../context/AppContext";

const Landing = () => {
    const {nav} = useContext(AppContext);

    return (
    <div className="spash-main">
        <h1>Welcome to Mathlite</h1>
        <p></p>
        <button onClick={() => nav('/pref_setup')}>Get Started</button>
    </div>
    )
}
export default Landing;