import {MOCK_BILLS_MAP} from "./BillService";

export const MOCK_PROVIDERS_MAP = {
    '59abec47-7925-49a0-a238-00a879315ccf': {
        id: '59abec47-7925-49a0-a238-00a879315ccf',
        name: 'Bryant Park Primary Care',
        addressLine1: '123 Some Street',
        addressLine2: 'Suite 456',
        city: 'New York',
        state: 'NY',
        postcode: '10001',
        country: 'US',
        phone: '646 555 1234',
        website: 'http://www.bryantparkprimarycare.com',
        email: 'contact@bryantparkprimarycare.com'
    },
    '180a7e17-a5d9-4248-bd65-7acd1add8cd5': {
        id: '180a7e17-a5d9-4248-bd65-7acd1add8cd5',
        name: 'Lenox Urgent Care',
        addressLine1: '1 Main Street',
        addressLine2: '',
        city: 'New York',
        state: 'NY',
        postcode: '10001',
        country: 'US',
        phone: '646 555 4321',
        website: 'http://www.lenoxurgentcare.com',
        email: 'contact@lenoxurgentcare.com'
    },
    '93eeb984-781b-486b-9edc-2fcdab1c2120': {
        id: '93eeb984-781b-486b-9edc-2fcdab1c2120',
        name: 'Seoul Medic',
        addressLine1: '1-1 Nonhyeon-ro, Sinsa-dong',
        addressLine2: 'Gangnam-gu',
        city: 'Seoul',
        state: '',
        postcode: '',
        country: 'KR',
        phone: '1-234-5678',
        website: 'http://www.seoulmedic.co.kr',
        email: 'contact@seoulmedic.co.kr'
    }
};

class ProviderServiceImpl {

    //==================================================================================================================
    // Constructor

    constructor() {
        this.reset();
    }

    //==================================================================================================================
    // Init

    init() {
        console.log("ProviderService.init()");
    }

    //==================================================================================================================
    // Reset

    /**
     * Called on logout - clean memory and storage
     */
    reset() {
        console.log("ProviderService.reset()");
    }

    //==================================================================================================================
    // API

    /**
     * Get provider node for given providerId. Returns null if provider does not exist. Throws error if error occurred
     * during retrieval.
     *
     * @param providerId
     * @returns {Promise}
     */
    getProviderProfile(providerId) {
        return this._getProvider(providerId);
    }

    //==================================================================================================================
    // Private

    /**
     * Get provider node for given providerId; get from cache or load from server if cache miss or forced refresh.
     * Returns null if provider does not exist. Throws error if error occurred during retrieval.
     *
     * @param providerId
     * @returns {Promise}
     * @private
     */
    _getProvider(providerId) {
        console.log("ProviderService._getProvider(" + providerId + ")");
        return this.__getProvider(providerId);
    }

    //==================================================================================================================
    // Server comms

    /**
     * GET /p/{providerId}
     *
     * @param providerId
     * @returns {Promise}
     * @private
     */
    __getProvider(providerId) {
        return new Promise((resolve, reject) => {
            console.log("ProviderService.__getProfile(" + providerId + ")");
            resolve(MOCK_PROVIDERS_MAP[providerId]);
        });
    }
}

export const ProviderService = new ProviderServiceImpl();