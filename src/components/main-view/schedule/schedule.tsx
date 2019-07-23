import * as React from 'react';
import {connect} from "react-redux";

interface Schedule {
    list?: any
}

class Schedule extends React.Component<Schedule>{

    public state:Schedule = {
        list: ''
    };


    render(){
        return (
            <table>
                <thead>
                <tr>
                    <th>Patient</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Planned Start time</th>
                    <th>Estimated End time</th>
                    <th>Room</th>
                    <th>Doctor</th>
                </tr>
                </thead>
                <tbody>
                {this.props.children}
                </tbody>
            </table>
        )
    }
}

export default connect(
    state => ({
        state: state
    })
)(Schedule);