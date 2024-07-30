import React, { createContext, useState, useEffect } from 'react';
import { gapi } from 'gapi-script';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = () => {
            gapi.auth2.init({
                client_id: '713709984183-p4rdcgcp73ocd23urfm1cf9g2njbecns.apps.googleusercontent.com',
            }).then(() => {
                const authInstance = gapi.auth2.getAuthInstance();
                const user = authInstance.currentUser.get();
                if (user.isSignedIn()) {
                    setUser(user.getBasicProfile());
                }
                setLoading(false);
            });
        };

        gapi.load('auth2', initAuth);
    }, []);

    const signIn = () => {
        const authInstance = gapi.auth2.getAuthInstance();
        authInstance.signIn().then((user) => {
            setUser(user.getBasicProfile());
        });
    };

    const signOut = () => {
        const authInstance = gapi.auth2.getAuthInstance();
        authInstance.signOut().then(() => {
            setUser(null);
        });
    };

    return (
        <AuthContext.Provider value={{ user, signIn, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
