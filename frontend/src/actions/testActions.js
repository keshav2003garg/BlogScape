import axios from 'axios';

import { TEST_CONSTANT__REQUEST, TEST_CONSTANT__SUCCESS, TEST_CONSTANT__FAIL } from '../constants/testConstants';



const test = () => {
    return (
        async (dispatch) => {
            try {
                dispatch({
                    type: TEST_CONSTANT__REQUEST
                })
                const { data } = await axios.get('/api/');
                dispatch({
                    type: TEST_CONSTANT__SUCCESS,
                    payload: data,
                })
            } catch (error) {
                dispatch({
                    type: TEST_CONSTANT__FAIL,
                    payload: error.response.data.message
                })
            }
        }
    )
}



export { test };