import * as React from 'react';

interface Schedule {
    list?: any
}

const Schedule: React.FC<Schedule> = (props: Schedule) => {



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
            {props.list ? list.map((item, i) => {
                return <tr><td></td></tr>
            }): <tr><td colSpan={'7'} style={{textAlign: 'center'}}>Empty schedule</td></tr>}
            </tbody>
        </table>
    )

}

export default Schedule;