import React from 'react';
import {Config} from "../config";
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

const API_BASE = Config.API_BASE;

class MockServiceImpl {

    constructor() {

    }

    getMarkers() {
        return new Promise((resolve, reject) => {
            resolve(
                [
                    {
                        title: "test",
                        description: "test",
                        coordinate: {
                            latitude: 37.78825,
                            longitude: -122.4324
                        }
                    }
                ]
            )
        })
    }

    getFakeMapData() {
        return {
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
        }
    }
}

export const MockService = new MockServiceImpl();