import * as React from 'react';
import {connect} from "react-redux";

interface PatientData {
    id: number|string,
    name: string,
    sex?: string,
    birthday?: string
}

class AddPatient extends React.Component<PatientData> {

    public state: PatientData = {
        id: '',
        name: '',
        sex: '',
        birthday: ''
    };

    addingHandler = ({target}) => {
        this.setState({ [target.name]: target.value });
    };

    saveToStore = (data: object) => {
        this.props.addPatient(data);
        this.props.add(data);

        this.setState({
            id: '',
            name: '',
            sex: '',
            birthday: ''
        });
    };



    render() {
        return (
            <div className={'add-new-patient'}>
                <p>Add new patient</p>
                <form onSubmit={ e => e.preventDefault() }>
                    <label htmlFor={'patient-id'}>Patient id
                        <input type="text"
                               id={'patient-id'}
                               name={'id'}
                               placeholder={'Patient id'}
                               onChange={this.addingHandler}
                        />
                    </label>
                    <label htmlFor={'full-name'}>Full name
                        <input type="text"
                               id={'full-name'}
                               name={'name'}
                               placeholder={'Full name'}
                               onChange={this.addingHandler}
                        />
                    </label>
                    <label htmlFor={'sex'}>Sex
                        <select name="sex" id="sex" onChange={this.addingHandler} defaultValue={'choose'}>
                            <option value="choose" disabled>choose</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </label>
                    <label htmlFor={'day-of-birth'}>Day of Birth
                        <input
                            type="date"
                            id={'day-of-birth'}
                            name={'birthday'}
                            onChange={this.addingHandler}
                        />
                    </label>
                    <button type={'button'} onClick={() => this.saveToStore(this.state)}>Add</button>
                </form>
            </div>
        )
    }
}

export default connect(
    state => ({
        state: state
    }),
    dispatch => ({
        addPatient: (data: object) => {
            dispatch({type: 'SET_PATIENTS', payload: data})
        }
    })
)(AddPatient);