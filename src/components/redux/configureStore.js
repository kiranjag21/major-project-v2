
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Connection } from './pusherConnection';
import { SelectedDish } from './selectedDish';
import { Auth } from './auth';
export const configureStore = () => {
    const store = createStore(
        combineReducers({
            selectedDish: SelectedDish,
            connection: Connection,
            auth: Auth
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}