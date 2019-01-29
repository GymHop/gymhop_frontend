import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen"
import { createStackNavigator } from 'react-navigation';


export const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
})


