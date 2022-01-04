import { TEST_CONSTANT__REQUEST, TEST_CONSTANT__SUCCESS, TEST_CONSTANT__FAIL } from '../constants/testConstants';



const initialState = { data: [] };
const testReducer = (state = initialState, action) => {
    switch (action.type) {
        case TEST_CONSTANT__REQUEST:
            return {
                loading: true,
                data: []
            }
        case TEST_CONSTANT__SUCCESS:
            return {
                loading: false,
                data: action.payload.data,
            }
        case TEST_CONSTANT__FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}



export default testReducer;