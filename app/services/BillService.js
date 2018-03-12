import {MOCK_PROVIDERS_MAP, ProviderService} from "./ProviderService";
import {MOCK_USERS_MAP, UserService} from "./UserProfileService";

export const MOCK_BILLS_MAP = {
    'd69585b9-5bad-46d3-8d54-7f32174a9142': {
        id: 'd69585b9-5bad-46d3-8d54-7f32174a9142',
        patient: MOCK_USERS_MAP["5da591b5-88f6-419b-9110-314562d7c5b6"],
        provider: MOCK_PROVIDERS_MAP["180a7e17-a5d9-4248-bd65-7acd1add8cd5"],
        serviceProvidedAt: 1234567890,
        issuedAt: 1234567890,
        type: 'Copay',
        amount: 15.66,
        currency: 'USD',
        paidAt: 0,
        paidBy: 0
    },
    '331481dc-452a-48b7-b456-1e71a8c9d149': {
        id: '331481dc-452a-48b7-b456-1e71a8c9d149',
        patient: MOCK_USERS_MAP['d045fadb-6590-4a42-9839-52f3d2e203b8'],
        provider: MOCK_PROVIDERS_MAP["59abec47-7925-49a0-a238-00a879315ccf"],
        serviceProvidedAt: 1234567890,
        issuedAt: 1234567890,
        type: 'Copay',
        amount: 126.57,
        currency: 'USD',
        paidAt: 0,
        paidBy: 0
    },
    '25686b10-860b-43db-9c14-cc48f6d2ff6c': {
        id: '25686b10-860b-43db-9c14-cc48f6d2ff6c',
        patient: MOCK_USERS_MAP['d045fadb-6590-4a42-9839-52f3d2e203b8'],
        provider: MOCK_PROVIDERS_MAP["59abec47-7925-49a0-a238-00a879315ccf"],
        serviceProvidedAt: 1234567890,
        issuedAt: 1234567890,
        type: 'Copay',
        amount: 28.22,
        currency: 'USD',
        paidAt: 1234567890,
        paidBy: '5da591b5-88f6-419b-9110-314562d7c5b6'
    },
    'b5d2f24e-7365-40bf-be3a-eae80c8b138b': {
        id: 'b5d2f24e-7365-40bf-be3a-eae80c8b138b',
        patient: MOCK_USERS_MAP['d045fadb-6590-4a42-9839-52f3d2e203b8'],
        provider: MOCK_PROVIDERS_MAP["93eeb984-781b-486b-9edc-2fcdab1c2120"],
        serviceProvidedAt: 1234567890,
        issuedAt: 1234567890,
        type: 'Lab',
        amount: 1234567,
        currency: 'KRW',
        paidAt: 0,
        paidBy: 0
    },
};

export const MOCK_PATIENT_TO_BILLS = {
    // Me
    '5da591b5-88f6-419b-9110-314562d7c5b6': [
        MOCK_BILLS_MAP['d69585b9-5bad-46d3-8d54-7f32174a9142']
    ],
    // David
    'd045fadb-6590-4a42-9839-52f3d2e203b8': [
        MOCK_BILLS_MAP['331481dc-452a-48b7-b456-1e71a8c9d149'],
        MOCK_BILLS_MAP['25686b10-860b-43db-9c14-cc48f6d2ff6c'],
        MOCK_BILLS_MAP['b5d2f24e-7365-40bf-be3a-eae80c8b138b']
    ],
    // Jessica
    'fb0ecb38-3fe4-4ebc-a396-c105cb7ec1d7': [],
    // Bob
    '319dabfc-0704-4892-8532-869b94148949': []
};

const MOCK_BILLS_ARR = [
    MOCK_BILLS_MAP['d69585b9-5bad-46d3-8d54-7f32174a9142'],
    MOCK_BILLS_MAP['331481dc-452a-48b7-b456-1e71a8c9d149'],
    MOCK_BILLS_MAP['25686b10-860b-43db-9c14-cc48f6d2ff6c'],
    MOCK_BILLS_MAP['b5d2f24e-7365-40bf-be3a-eae80c8b138b']
];

class BillServiceImpl {

    static SK_BILLS = "BILLS";

    static SORT = (a, b) => a.issuedAt - b.issuedAt;

    //==================================================================================================================
    // Constructor

    constructor() {
        this.reset();
    }

    //==================================================================================================================
    // Init

    init() {
        console.log("BillService.init()");
    }

    //==================================================================================================================
    // Reset

    /**
     * Called on logout - clean memory and storage
     */
    reset() {
        console.log("BillService.reset()");
    }

    //==================================================================================================================
    // Public methods

    getUserBills(userId) {
        return new Promise((resolve, reject) => {
            console.log("UserProfileService.getUserBills(" + userId + ")");


        });
    }

    /**
     * Get list of all bills for family, filtered by filter
     */
    getAllBills(filter) {
        return new Promise((resolve, reject) => {
            console.log("BillService.getAllBills(" + filter + ")");

            let bills = filter ? MOCK_BILLS_ARR.filter(filter) : MOCK_BILLS_ARR;

            resolve(bills);
        });
    }

    //==================================================================================================================
    // Private

    /**
     * Get bill node for billId from cache or load from server if cache miss or forced refresh. Returns null if bill not
     * found. Throws error if error occurred during retrieval.
     *
     * @param billId
     */
    getBill(billId) {
        return this.__getBill(billId);
    }

    //==================================================================================================================
    // Server comms

    /**
     * GET /b/{billId}
     *
     * @param billId
     * @returns {Promise}
     * @private
     */
    __getBill(billId) {
        return new Promise((resolve, reject) => {
            console.log("BillService.__getBill(" + billId + ")");
            resolve(MOCK_BILLS_MAP[billId]);
        });
    }

}

export const BillService = new BillServiceImpl();