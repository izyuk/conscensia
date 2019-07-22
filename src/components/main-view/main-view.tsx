import * as React from 'react';
import AddPatient from './add-patient/add-patient';
import PatientsList from './patients-list/patients-list';
import Schedule from './schedule/schedule';
import {getDoctors} from "../../API/API";
import {connect} from 'react-redux';


interface ScheduleData {
    patients: any,
    doctors: any,
    list?: any
}

class MainView extends React.Component<ScheduleData> {

    public state: ScheduleData = {
        patients: this.props.patientsList,
        doctors: [],
        list: ''
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

    };

    render() {
        const {patients, doctors, list} = this.state;
        return (
            <div>
                <p className={'app-name'}>Procedure scheduling Web App</p>
                <div>
                    <AddPatient add={this.managePatients}/>
                    <PatientsList list={patients}/>
                </div>
                <form onSubmit={e => e.preventDefault()}>
                    <label>
                        Doctor
                        <select name="doctorsToList" id="doctorsToList" onChange={this.inputsHandler}>
                            {doctors && doctors.map((item, i) => {
                                return <option key={i} value={item.name}>{item.name}</option>
                            })}
                        </select>
                    </label>
                    <label>
                        Patient
                        <select name="patientToList" id="patientToList" value={'Choose patient form list'} onChange={this.inputsHandler}>
                            <option value="Choose patient form list" disabled>Choose patient form list</option>
                            {patients && patients.map((item, i) => {
                                return <option key={i} value={item.name}>{item.name}</option>
                            })}
                        </select>
                    </label>
                    <label>
                        Enter description
                        <textarea name="description" id="" cols="30" rows="10" onChange={this.inputsHandler}></textarea>
                    </label>
                    <label>
                        Room number
                        <input type="number" name={'roomNumber'} onChange={this.inputsHandler}/>
                    </label>
                    <label>
                        Planned Start time
                        <input type="time" name={'startTime'} onChange={this.inputsHandler}/>
                    </label>
                    <label>
                        Estimated End time
                        <input type="time" name={'endTime'} onChange={this.inputsHandler}/>
                    </label>
                    <button onChange={this.addProcedure}>Add procedure</button>
                </form>

                <Schedule list={list}/>
            </div>
        )
    }
}

export default connect(
    state => ({
        patientsList: state.patientsList
    }),
    dispatch => ({
        setDoctors: (data: object) => {
            dispatch({type: 'SET_DOCTORS', payload: data})
        }
    })
)(MainView);