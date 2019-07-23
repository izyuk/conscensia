import { combineReducers } from 'redux';
import doctorsList from './doctors-list';
import patientsList from './patients-list';
import scheduleList from './schedule';

export default combineReducers({
    doctorsList,
    patientsList,
    scheduleList
});
