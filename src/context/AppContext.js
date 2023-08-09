import { createContext } from "react";

const AppContext = createContext();

export const AppContextProvider = ({children}) => {

    return (
        <AppContext.Provider
        value={{

        }}>
            {children}
        </AppContext.Provider>
    )
};

export default AppContext;