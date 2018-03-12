import React from "react";
import {ActivityIndicator, View} from "react-native";
import {Header, Card, Text, Button, List, ListItem, FormLabel} from "react-native-elements";
import {AccountService} from "../services/AccountService";
import {UIConstants} from "../UIConstants";
import {UserProfileService} from "../services/UserProfileService";

export default class Settings extends React.Component {


    //==================================================================================================================
    // Constructor
    constructor(props, context) {
        super(props, context);
        console.log("Settings.constructor");
        this.state = {};
    }

    //==================================================================================================================
    // Lifecycle functions
    componentWillMount() {
        console.log("Settings.componentWillMount");

        UserProfileService.getMe()
        // Set state
            .then(profile => this.setState({profile: profile}))
            // Catch errors
            .catch(err => {
                console.log(err);
                this.setState({error: err});
            });
    }

    componentDidMount() {
        console.log("Settings.componentDidMount");
        console.log(this.state.profile);
    }

    render() {
        console.log("Home.render");
        return this.state.error ? this._renderError() : (this.state.profile ? this._renderLoaded() : this._renderLoading());
    }

    _renderHeader() {
        return (<Header
            backgroundColor={UIConstants.BG_COLOR_1}
            leftComponent={{
                icon: 'close',
                color: '#fff',
                onPress: () => this.props.navigation.navigate("Home")
            }}
            centerComponent={{text: 'SETTINGS', style: {color: '#fff'}}}
        />);
    }

    _renderLoading() {
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                {this._renderHeader()}

                <View style={{flex: 1, justifyContent: 'center'}}>
                    <ActivityIndicator size="large" color={UIConstants.BG_COLOR_1}/>
                </View>
            </View>
        );
    }

    _renderError() {
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                {this._renderHeader()}

                <View style={{flex: 1, alignItems: "center", justifyContent: "center",}}>
                    <Text style={{justifyContent: 'center'}}>{this.state.error}</Text>
                </View>

                <Button
                    backgroundColor={UIConstants.BG_COLOR_1}
                    title="SIGN OUT"
                    onPress={() => AccountService.signOut() //
                    //
                        .then(res => {
                            this.props.navigation.navigate("SignedOut");
                        })
                        //
                        .catch(err => {
                            alert(err);
                        })}
                />
            </View>
        );
    }

    _renderLoaded() {
        return (
            <View>
                {this._renderHeader()}

                <View style={{paddingVertical: 20}}>
                    <Card title={this.state.profile.given_name + " " + this.state.profile.family_name}>
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
                            <Text style={{color: "white", fontSize: 28}}>
                                {this.state.profile.given_name ? this.state.profile.given_name.charAt(0) : ""}
                                {this.state.profile.family_name ? this.state.profile.family_name.charAt(0) : ""}
                            </Text>
                        </View>
                        <Button
                            backgroundColor={UIConstants.BG_COLOR_1}
                            title="SIGN OUT"
                            onPress={() => AccountService.signOut() //
                            //
                                .then(res => {
                                    this.props.navigation.navigate("SignedOut");
                                })
                                //
                                .catch(err => {
                                    alert(err);
                                })}
                        />
                    </Card>

                    <List>
                        <ListItem
                            key='1'
                            title="Security tokens"
                            onPress={() => this.props.navigation.navigate("Tokens", {screen: "Tokens"})}
                        />
                    </List>

                </View>
            </View>
        );
    }
}
