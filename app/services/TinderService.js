import {AccountService} from "./AccountService";
import {Config} from "../config";

const API_BASE = Config.API_BASE;

class TinderServiceImpl {

    constructor() {

    }

    getRestaurants() {
        console.log("UserProfileService.__getMe()");
        return new Promise((resolve, reject) => {
            // TODO: fetch result from lambda
            // AccountService.getSession()
            //     .then(session => {
            //         console.log("ID token: " + session.idToken.jwtToken);
            //
            //         // Fetch profile
            //         fetch(API_BASE + "/me", {
            //             headers: {Authorization: session.idToken.jwtToken}
            //         }).then(response => {
            //             if (response.status === 200) {
            //                 response.json().then(data => {
            //                     resolve(data.data);
            //                 });
            //             } else {
            //                 reject("ERR_GET_ME");
            //             }
            //         });
            //     })
            //     // Catch errors
            //     .catch(err => {
            //         console.log(err);
            //         reject(err);
            //     });
            resolve([
                {text: 'Tomato', backgroundColor: 'red'},
                {text: 'Aubergine', backgroundColor: 'purple'},
                {text: 'Courgette', backgroundColor: 'green'},
                {text: 'Blueberry', backgroundColor: 'blue'},
                {text: 'Umm...', backgroundColor: 'cyan'},
                {text: 'orange', backgroundColor: 'orange'},
            ])
        })
    }

    like(restaurantId) {

    }

    dislike(restaurantId) {

    }
}

export const TinderService = new TinderServiceImpl();