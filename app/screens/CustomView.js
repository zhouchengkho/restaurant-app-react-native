import PropTypes from 'prop-types';
import React from 'react';
import {
    Linking,
    Platform,
    StyleSheet,
    TouchableOpacity,
    ViewPropTypes,
} from 'react-native';
import MapView from 'react-native-maps';
import { Maker } from 'react-native-maps';

export default class CustomView extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
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
        }
    }


    render() {
        if (this.props.currentMessage.location) {
            return (
                <TouchableOpacity style={[styles.container, this.props.containerStyle]} onPress={() => {
                    const url = Platform.select({
                        ios: `http://maps.apple.com/?ll=${this.props.currentMessage.location.latitude},${this.props.currentMessage.location.longitude}`,
                        android: `http://maps.google.com/?q=${this.props.currentMessage.location.latitude},${this.props.currentMessage.location.longitude}`
                    });
                    Linking.canOpenURL(url).then(supported => {
                        if (supported) {
                            return Linking.openURL(url);
                        }
                    }).catch(err => {
                        console.error('An error occurred', err);
                    });
                }}>
                    <MapView
                        style={[styles.mapView, this.props.mapViewStyle]}
                        region={{
                            latitude: this.props.currentMessage.location.latitude,
                            longitude: this.props.currentMessage.location.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        }}
                        scrollEnabled={false}
                        zoomEnabled={false}
                    >
                        {this.state.markers.map(marker => (
                            <MapView.Marker
                                coordinate={marker.latlng}
                                title={marker.title}
                                description={marker.description}
                            />
                        ))}
                    </MapView>
                </TouchableOpacity>
            );
        }
        return null;
    }
}

const styles = StyleSheet.create({
    container: {
    },
    mapView: {
        width: 150,
        height: 100,
        borderRadius: 13,
        margin: 3,
    },
});

CustomView.defaultProps = {
    currentMessage: {},
    containerStyle: {},
    mapViewStyle: {},
};

CustomView.propTypes = {
    currentMessage: PropTypes.object,
    containerStyle: ViewPropTypes.style,
    mapViewStyle: ViewPropTypes.style,
};
