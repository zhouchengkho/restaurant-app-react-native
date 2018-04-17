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
import { GiftedChat, Bubble } from 'react-native-gifted-chat'

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
        this.state.messages = [
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://d30y9cdsu7xlg0.cloudfront.net/png/113805-200.png',
                }
            },
        ];
    }

    //==================================================================================================================
    // Lifecycle methods

    componentWillMount() {
        console.log("Home.componentWillMount");
    }


    renderBubble (props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: "#fefefe"
                    },
                    right: {
                        backgroundColor: "#497ff4"
                    }
                }}
            />
        )
    }


    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
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
            <Button
                backgroundColor={UIConstants.BG_COLOR_1}
                title="HELLO WORLD"
                onPress={() => this.props.navigation.navigate("Chatbot")}
            />
            // <GiftedChat
            //     renderBubble={this.renderBubble}
            //     messages={this.state.messages}
            //     onSend={messages => this.onSend(messages)}
            //     user={{
            //         _id: 1,
            //     }}
            // />
        );
    }

}