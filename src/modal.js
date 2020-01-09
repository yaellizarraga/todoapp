import React from 'react';
import {connect} from 'react-redux';
import {getTasksError, getTasks, getTasksPending, getAction, taskToUpdate} from './reducers/rootReducer';

const TaskModal = (props) => {
     const title = React.createRef();
     const description = React.createRef();
     const date = React.createRef();
        
    return (
        <div id="modal1" className="modal">
            <form onSubmit={(e) =>{
                        e.preventDefault();
                        var task = {
                            title: title.current.value,
                            description: description.current.value,
                            date:date.current.value
                        };
                        if(props.action==='INSERT'){
                            props.handleAddTask(task);
                        }else if(props.action==='UPDATE'){  
                            props.handleUpdate(task);
                        }
                    }}>
            <div className="modal-content">
            <h4>New task</h4>
                <div className="row">
                    
                    <div className="col s12">
                        <div className="input-field col s12">
                            <input type="text" className="validate" name="title" ref={title}/>
                            <label>Title</label>
                        </div>
                        <div className="input-field col s12">
                        <input type="text" className="validate" name="description" ref={description}/>
                            <label>Description</label>
                        </div>
                        <div className="input-field col s12">
                         <input type="text" className="datepicker" name="date" ref={date}/>
                         <label>Date</label>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="modal-footer">
                <button type="submit" id="addUpdate" className="waves-effect waves-green btn-flat">{(props.action==='INSERT')?'Add task':'Update task'}</button>
                <a href="#!" className="modal-close waves-effect waves-green btn-flat" onClick={() => {props.handleCloseModal(title.current, description.current, date.current)}}>Cancel</a>
            </div>
            </form>
        </div>
    )
};  

const mapStateProps = (state) => {
    return {
      action:getAction(state),
      error: getTasksError(state),
      tasks: getTasks(state),
      pending: getTasksPending(state),
      taskToUpdate: taskToUpdate(state)
    }
  };

export default connect(mapStateProps)(TaskModal);