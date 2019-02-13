import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/register/RegisterScreen";
import PopulateUserProfileScreen from "../screens/register/PopulateUserProfileScreen";
import { createStackNavigator } from 'react-navigation';


export const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
  PopulateUserProfile: PopulateUserProfileScreen
})
