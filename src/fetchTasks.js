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
        dispatch({type:'SET_ACTION_INSERT', payload: 'INSERT'});
        fetch('http://localhost:4000/task/create',{
            method:'POST',
            body: JSON.stringify(task),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            if(res.message==='error') {
                throw(res.error);
            }
            dispatch(addTask(res.task));
            return res.message;
        })
        .catch(error => {
            dispatch(fetchTaskError(error));
        })
    }
}

function setTaskDoneDB(index, taskId){
    return dispatch => {
        fetch('http://localhost:4000/task/update',{
            method:'POST',
            body: JSON.stringify({
                id: taskId,
                flag:'done'
            }),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            if(res.message==='error') {
                throw(res.error);
            }
            dispatch(setTaskDone(index, taskId));
            return res.message;
        })
        .catch(error => {
            dispatch(fetchTaskError(error));
        })
    }
}

function updateTask(task){
    return dispatch => {
        dispatch({type:'SET_ACTION_UPDATE', payload: 'UPDATE'});
        fetch('http://localhost:4000/task/update',{
            method:'POST',
            body:JSON.stringify(task),
            headers:{
                'Content-Type':'application/json'
            }
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
            fetch('http://localhost:4000/task/delete',{
                method:'POST',
                body: JSON.stringify({
                    id: taskId
                }),
                headers:{
                    'Content-Type':'application/json'
                }
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