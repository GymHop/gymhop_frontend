import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/register/RegisterScreen";
import PopulateUserProfileScreen from "../screens/register/PopulateUserProfileScreen";
import { createStackNavigator } from 'react-navigation';
import ResolveAuthScreen from "../screens/AuthScreen";


export const AuthStack = createStackNavigator({
  AuthScreen: ResolveAuthScreen,
  Login: LoginScreen,
  Register: RegisterScreen,
  PopulateUserProfile: PopulateUserProfileScreen
})
