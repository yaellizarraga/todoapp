export const FETCH_TASKS_PENDING = 'FETCH_TASKS_PENDING';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_ERROR = 'FETCH_TASKS_ERROR';
export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';

export function fetchTaskPending() {
    return {
        type: FETCH_TASKS_PENDING
    }
}

export function fetchTaskSuccess(tasks) {
    return {
        type: FETCH_TASKS_SUCCESS,
        tasks: tasks
    }
}

export function fetchTaskError(error) {
    return {
        type: FETCH_TASKS_ERROR,
        error: error
    }
}

export function addTask(task){
    return {
        type: ADD_TASK,
        task:task
    }
}

export function deleteTask(taskId){
    return {
        type:DELETE_TASK,
        id:taskId
    }
}