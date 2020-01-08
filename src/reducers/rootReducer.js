import {FETCH_TASKS_PENDING, FETCH_TASKS_SUCCESS, FETCH_TASKS_ERROR, ADD_TASK, DELETE_TASK, SET_TASK_DONE, UPDATE_TASK} from '../actions'; 

const initState = {
    action:null,
    pending:false,
    users:[],
    tasks:[],
    error:null
};

const rootReducer = (state = initState, action) => {
    switch(action.type) {
        case 'SET_ACTION_INSERT':
            return {
                ...state,
                action:action.payload
            }
        case 'SET_ACTION_UPDATE':
            return {
                ...state,
                action:action.payload
            }
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
            const index1 = state.tasks.findIndex((task)=>{
                return task._id === action.id
            });
            const task1 = Object.assign({}, state.tasks[index1]);
            task1.taskStatus = true;
            const tasksUpdated1 = Object.assign([], state.tasks);
            tasksUpdated1[index1] = task1;
        return {
            ...state,
            tasks:tasksUpdated1,
            pending:false,
        }
        case UPDATE_TASK:
            const index = state.tasks.findIndex((task)=>{
                return task._id === action.task.id
            });
            const task = Object.assign({}, state.tasks[index]);
            task.title = action.task.title;
            task.description = action.task.description;
            task.date = action.task.date;
            task.status = action.task.taskStatus;
            const tasksUpdated = Object.assign([], state.tasks);
            tasksUpdated[index] = task;
        return {
            ...state,
            tasks:tasksUpdated
        }
        default: 
            return state;
    }
};

export const getAction = state => state.action;
export const getTasks = state => state.tasks;
export const getTasksPending = state => state.pending;
export const getTasksError = state => state.error;

export default rootReducer;