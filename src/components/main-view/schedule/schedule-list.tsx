import * as React from "react";

interface Schedule {
    list?: any
}

const ScheduleList: React.FC<Schedule> = (props: Schedule) => {

    return (
        <tbody>
        {
            props.list && props.list.map((item, i) => <tr key={i}>
                    <td>{item.patientToList}</td>
                    <td>{item.description}</td>
                    <td>{item.status}</td>
                    <td>{item.timeStart}</td>
                    <td>{item.timeEnd}</td>
                    <td>{item.roomNumber}</td>
                    <td>{item.doctorToList}</td>
                </tr>
            )
        }
        </tbody>
    )


};

export default ScheduleList;