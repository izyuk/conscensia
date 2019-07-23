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
        const {id, name, sex, birthday} = this.state;
        return (
            <div className={'add-new-patient'}>
                <p>Add new patient</p>
                <form onSubmit={ e => e.preventDefault() }>
                    <label htmlFor={'patient-id'}><span>Patient id</span>
                        <input type="text"
                               id={'patient-id'}
                               name={'id'}
                               placeholder={'Patient id'}
                               value={id}
                               onChange={this.addingHandler}
                        />
                    </label>
                    <label htmlFor={'full-name'}><span>Full name</span>
                        <input type="text"
                               id={'full-name'}
                               name={'name'}
                               value={name}
                               placeholder={'Full name'}
                               onChange={this.addingHandler}
                        />
                    </label>
                    <label htmlFor={'sex'}><span>Sex</span>
                        <select name="sex" id="sex" onChange={this.addingHandler} value={!!sex ? sex : 'choose'}>
                            <option value="choose" disabled>choose</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </label>
                    <label htmlFor={'day-of-birth'}><span>Day of Birth</span>
                        <input
                            type="date"
                            id={'day-of-birth'}
                            name={'birthday'}
                            value={birthday}
                            onChange={this.addingHandler}
                        />
                    </label>
                    <button disabled={(id === '' || name === '' || birthday === '' || sex === '')} type={'button'} onClick={() => this.saveToStore(this.state)}>Add</button>
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