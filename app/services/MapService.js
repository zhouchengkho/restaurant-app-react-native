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


    handleAttributesFromHome(data) {
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

    handleAttributesFromTinder(data) {
        let result = {
            region: {
                latitude: data[0].coordinate.lat,
                longitude: data[0].coordinate.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            markers: []
        };
        data.forEach(item => {
            let marker = {
                name: item.name,
                address: item.address,
                phone: item.phone,
                coordinate: {
                    latitude: item.coordinate.lat,
                    longitude: item.coordinate.lng
                },
                image: item.image_url
            }
            result.markers.push(marker);
        });
        return result;
    }
}

export const MapService = new MapServiceImpl();