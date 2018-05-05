import React from "react";
import libphonenumber from "libphonenumber-js";
import {ActivityIndicator, View} from "react-native";
import {Header, Card, List, ListItem, normalize} from "react-native-elements";
import {UIConstants} from "../UIConstants";
import {UserProfileService} from "../services/UserProfileService";

export default class Profile extends React.Component {


    //==================================================================================================================
    // Constructor
    constructor(props, context) {
        super(props, context);
        console.log("Profile.constructor");
        this.state = {};
        if (props.navigation.state.params && props.navigation.state.params.profile) {
            this.profile = props.navigation.state.params.profile;
        }
    }

    //==================================================================================================================
    // Async functions

    //==================================================================================================================
    // Lifecycle functions
    componentWillMount() {
        console.log("Profile.componentWillMount");

        UserProfileService.getMe()
        // Set state
            .then(profile => {
                // Format phone number
                profile.phone = profile.phone ? libphonenumber.format(profile.phone, profile.phone_country, 'International') : "";
                // Set state
                this.setState({profile: profile});
            })
            // Catch errors
            .catch(err => console.log(err));
    }

    render() {
        console.log("Profile.render");
        console.log(this.state.profile);
        return this.state.profile ? this._renderLoaded() : this._renderLoading();
    }

    _renderHeader() {
        return (<Header
            backgroundColor={UIConstants.WHITE}
            leftComponent={{
                icon: 'close',
                color: UIConstants.TINDER_RED,
                onPress: () => this.props.navigation.navigate("Home")
            }}
            centerComponent={{text: 'EDIT ACCOUNT', style: {color: '#fff'}}}
        />);
    }

    _renderLoading() {
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                {this._renderHeader()}

                <View style={{flex: 1, justifyContent: 'center'}}>
                    <ActivityIndicator size="large" color={UIConstants.WHITE}/>
                </View>
            </View>
        );
    }

    _renderLoaded() {
        return (
            <View>
                {this._renderHeader()}

                <View style={{paddingVertical: 20}}>
                    <Card>
                        <View
                            style={{
                                backgroundColor: "#bcbec1",
                                alignItems: "center",
                                justifyContent: "center",
                                width: 80,
                                height: 80,
                                borderRadius: 40,
                                alignSelf: "center",
                                marginBottom: 20
                            }}
                        >
                        </View>
                    </Card>

                    <List>
                        <ListItem
                            key='1'
                            title="First Name"
                            subtitle={this.state.profile.given_name}
                            titleStyle={{fontSize: normalize(10), color: UIConstants.GREY_A}}
                            subtitleStyle={{fontSize: normalize(14), color: UIConstants.BLACK}}
                            onPress={() => this.props.navigation.navigate("UpdateProfile", {
                                title: "EDIT FIRST NAME",
                                type: "given_name",
                                name: this.state.profile.given_name
                            })}
                        />
                        <ListItem
                            key='2'
                            title="Last Name"
                            subtitle={this.state.profile.family_name}
                            titleStyle={{fontSize: normalize(10), color: UIConstants.GREY_A}}
                            subtitleStyle={{fontSize: normalize(14), color: UIConstants.BLACK}}
                            onPress={() => this.props.navigation.navigate("UpdateProfile", {
                                title: "EDIT LAST NAME",
                                type: "family_name",
                                name: this.state.profile.family_name
                            })}
                        />
                        <ListItem
                            key='3'
                            title="Phone Number"
                            subtitle={this.state.profile.phone}
                            titleStyle={{fontSize: normalize(10), color: UIConstants.GREY_A}}
                            subtitleStyle={{fontSize: normalize(14), color: UIConstants.BLACK}}
                            onPress={() => this.props.navigation.navigate("UpdateProfile", {
                                title: "EDIT PHONE NUMBER",
                                type: "phone",
                                name: this.state.profile.phone
                            })}
                        />
                        <ListItem
                            key='4'
                            title="Email"
                            subtitle={this.state.profile.email}
                            titleStyle={{fontSize: normalize(10), color: UIConstants.GREY_A}}
                            subtitleStyle={{fontSize: normalize(14), color: UIConstants.BLACK}}
                            onPress={() => this.props.navigation.navigate("UpdateProfile", {
                                title: "EDIT EMAIL",
                                type: "email",
                                name: this.state.profile.email
                            })}
                        />
                        <ListItem
                            key='5'
                            title="Password"
                            subtitle="******"
                            titleStyle={{fontSize: normalize(10), color: UIConstants.GREY_A}}
                            subtitleStyle={{fontSize: normalize(14), color: UIConstants.BLACK}}
                            onPress={() => this.props.navigation.navigate("UpdateProfile", {
                                title: "EDIT PASSWORD",
                                type: "password",
                                name: ""
                            })}
                        />
                    </List>

                </View>
            </View>
        );
    }
}
