import * as React from 'react';

interface Schedule {
    list?: any
}

class Schedule extends React.Component<Schedule>{

    public state:Schedule = {};


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
                {this.props.children}
            </table>
        )
    }
}

export default Schedule