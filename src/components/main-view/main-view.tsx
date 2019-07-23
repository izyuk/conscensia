import * as React from 'react';
import AddPatient from './add-patient/add-patient';
import PatientsList from './patients-list/patients-list';
import Schedule from './schedule/schedule';
import ScheduleList from './schedule/schedule-list';
import AddProcedure from './schedule/add-procedure';
import {getDoctors} from "../../API/API";
import {connect} from 'react-redux';
import {roomsList} from "../../room-list";


interface ScheduleData {
    doctors?: any,
    // doctorToList?: string,
    // patientToList?: string,
    // description?: string,
    // roomNumber?: any,
    // timeStart?: string,
    // timeEnd?: string,
}

class MainView extends React.Component<ScheduleData> {

    public state: ScheduleData = {
        doctors: [],
        // doctorToList: '',
        // patientToList: '',
        // description: '',
        // roomNumber: '',
        // timeStart: '',
        // timeEnd: '',
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

    shouldComponentUpdate(nextProps, nextState, nextContext): boolean {
        return (this.props !== nextProps) ||
            (this.state !== nextState);
    }

    render() {
        return (
            <div className={'main-view'}>
                <div>
                    <AddPatient/>
                    <PatientsList list={this.props.patientsList}/>
                </div>
                <div className={'procedures'}>
                    <AddProcedure doctors={this.state.doctors}/>
                    {
                        this.props.scheduleList.length > 0 &&
                        <Schedule>
                            <ScheduleList list={this.props.scheduleList}/>
                        </Schedule>
                    }

                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        patientsList: state.patientsList,
        doctorsList: state.doctorsList,
        scheduleList: state.scheduleList,
        roomsList: state.roomsList,
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