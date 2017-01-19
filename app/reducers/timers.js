import * as ActionTypes from '../constants/ActionTypes';
import * as AppSettings from '../constants/AppSettings';

const initialState = [{
    running: false,
    time: AppSettings.POMODORO
}];

const actionsMap = {
    [ActionTypes.START_TIMER](state, action) {
        state.running = false;
        return state;
    },
    [ActionTypes.STOP_TIMER](state, action) {
        return {
            running: false,
            time: AppSettings.POMODORO
        };
    },
};

export default function timers(state = initialState, action) {
    const reduceFn = actionsMap[action.type];
    if (!reduceFn) return state;
    return reduceFn(state, action);
}
