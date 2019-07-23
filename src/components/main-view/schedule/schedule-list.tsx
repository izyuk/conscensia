import * as React from "react";

interface Schedule {
    list?: any
}

const ScheduleList: React.FC<Schedule> = (props: Schedule) => {
    return <div></div>
        // {props.list ? props.list.map((item, i) => {
        //         return <tr>
        //             <td></td>
        //         </tr>
        //     }) : <tr>
        //         <td colSpan={'7'} style={{textAlign: 'center'}}>Empty schedule</td>
        //     </tr>}

}

export default ScheduleList;