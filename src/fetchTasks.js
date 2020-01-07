import {fetchTaskPending, fetchTaskSuccess, fetchTaskError, addTask} from './actions';

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
            window.Materialize.toast('Task completed!', 4000);
            return res.message;
        })
        .catch(error => {
            dispatch(fetchTaskError(error));
        })
    }
}

function setTaskDone(taskId){
    return dispatch => {
        dispatch(fetchTaskPending());
        fetch('http://localhost:4000/task/update',{
            body: JSON.stringify({
                id: taskId
            })
        })
        .then(res => res.json())
        .then(res => {
            if(res.message==='error') {
                throw(res.error);
            }
            dispatch(setTaskDone(taskId));
            window.Materialize.toast('Task completed!', 4000);
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
            body:JSON.stringify(task)
        })
        .then(res => res.json())
        .then(res => {
            if(res.message==='error') {
                throw(res.error);
            }
            dispatch(updateTask(task));
            window.Materialize.toast('Task updated!', 4000);
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
                window.Materialize.toast('Task deleted!', 4000);
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
    setTaskDone,
    updateTask,
    deleteTask
}