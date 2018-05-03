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