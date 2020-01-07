import {FETCH_TASKS_PENDING, FETCH_TASKS_SUCCESS, FETCH_TASKS_ERROR, ADD_TASK, DELETE_TASK, SET_TASK_DONE} from '../actions'; 

const initState = {
    pending:false,
    users:[],
    tasks:[],
    error:null
};

const rootReducer = (state = initState, action) => {
    switch(action.type) {
        case FETCH_TASKS_PENDING: 
            return {
                ...state,
                pending: true
            }
        case FETCH_TASKS_SUCCESS:
            return {
                ...state,
                pending: false,
                tasks: action.tasks
            }
        case FETCH_TASKS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case ADD_TASK:
            return {
                ...state,
                tasks:[...state.tasks, action.task]
            }
        case DELETE_TASK:
            let newTaks = state.task.filter(task => {
                return task.id !== action.id
            });
            return {
                ...state,
                tasks:newTaks
            }
        case SET_TASK_DONE:
            return [
            ...state,
            {...state[action.index], taskStatus:true}
        ]
        default: 
            return state;
    }
};

export const getTasks = state => state.tasks;
export const getTasksPending = state => state.pending;
export const getTasksError = state => state.error;

export default rootReducer;