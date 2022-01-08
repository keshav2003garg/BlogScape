import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from "./reducers/index.js";

const middleware = [thunk];

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        return undefined;
    }
}

const saveState = (state) => {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
}

const persistedState = loadState();

const store = createStore(rootReducer, persistedState, composeWithDevTools(applyMiddleware(...middleware)))

store.subscribe(() => {
    saveState(store.getState());
})


export default store;