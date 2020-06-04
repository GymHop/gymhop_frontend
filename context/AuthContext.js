import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import {navigate} from 'react-navigation';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'signin':
            return {token: action.payload}
        default:
            return state;
    }
}

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem("@Auth:APIToken");
    if (token) {
        dispatch({ type: 'signin', payload: token});
        navigate('Home');
    } else {
        navigate('Login')
    }
}

export const { Provider, Context} = createDataContext(
    authReducer,
    {tryLocalSignin},
    {token: null} //token: null, is basically the same thing as isSignedIn: false. No token, not signed in
)