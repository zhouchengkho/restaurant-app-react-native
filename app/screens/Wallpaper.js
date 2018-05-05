import React, {Component} from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {Header} from "react-native-elements";

import bgSrc from '../../images/wallpaper.png';

export default class Wallpaper extends Component {
    render() {
        return (
            <View>
                <Header
                    backgroundColor='UIConstants.WHITE'
                    leftComponent={{
                        icon: 'close',
                        color: '#fff',
                        onPress: () => this.props.navigation.navigate("Home")
                    }}
                    centerComponent={{text: 'PAYENT', style: {color: '#fff'}}}
                />

                <View>
                    <Image source={bgSrc}>
                        {this.props.children}
                    </Image>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    picture: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
    },
});