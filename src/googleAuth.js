import { useEffect } from 'react';
import { gapi } from 'gapi-script';

const initClient = () => {
    gapi.client.init({
        clientId: '713709984183-p4rdcgcp73ocd23urfm1cf9g2njbecns.apps.googleusercontent.com',
        scope: ''
    });
};

const useGoogleAuth = () => {
    useEffect(() => {
        gapi.load('client:auth2', initClient);
    }, []);
};

export default useGoogleAuth;
