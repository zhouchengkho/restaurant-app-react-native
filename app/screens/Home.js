import React from 'react';
import {ActivityIndicator, ScrollView, Text, TouchableWithoutFeedback, View} from 'react-native';
import {Card, Header, List, ListItem, Button} from "react-native-elements";
import {TextInput} from "react-native";
import {UIConstants} from "../UIConstants";
import {BillService} from "../services/BillService";
import {UserProfileService} from "../services/UserProfileService";
import BillList from "../components/BillList";
import {AccountService} from "../services/AccountService";
import PopupDialog from 'react-native-popup-dialog';

export default class Home extends React.Component {

    //==================================================================================================================
    // Constructor
    constructor(props, context) {
        super(props, context);
        console.log("Home.constructor");

        this.state = {};
        this.state.me = {};
        this.state.myPeers = [];
        this.state.myDependents = [];
        this.state.helloWorldTitle = "init";
    }

    //==================================================================================================================
    // Lifecycle methods

    componentWillMount() {
        console.log("Home.componentWillMount");
    }

    fetchData() {

        // Get profile, peers and dependents
        Promise.all([
            UserProfileService.getMe(), UserProfileService.getMyPeers(), UserProfileService.getMyDependents()
        ])
        // Set state
            .then(res => {
                this.setState({profile: res[0], myPeers: res[1], myDependents: res[2]});
            })
            // Catch errors - which will also be promises
            .catch(err => {
                console.log(err);
                this.setState({error: err});
            });

        // Get bills
        BillService.getAllBills(/*(bill) => !bill.paidAt*/)
        // Set state
            .then(bills => this.setState({recentBills: bills}))
            // Catch errors
            .catch(err => this.setState({error: err}));
        // Get recent bills

    }

    componentDidMount() {
        console.log("Home.componentDidMount");
        this.fetchData();
    }

    render() {
        console.log("Home.render");
        return this.state.error ? this._renderError() : (this.state.profile ? this._renderLoaded() : this._renderLoading());
    }

    changePopUpTile(message) {
        this.setState({
            helloWorldTitle: message
        })
    }

    _renderHeader() {
        return (<Header
            backgroundColor={UIConstants.BG_COLOR_1}
            leftComponent={{
                icon: 'navicon',
                color: '#fff',
                type: 'font-awesome',
                onPress: () => this.props.navigation.navigate("DrawerOpen")
            }}
            centerComponent={{text: 'RESTAURANT', style: {color: '#fff'}}}
            rightComponent={{
                icon: 'plus',
                color: '#fff',
                type: 'font-awesome',
            }}
        />);
    }

    _renderError() {
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                {this._renderHeader()}

                <View style={{flex: 1, alignItems: "center", justifyContent: "center",}}>
                    <Text style={{justifyContent: 'center'}}>{this.state.error}</Text>
                </View>
            </View>
        );
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

    _renderLoaded() {
        return (
            <View>
                {this._renderHeader()}

                <ScrollView contentContainerStyle={{paddingBottom: 100}}>

                    <Card title={this.state.profile.given_name + " " + this.state.profile.family_name}>
                        <TouchableWithoutFeedback
                            onPress={() => this.props.navigation.navigate("UserView", {user: this.state.me})}
                        >
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
                        </TouchableWithoutFeedback>

                        <List>
                            <ListItem
                                title='Me'
                                leftIcon={{name: 'user-circle', type: 'font-awesome', size: 18}}
                                badge={{value: 3}}
                                onPress={() => this.props.navigation.navigate("UserView", {user: this.state.me})}
                            />
                        </List>
                    </Card>
                    <Button
                        backgroundColor={UIConstants.BG_COLOR_1}
                        title="HELLO WORLD"
                        onPress={() => AccountService.helloWorld()
                            .then(res => {
                                this.changePopUpTile(res.message);
                                this.popupDialog.show();
                                // show it here
                            })
                            .catch(err => {
                                alert(err);
                            })}
                    />
                    <PopupDialog
                        ref={(popupDialog) => {
                            this.popupDialog = popupDialog;
                        }}
                    >
                        <View>
                            <Text>{this.state.helloWorldTitle}</Text>
                        </View>
                    </PopupDialog>



                </ScrollView>
            </View>
        );
    }

}