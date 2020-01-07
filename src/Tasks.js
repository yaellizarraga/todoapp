import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getTasksError, getTasks, getTasksPending} from './reducers/rootReducer';
import {fetchTasks, setTaskDone, updateTask, deleteTask, addTaskDB} from './fetchTasks';

class Tasks extends Component{

    componentDidMount() {
        const {fetchTasks} = this.props;
        fetchTasks();
    }

    handleDone(taskId) {
        setTaskDone(taskId);
    }

    handleUpdate(taskId) {
        updateTask(taskId);
    }

    handleDelete (taskId) {
        deleteTask(taskId);
    }

    render(){
        console.log(this.props);
        const {tasks} = this.props; 
        const taskList = tasks.length ? (
            tasks.map(task => {
                return(
                    <li key={task._id}>
                        <div className="collapsible-header blue-text">{task.title}<span className="new badge" data-badge-caption={(task.taskStatus)?'Completed':'Pending...'}></span></div>
                        <div className="collapsible-body">
                            <div className="left-align">
                            <span>{task.description}</span>
                            <p>Date: {task.date}</p>
                            </div>
                            <div className="right-align">
                                <button className="btn btn-primary" onClick={this.handleDone(task._id)}>Set as done</button>
                                <button className="btn btn-primary" onClick={this.handleUpdate(task._id)}>Update task</button>
                                <button className="btn btn-primary" onClick={this.handleDelete(task._id)}>Delete from list</button>
                            </div>
                        </div>
                    </li>
                )
            })  
        ):(
            <div className="center">
                No task to do. oh yeah!
            </div>
        )
        return (
            <ul className="collapsible popout">
                {taskList}
            </ul>
        )
    }
}

const mapStateProps = (state) => {
    return {
      error: getTasksError(state),
      tasks: getTasks(state),
      pending: getTasksPending(state)
    }
  };

  const mapDispatchToProps = dispatch => bindActionCreators({
    fetchTasks: fetchTasks,
    addTaskDB: addTaskDB,
    deleteTask: deleteTask,
    setTaskDone: setTaskDone
}, dispatch)

export default connect(mapStateProps, mapDispatchToProps)(Tasks);
