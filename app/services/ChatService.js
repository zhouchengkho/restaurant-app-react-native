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
            }).then((res) => {
            //console.log("ressJson is " + JSON.stringify(res));
            res.json()
                .then((data)=> {
                    console.log("data is" + JSON.stringify(data.sessionAttributes));
                    me.onReceive(that, data.message);
                    if (JSON.stringify(data.sessionAttributes) != "{}") {
                        that.props.navigation.navigate('Map', me.handleAttributes(JSON.parse(data.sessionAttributes.restaurants)));
                    }
                })
        })
            .catch((err)=>{
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

    handleAttributes(data) {
        console.log(data[0]);
        return {
            region: {
                latitude: data[0].lat,
                longitude: data[0].long,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            markers: [{
                name: "name:    " + data[0].resname,
                address: "address: " + data[0].address,
                phone: "tele:   " + data[0].phone,
                image: data[0].image,
                coordinate: {
                    latitude: data[0].lat,
                    longitude: data[0].long
                }
            }, {
                name:    "name:    " + data[1].resname,
                address: "address: " + data[1].address,
                phone:   "tele:   " + data[1].phone,
                image: data[1].image,
                coordinate: {
                    latitude: data[1].lat,
                    longitude: data[1].long
                }
            }, {
                name: "name:    " + data[2].resname,
                address: "address: " + data[2].address,
                phone: "tele:   " + data[2].phone,
                image: data[2].image,
                coordinate: {
                    latitude: data[2].lat,
                    longitude: data[2].long
                }
            }]
        }
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