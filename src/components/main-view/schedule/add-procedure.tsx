import * as React from 'react';
// import AddPatient from './add-patient/add-patient';
// import PatientsList from './patients-list/patients-list';
// import Schedule from './schedule/schedule';
// import ScheduleList from './schedule/schedule-list';
// import {getDoctors} from "../../API/API";
import {connect} from 'react-redux';
import {roomsList} from "../../../room-list";


interface ScheduleData {
    doctorToList?: string,
    patientToList?: string,
    description?: string,
    roomNumber?: any,
    roomList?: any,
    status?: string,
    timeStart?: string,
    timeEnd?: string,
}

class AddProcedure extends React.Component<ScheduleData> {

    public state: ScheduleData = {
        doctorToList: 'Choose doctor form list',
        patientToList: 'Choose patient form list',
        description: '',
        roomNumber: 'Choose room',
        roomList: roomsList(),
        status: 'Choose status',
        timeStart: '',
        timeEnd: ''
    };

    inputsHandler = ({target}) => {
        this.setState({
            [target.name]: target.value
        });
    };
    addProcedure = () => {
        const {roomList, ...rest} = this.state;
        this.props.setSchedule(rest);
        this.setState({
            doctorToList: 'Choose doctor form list',
            patientToList: 'Choose patient form list',
            description: '',
            roomNumber: 'Choose room',
            status: 'Choose status',
            timeStart: '',
            timeEnd: ''
        })
    };

    render() {
        const {doctorToList, patientToList, description, roomNumber, timeStart, timeEnd, status, roomList} = this.state;
        return (
            <form onSubmit={e => e.preventDefault()}>
                <label>
                    <span>Doctor</span>
                    <select name="doctorToList" id="doctorsToList" defaultValue={doctorToList}
                            onChange={this.inputsHandler}>
                        <option value="Choose doctor form list" disabled>Choose doctor form list</option>
                        {this.props.doctors && this.props.doctors.map((item, i) => {
                            return <option key={i} value={item.name}>{item.name}</option>
                        })}
                    </select>
                </label>
                <label>
                    <span>Patient</span>
                    <select name="patientToList" id="patientToList" defaultValue={patientToList}
                            onChange={this.inputsHandler}>
                        <option value="Choose patient form list" disabled>Choose patient form list</option>
                        {this.props.patientsList && this.props.patientsList.map((item, i) => {
                            return <option key={i} value={item.name}>{item.name}</option>
                        })}
                    </select>
                </label>
                <label>
                    <span>Status</span>
                    <select name="status" id="status" defaultValue={status}
                            onChange={this.inputsHandler}>
                        <option value="Choose status" disabled>Choose status</option>
                        <option value="Planned">Planned</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Finished">Finished</option>
                    </select>
                </label>
                <label>
                    <span>Enter description</span>
                    <textarea name="description" id="" cols="30" rows="10" value={description} onChange={this.inputsHandler}></textarea>
                </label>
                <label>
                    <span>Room number</span>
                    <select name="roomNumber" id="roomNumber" defaultValue={roomNumber}
                            onChange={this.inputsHandler}>
                        <option value="Choose room" disabled>Choose room</option>
                        {roomList && roomList.map((item, i) => {
                            return <option key={i} value={item}>{item}</option>
                        })}
                    </select>
                    {/*<input type="number" name={'roomNumber'} value={roomNumber} onChange={this.inputsHandler}/>*/}
                </label>
                <label>
                    <span>Planned Start time</span>
                    <input type="time" name={'timeStart'} value={timeStart} onChange={this.inputsHandler}/>
                </label>
                <label>
                    <span>Estimated End time</span>
                    <input type="time" name={'timeEnd'} value={timeEnd} onChange={this.inputsHandler}/>
                </label>
                <button disabled={
                        (doctorToList === 'Choose doctor form list' ||
                        patientToList === 'Choose patient form list' ||
                        description === '' ||
                        roomNumber === '' ||
                        status === 'Choose status' ||
                        timeStart === '')
                    }
                    type={'button'}
                    onClick={this.addProcedure}>Add procedure</button>
            </form>
        )
    }
}

export default connect(
    state => ({
        patientsList: state.patientsList
    }),
    dispatch => ({
        setSchedule: (data: object) => {
            dispatch({type: 'SET_SCHEDULE', payload: data})
        }
    })
)(AddProcedure);