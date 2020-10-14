import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/register/RegisterScreen";
import PopulateUserProfileScreen from "../screens/register/PopulateUserProfileScreen";
import { createStackNavigator } from 'react-navigation-stack';
import WelcomeScreen from "../screens/SplashScreen";
import PopUserIdentity from "../screens/register/PopUserIdentity";


export const AuthStack = createStackNavigator({
  Splash: WelcomeScreen,
  Login: LoginScreen,
  Register: RegisterScreen,
  PopUserIdentity: PopUserIdentity,
  PopulateUserProfile: PopulateUserProfileScreen
})
