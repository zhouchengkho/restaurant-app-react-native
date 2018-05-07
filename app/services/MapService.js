import React from 'react';
import {Config} from "../config";
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import {AccountService} from "./AccountService";

const API_BASE = Config.API_BASE;

class MapServiceImpl {

    constructor() {

    }

    /**
     *
     * @param that
     * @param region
     * @param markers {Array}
     * [
     *  {
     *      "latlng": {},
     *      "title": "",
     *      "description": ""
     *  }
     * ]
     * @returns {*}
     */
    renderMapViewWithMarkers(that, region, markers) {
        return (
            <MapView
                region={region}
            >
                {markers.map(marker => (
                    <Marker
                        coordinate={marker.coordinate}
                        title={marker.title}
                        description={marker.description}
                    />
                ))}
            </MapView>
        );
    }

    getRecommendedRestaurants() {
        return new Promise((resolve, reject) => {
            AccountService.getSession().then(session => {
                fetch(API_BASE + "/recommend",
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            user_id: session.idToken.payload["cognito:username"]
                        }),
                        headers: {}
                    })
                    .then(response => {
                        response.json().then((data) => {
                            console.log(data);
                            resolve(data.data)
                        })
                    }).catch(err => {
                        resolve({})
                })
            })
        })
    }
}

export const MapService = new MapServiceImpl();