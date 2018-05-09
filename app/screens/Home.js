import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {GiftedChat, Actions, Bubble, SystemMessage} from 'react-native-gifted-chat';
import CustomActions from './CustomActions';
import CustomView from './CustomView';
import {UIConstants} from "../UIConstants";
import {Card, Header, List, ListItem, Button} from "react-native-elements";
import {ActivityIndicator, ScrollView, TouchableWithoutFeedback} from 'react-native';
import MapView from 'react-native-maps';
import {ChatService} from '../services/ChatService';
import {MockService} from "../services/MockService";
const uuid = require("uuid");

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [
                {
                    _id: uuid.v4(),
                    text: "Hey there, how can I help you today?",
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        // avatar: 'https://facebook.github.io/react/img/logo_og.png',
                    },
                }
            ],
            loadEarlier: true,
            typingText: null,
            isLoadingEarlier: false,
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            markers: [
                {
                    id: "HScFap2SwbUlfC-QXVkxFA",
                    name: "Xi'an Famous Foods",
                    coordinate: {
                        lat: "37.78825",
                        lng: "-122.4324"
                    },
                    rating: "4",
                    review_count: "1306",
                    image_url: "https://s3-media2.fl.yelpcdn.com/bphoto/GI5MSKJdeG5PXLlbwwzt8A/o.jpg"
                }
            ]
        };

        this._isMounted = false;
        this.onSend = this.onSend.bind(this);
    }

    componentWillMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    onSend(messages = []) {
        console.log(messages);
        ChatService.sendMessage(this, messages);
        ChatService.lexMessage(this, messages);
    }


    _renderHeader() {
        return (<Header
            backgroundColor={UIConstants.WHITE}
            leftComponent={{
                icon: 'navicon',
                color: UIConstants.TINDER_RED,
                type: 'font-awesome',
                onPress: () => this.props.navigation.navigate("DrawerOpen")
            }}
            centerComponent={{text: 'RESTAURANT', style: {color: UIConstants.TINDER_RED}}}
        />);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                {this._renderHeader()}
                <GiftedChat
                    messages={this.state.messages}
                    onSend={this.onSend}

                    user={{
                        _id: 1
                    }}

                    renderActions={ChatService.renderCustomActions}
                    renderBubble={ChatService.renderBubble}
                    renderSystemMessage={ChatService.renderSystemMessage}
                    renderCustomView={ChatService.renderCustomView}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    footerContainer: {
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
    },
    footerText: {
        fontSize: 14,
        color: '#aaa',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});