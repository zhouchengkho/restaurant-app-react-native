import React from 'react';

import {StackNavigator, TabNavigator, DrawerNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

//==================================================================================================================
// Root navigator
export const createRootNavigator = (signedIn = false) => {
    return StackNavigator(
        {
            SignedIn: {
                screen: SignedIn,
                navigationOptions: {
                    gesturesEnabled: false
                }
            },
            SignedOut: {
                screen: SignedOut,
                navigationOptions: {
                    gesturesEnabled: false
                }
            }
        },
        {
            headerMode: "none",
            mode: "modal",
            initialRouteName: signedIn ? "SignedIn" : "SignedOut"
        }
    );
};

//==================================================================================================================
// SignedOut navigator

import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Map from './screens/Map';
import Verification from './screens/Verification';

export const SignedOut = StackNavigator({
    SignIn: {
        screen: SignIn,
        navigationOptions: {
            title: "Sign In"
        }
    },
    SignUp: {
        screen: SignUp,
        navigationOptions: {
            title: "Sign Up"
        }
    },
    ForgotPassword: {
      screen: ForgotPassword,
        navigationOptions: {
          title: "Forgot Password"
        }
    },
    Verification: {
        screen: Verification,
        navigationOptions: {
            title: "Verification"
        }
    },
    VerifyPasswordReset: {
        screen: VerifyPasswordReset,
        navigationOptions: {
            title: "VerifyPasswordReset"
        }
    }
}, {
    mode: 'modal',
    headerMode: 'none',
});


//==================================================================================================================
// SignedIn - Home

import Home from "./screens/Home";
import BillDetail from "./screens/BillDetail";
import ProviderDetail from "./screens/ProviderDetail";
import PayBill from "./screens/PayBill";
import PaymentOptions from "./screens/PaymentOptions";
import UserView from "./screens/UserView";

export const HomeStack = StackNavigator({
    Home: {
        screen: Home
    },
    BillDetail: {
        screen: BillDetail
    },
    ProviderDetail: {
        screen: ProviderDetail
    },
    PayBill: {
        screen: PayBill
    },
    PaymentOptions: {
        screen: PaymentOptions
    },
    UserView: {
        screen: UserView
    },
    Map: {
        screen: Map
    }
}, {
    headerMode: 'none'
});

//==================================================================================================================
// SignedIn - Drawer Menu

import Profile from "./screens/Profile";
import Tinder from "./screens/Tinder";
import Settings from "./screens/Settings";
import Tokens from "./screens/Tokens";
import Wallpaper from "./screens/Wallpaper";
import UpdateProfile from "./screens/UpdateProfile";
import ForgotPassword from "./screens/ForgotPassword";
import VerifyPasswordReset from "./screens/VerifyPasswordReset";

export const SettingsStack = StackNavigator({
    Settings: {
        screen: Settings
    },
    Tokens: {
        screen: Tokens
    }
}, {
    headerMode: 'none'
});

export const ProfileStack = StackNavigator({
    Profile: {screen: Profile},
    UpdateProfile: {screen: UpdateProfile}
}, {
    headerMode: 'none'
});

export const TinderStack = StackNavigator({
    SwipePage: {screen: Tinder},
}, {
    headerMode: 'none'
});

export const SignedIn = DrawerNavigator({
    Home: {
        screen: HomeStack,
        navigationOptions: {
            drawerLabel: 'Home',
            drawerIcon: ({tintColor}) => <Icon name="home" color={tintColor}/>,
        }
    },
    Profile: {
        screen: ProfileStack,
        navigationOptions: {
            drawerLabel: 'Profile',
            drawerIcon: ({tintColor}) => <Icon name="user-circle" color={tintColor}/>,
        }
    },
    Settings: {
        screen: SettingsStack,
        navigationOptions: {
            drawerLabel: 'Settings',
            drawerIcon: ({tintColor}) => <Icon name="cogs" color={tintColor}/>,
        }
    },
    Tinder: {
        screen: TinderStack,
        navigationOptions: {
            drawerLabel: 'Tinder',
            drawerIcon: ({tintColor}) => <Icon name="fire" color={tintColor}/>,
        }
    }
}, {
    headerMode: 'none'
});