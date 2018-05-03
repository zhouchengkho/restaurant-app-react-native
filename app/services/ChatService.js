import React from 'react';
import {Config} from "../config";
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import {GiftedChat, SystemMessage, Bubble} from "react-native-gifted-chat";
import CustomActions from '../screens/CustomActions';
import {Platform} from "react-native";
const API_BASE = Config.API_BASE;
const LEX_URL = Config.LEX_URL;
import CustomView from '../screens/CustomView';

class ChatServiceImpl {

    constructor() {

    }

    lexMessage(that, messages) {
        let me = this;
        fetch(LEX_URL,
            {
                method: 'POST',
                body: JSON.stringify({message: messages})
            }).then(function(res){
            console.log(res);
            res.json().then((data)=>{
                me.onReceive(that, data.data);
            })
        }).catch((err)=>{
            console.log(err)
        });
    }

    onReceive(that, message) {
        that.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, {
                    _id: Math.round(Math.random() * 1000000),
                    text: message,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        // avatar: 'https://facebook.github.io/react/img/logo_og.png',
                    },
                }),
            };
        });
    }

    sendMessage(that, messages) {
        that.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, messages),
            };
        });
    }

    renderCustomActions(props) {
        if (Platform.OS === 'ios') {
            return (
                <CustomActions
                    {...props}
                />
            );
        }
        const options = {
            'Action 1': (props) => {
                alert('option 1');
            },
            'Action 2': (props) => {
                alert('option 2');
            },
            'Cancel': () => {},
        };
        return (
            <Actions
                {...props}
                options={options}
            />
        );
    }

    renderCustomView(props) {
        return (
            <CustomView
                {...props}
            />
        );
    }

    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: '#f0f0f0',
                    }
                }}
            />
        );
    }

    renderSystemMessage(props) {
        return (
            <SystemMessage
                {...props}
                containerStyle={{
                    marginBottom: 15,
                }}
                textStyle={{
                    fontSize: 14,
                }}
            />
        );
    }

}

export const ChatService = new ChatServiceImpl();