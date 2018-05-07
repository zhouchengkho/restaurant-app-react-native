// SwipeCards.js
'use strict';

import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, Dimensions, ImageBackground, Button} from 'react-native';
import {Header} from "react-native-elements";
import SwipeCards from 'react-native-swipe-cards';
import {UIConstants} from "../UIConstants";
import {TinderService} from "../services/TinderService";
import Icon from 'react-native-vector-icons/FontAwesome';
import {AccountService} from "../services/AccountService";
import {MockService} from "../services/MockService";

class Card extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ImageBackground
                    source={{uri: this.props.image_url}}
                    style={styles.backgroundImage}>
                    <Text style={styles.text}>{this.props.name}</Text>
                    <Text style={styles.text}>{this.props.rating}</Text>
                </ImageBackground>
            </View>
        )
    }
}

class NoMoreCards extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{backgroundColor: UIConstants.TINDER_RED}}>
                <Button
                    color={UIConstants.WHITE}
                    title="Recommend Me somme good stuff!"
                    onPress={() => {
                        this.props.navigation.navigate("Map", MockService.getFakeMapData())
                    }}
                />
            </View>
        )
    }
}

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        TinderService.getRestaurants().then((cards) => {
            this.setState({
                cards: cards
            })

        }).catch(err => {
            this.setState({
                cards: []
            })
        })
    }

    _renderHeader() {
        return (<Header
            backgroundColor={UIConstants.WHITE}
            leftComponent={
                <Icon name="close"  size={20} color={UIConstants.TINDER_RED} onPress={() => this.props.navigation.navigate("Home")}/>}
            centerComponent={<Icon name="fire" size={30} color={UIConstants.TINDER_RED}/>}
        />);
    }

    handleYup (card) {
        console.log(card);
        TinderService.like(card.id).then(result => {}).catch(err => {})
        console.log(`Yup for ${card.text}`)
    }
    handleNope (card) {
        TinderService.dislike(card.id).then(result => {}).catch(err => {})
        console.log(`Nope for ${card.text}`)
    }
    handleMaybe (card) {
        console.log(`Maybe for ${card.text}`)
    }
    render() {
        // If you want a stack of cards instead of one-per-one view, activate stack mode
        // stack={true}
        return (
            <View style={{
                flex: 1
            }}>
                {this._renderHeader()}
                <SwipeCards
                    cards={this.state.cards}
                    renderCard={(cardData) => <Card {...cardData} />}
                    renderNoMoreCards={() => <NoMoreCards {...this.props} />}

                    handleYup={this.handleYup}
                    handleNope={this.handleNope}
                    handleMaybe={this.handleMaybe}
                    hasMaybeAction
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        // justifyContent: 'flex-start',
        flex: 1,
        alignItems: 'center',
        width: Dimensions.get('window').width,
        // height: 300,
    },
    noMoreCardsText: {
        fontSize: 22,
    },
    backgroundStyle: {
        flex: 1,
        // remove width and height to override fixed static size
        alignSelf: 'stretch',
        width: null,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backgroundImage:{
        flex : 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        width : Dimensions.get('window').width
    },
    text: {
        alignSelf: 'center',
        color: UIConstants.WHITE,
        fontSize: 20
    }
})