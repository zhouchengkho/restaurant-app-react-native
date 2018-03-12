import {AccountService} from "./AccountService";
import {MOCK_PATIENT_TO_BILLS} from "./BillService";

export const MOCK_USERS_MAP = {
    '5da591b5-88f6-419b-9110-314562d7c5b6': {
        id: '5da591b5-88f6-419b-9110-314562d7c5b6',
        given_name: 'Testerson',
        family_name: 'Test'
    },
    'd045fadb-6590-4a42-9839-52f3d2e203b8': {
        id: 'd045fadb-6590-4a42-9839-52f3d2e203b8',
        given_name: 'David',
        family_name: 'Smith'
    },
    'fb0ecb38-3fe4-4ebc-a396-c105cb7ec1d7': {
        id: 'fb0ecb38-3fe4-4ebc-a396-c105cb7ec1d7',
        given_name: 'Jessica',
        family_name: 'Smith'
    },
    '319dabfc-0704-4892-8532-869b94148949': {
        id: '319dabfc-0704-4892-8532-869b94148949',
        given_name: 'Bob',
        family_name: 'Smith'
    }
};

const MOCK_PEER_LIST = [
    MOCK_USERS_MAP['d045fadb-6590-4a42-9839-52f3d2e203b8']
];
const MOCK_DEP_LIST = [
    MOCK_USERS_MAP['fb0ecb38-3fe4-4ebc-a396-c105cb7ec1d7'],
    MOCK_USERS_MAP['319dabfc-0704-4892-8532-869b94148949']
];

const API_BASE = "";

class UserProfileServiceImpl {

    static SORT = (userA, userB) => userA.first_name.localeCompare(userB.first_name);

    //==================================================================================================================
    // Constructor
    constructor() {
        this.reset();
    }

    //==================================================================================================================
    // Init

    /**
     * Initialize profile service for new user session: rehydrate data from storage and fetch updates from server.
     */
    init() {
        console.log("UserProfileService.init()");
    }

    //==================================================================================================================
    // Reset

    /**
     * Called on logout - clean memory and storage
     */
    reset() {
        console.log("UserProfileService.reset()");
        // Lists
        this._myPeers = undefined;
        this._myDependents = undefined;
    }

    //==================================================================================================================
    // API

    /**
     * Get profile for current user. Throws error if error occurred during retrieval.
     */
    getMe() {
        console.log("UserProfileService.getMe()");
        // TODO: cache profiles
        return this.__getMe();
    }

    /**
     * Get profile for given userId. Returns null if user does not exist and throws error if not entitled to access or
     * error occurred during retrieval.
     */
    getUserProfile(userId) {
        console.log("UserProfileService.getProfile(" + userId + ")");
        // TODO: cache profiles
        return this.__getUserProfile(userId);
    }

    getMyPeers(callback) {
        console.log("UserProfileService.getMyPeers()");

        let promise = new Promise((resolve, reject) => {
            if (this._myPeers) {
                resolve(this._myPeers);
            } else {
                this.__getMyPeers((err, peerList) => {
                    if (err) {
                        reject(err);
                    } else {
                        this._myPeers = peerList;
                        resolve(this._myPeers);
                    }
                });
            }
        });

        if (callback) {
            promise.done(err => callback(err), res => callback(false, res));
        } else {
            return promise;
        }
    }

    getMyDependents(callback) {
        console.log("UserProfileService.getMyDependents()");

        let promise = new Promise((resolve, reject) => {
            if (this._myDependents) {
                resolve(this._myDependents);
            } else {
                this.__getMyDependents((err, dependentList) => {
                    if (err) {
                        reject(err);
                    } else {
                        this._myDependents = dependentList;
                        resolve(this._myDependents);
                    }
                });
            }
        });

        if (callback) {
            promise.done(err => callback(err), res => callback(false, res));
        } else {
            return promise;
        }
    }

    //==================================================================================================================
    // Private

    //==================================================================================================================
    // Server comms

    /**
     * GET /me
     */
    __getMe() {
        return new Promise((resolve, reject) => {
            // console.log("UserProfileService.__getMe()");
            //
            // AccountService.getSession()
            //     .then(session => {
            //
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
            resolve({
                family_name: 'foo',
                given_name: 'bar',
                email: 'foo.bar@gmail.com'
            })
        });
    }

    /**
     * GET /users/{id}
     */
    __getUserProfile(userId) {
        return new Promise((resolve, reject) => {
            // console.log("UserProfileService.__getUserProfile(" + userId + ")");
            //
            // AccountService.getSession()
            //     .then(session => {
            //         // Fetch profile
            //         fetch(API_BASE + "/users/" + userId, {
            //             headers: {Authorization: session.idToken.jwtToken}
            //         }).then(response => {
            //             resolve(response.json());
            //         });
            //     })
            //     // Catch errors
            //     .catch(err => reject(err));
            resolve({
                family_name: 'foo',
                given_name: 'bar',
                email: 'foo.bar@gmail.com'
            })
        });
    }

    /**
     * PUT /me
     */
    _updateUserProfile(params) {
        return new Promise((resolve, reject) => {
            // AccountService.getSession()
            //     .then(session => {
            //         fetch(API_BASE + "/me", {
            //             method: "PUT",
            //             body: JSON.stringify({"given_name": params.given_name, "family_name": params.family_name}),
            //             headers: {Authorization: session.idToken.jwtToken, "Content-Type": "application/json"},
            //         }).then(response => {
            //             resolve(response.json());
            //         });
            //     })
            //     .catch(err => reject(err));
            resolve({});

        });
    }

    /**
     * GET /me/peers
     */
    __getMyPeers(callback) {
        console.log("UserProfileService.__getMyPeers()");
        callback(false, MOCK_PEER_LIST);
    }

    /**
     * GET /me/dependents
     */
    __getMyDependents(callback) {
        console.log("UserProfileService.__getMyDependents()");
        callback(false, MOCK_DEP_LIST);
    }

    /**
     * GET /u/{userId}/bills
     */
    __getBillList(userId, callback) {
        console.log("UserProfileService.__getBillList(" + userId + ")");
        callback(false, MOCK_PATIENT_TO_BILLS[userId]);
    }
}

export const UserProfileService = new UserProfileServiceImpl();