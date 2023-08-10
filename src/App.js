import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import PreferenceSetup from "./pages/PreferenceSetup";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";

const App = () => {
   
    return (
        <Routes>
            <Route path="/" element={<Landing />}/>
            <Route path="/pref_setup" element={<PreferenceSetup />}/>
            <Route path="/mathlite_quiz" element={<Quiz />}/>
            <Route path="/mathlite_results" element={<Results />}/>
        </Routes>
    )
};

export default App;