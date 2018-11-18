import LoginScreen from "../screens/LoginScreen";
import { createStackNavigator } from 'react-navigation';


export const AuthStack = createStackNavigator({
  Login: LoginScreen
})
