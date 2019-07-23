import * as React from 'react';
import AddPatient from './add-patient/add-patient';
import PatientsList from './patients-list/patients-list';
import Schedule from './schedule/schedule';
import ScheduleList from './schedule/schedule-list';
import {getDoctors} from "../../API/API";
import {connect} from 'react-redux';


interface ScheduleData {
    patients: any,
    doctors: any,
    list?: any
}

class MainView extends React.Component<ScheduleData> {

    public state: ScheduleData = {
        patients: '' || this.props.patientsList,
        doctors: [],
        list: []
    };

    private doctorsHandler = async () => {
        const query = getDoctors();
        const currentState = this.state;
        await query.then(res => {
            const {data} = res;
            const correctList = data.reduce((obj, item, i) => {
                obj[i] = {
                    name: item.name,
                    id: i
                };
                return obj;
            }, []);
            this.props.setDoctors(correctList);
            currentState.doctors = correctList;
            this.setState(currentState);
        })
    };

    componentDidMount(): void {
        this.doctorsHandler();
    }

    managePatients = (info: object) => {
        const currentState = this.state;
        console.log(info);
        Object.assign(currentState.patients, currentState.patients.push(info));
        this.setState(currentState);
        console.log(currentState);
    };

    componentDidUpdate(): void {
        console.log(this.state);
    }

    inputsHandler = ({target}) => {
        const currentState = this.state;
        currentState.list[target.name] = target.value;
        this.setState(currentState);
    };

    addProcedure = () => {
        const currentState = this.state;
        this.props.setSchedule(currentState.list)
    };

    render() {
        const {patients, doctors, list} = this.state;
        return (
            <div className={'main-view'}>
                <div>
                    <AddPatient add={this.managePatients}/>
                    <PatientsList list={patients}/>
                </div>
                <div className={'procedures'}>
                    <form onSubmit={e => e.preventDefault()}>
                        <label>
                            <span>Doctor</span>
                            <select name="doctorsToList" id="doctorsToList" onChange={this.inputsHandler}>
                                {doctors && doctors.map((item, i) => {
                                    return <option key={i} value={item.name}>{item.name}</option>
                                })}
                            </select>
                        </label>
                        <label>
                            <span>Patient</span>
                            <select name="patientToList" id="patientToList" value={'Choose patient form list'} onChange={this.inputsHandler}>
                                <option value="Choose patient form list" disabled>Choose patient form list</option>
                                {patients && patients.map((item, i) => {
                                    return <option key={i} value={item.name}>{item.name}</option>
                                })}
                            </select>
                        </label>
                        <label>
                            <span>Enter description</span>
                            <textarea name="description" id="" cols="30" rows="10" onChange={this.inputsHandler}></textarea>
                        </label>
                        <label>
                            <span>Room number</span>
                            <input type="number" name={'roomNumber'} onChange={this.inputsHandler}/>
                        </label>
                        <label>
                            <span>Planned Start time</span>
                            <input type="time" name={'startTime'} onChange={this.inputsHandler}/>
                        </label>
                        <label>
                            <span>Estimated End time</span>
                            <input type="time" name={'endTime'} onChange={this.inputsHandler}/>
                        </label>
                        <button onChange={this.addProcedure}>Add procedure</button>
                    </form>

                    <Schedule list={this.props.scheduleList}>
                        <ScheduleList/>
                    </Schedule>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        patientsList: state.patientsList,
        scheduleList: state.scheduleList
    }),
    dispatch => ({
        setDoctors: (data: object) => {
            dispatch({type: 'SET_DOCTORS', payload: data})
        },
        setSchedule: (data: object) => {
            dispatch({type: 'SET_SCHEDULE', payload: data})
        }
    })
)(MainView);