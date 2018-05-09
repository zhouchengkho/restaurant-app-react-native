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
import {ActivityIndicator, ScrollView, TouchableWithoutFeedback, Image, WebView} from 'react-native';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class Map extends React.Component {
    constructor(props, context) {
        super(props);
        this.state = props.navigation.state.params;
        this._isMounted = false;
    }

    componentWillMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onLoadEarlier() {
        this.setState((previousState) => {
            return {
                isLoadingEarlier: true,
            };
        });
    }


    renderFooter(props) {
        if (this.state.typingText) {
            return (
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>
                        {this.state.typingText}
                    </Text>
                </View>
            );
        }
        return null;
    }

    onRegionChange(region) {
        this.setState({ region });
    }

    _renderHeader() {
        return (<Header
            backgroundColor={UIConstants.WHITE}
            leftComponent={{
                icon: 'close',
                color: UIConstants.TINDER_RED,
                onPress: () => this.props.navigation.goBack()
            }}
            centerComponent={<Icon name="map" size={30} color={UIConstants.TINDER_RED}/>}
        />);
    }

    render() {
        return (
            <View
                style={{flex: 1}}>

                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: this.state.region.latitude,
                        longitude: this.state.region.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    {this.state.markers.map(marker => (
                        <MapView.Marker
                            coordinate={marker.coordinate}
                        >
                            <MapView.Callout>
                                <Text>{marker.name}</Text>
                                <Text>{marker.address}</Text>
                                <Text>{marker.phone}</Text>
                                <Image resizeMode="contain" source={{uri: marker.image}} style={{height: 150, width: 150}} />
                            </MapView.Callout>
                        </MapView.Marker>
                    ))}
                </MapView>
                {this._renderHeader()}
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