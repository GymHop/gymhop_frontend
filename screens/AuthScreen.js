import React, {useEffect, useContext} from 'react';
import { Context as AuthContext} from '../context/AuthContext.js';

const ResolveAuthScreen = ({navigation}) => {
    const {tryLocalSignin} = useContext(AuthContext);
    useEffect(() => {
        tryLocalSignin()
    }, [])
    return null;
}

export default ResolveAuthScreen;