import {fetchTaskPending, fetchTaskSuccess, fetchTaskError, addTask, setTaskDone} from './actions';

function fetchTasks() {
    return dispatch => {
        dispatch(fetchTaskPending());
        fetch('http://localhost:4000/tasks')
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(fetchTaskSuccess(res.tasks));
            return res.tasks;
        })
        .catch(error => {
            dispatch(fetchTaskError(error));
        })
    }
}

function addTaskDB(task){
    return dispatch => {
        dispatch(fetchTaskPending());
        dispatch(addTask(task));
        fetch('http://localhost:4000/task/create',{
            body: JSON.stringify(task)
        })
        .then(res => res.json())
        .then(res => {
            if(res.message==='error') {
                throw(res.error);
            }
            return res.message;
        })
        .catch(error => {
            dispatch(fetchTaskError(error));
        })
    }
}

function setTaskDoneDB(taskId){
    return dispatch => {
        dispatch(fetchTaskPending());
        fetch('http://localhost:4000/task/update',{
            method:'POST',
            body: JSON.stringify({
                id: taskId,
                flag:'done',
                state: true
            })
        })
        .then(res => res.json())
        .then(res => {
            if(res.message==='error') {
                throw(res.error);
            }
            dispatch(setTaskDone(taskId));
            return res.message;
        })
        .catch(error => {
            dispatch(fetchTaskError(error));
        })
    }
}

function updateTask(task){
    return dispatch => {
        dispatch(fetchTaskPending());
        fetch('http://localhost:4000/task/update',{
            method:'POST',
            body:JSON.stringify(task)
        })
        .then(res => res.json())
        .then(res => {
            if(res.message==='error') {
                throw(res.error);
            }
            dispatch(updateTask(task));
            return res.message;
        })
        .catch(error => {
            dispatch(fetchTaskError(error));
        })
}
}

function deleteTask(taskId){
        return dispatch => {
            dispatch(fetchTaskPending());
            fetch('http://localhost:4000/task/delete',{
                method:'POST',
                body: JSON.stringify({
                    id: taskId
                })
            })
            .then(res => res.json())
            .then(res => {
                if(res.message==='error') {
                    throw(res.error);
                }
                dispatch(deleteTask(taskId));
                return res.message;
            })
            .catch(error => {
                dispatch(fetchTaskError(error));
            })
    }
}

export {
    fetchTasks,
    addTaskDB,
    setTaskDoneDB,
    updateTask,
    deleteTask
}