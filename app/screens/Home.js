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

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            loadEarlier: true,
            typingText: null,
            isLoadingEarlier: false,
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            markers: [{
                title: 'hello1',
                description: '321',
                latlng: {
                    latitude: 37.78825,
                    longitude: -122.4324
                },
            }, {
                title: 'hello2',
                description: '123',
                latlng: {
                    latitude: 37.749771,
                    longitude: -122.455449
                },
            }]
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
        // this.props.navigation.navigate('Map', { name: 'Jane' })
        ChatService.sendMessage(this, messages);
        ChatService.lexMessage(this, messages);
        this.props.navigation.navigate('Map');
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
            rightComponent={{
                icon: 'plus',
                color: UIConstants.TINDER_RED,
                type: 'font-awesome',
            }}
        />);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                {this._renderHeader()}
                <GiftedChat
                    messages={this.state.messages}
                    onSend={this.onSend}
                    loadEarlier={this.state.loadEarlier}
                    onLoadEarlier={this.onLoadEarlier}
                    isLoadingEarlier={this.state.isLoadingEarlier}

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