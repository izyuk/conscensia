import { combineReducers } from 'redux';
import doctorsList from './doctors-list';
import patientsList from './patients-list';

export default combineReducers({
    doctorsList,
    patientsList
});
