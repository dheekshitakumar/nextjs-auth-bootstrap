import React, { useState, useEffect, useContext, createContext } from "react";
import { 
    signInWithRedirect, 
    GoogleAuthProvider, 
    signOut, 
    onAuthStateChanged } from "firebase/auth";
import fbauth from "./firebase"

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
    const provider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const signin = () => {
        return signInWithRedirect(fbauth, provider)
            .then((response) => {
            const credential = GoogleAuthProvider.credentialFromResult(response);
            const token = credential.accessToken;
            setUser(response.user);
            return response.user;
            })
            .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(errorCode);
            console.log(errorMessage);
            console.log("Error email: ", email);
            console.log("AuthCred: ", credential);
            });
    };


    const signout = () => {
        return signOut(fbauth)
            .then(() => {
                setUser(false);
             });
    };

    useEffect(() => {
        return onAuthStateChanged(fbauth, (user) => {
        if (user) {
            setUser(user);
        } else {
            setUser(false);
        }
        });
    }, []);

    return {
        user,
        signin,
        signout,
    };
}
