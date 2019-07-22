import * as React from 'react';

interface Patients {
    list?: any
}

const PatientsList: React.FC<Patients> = (props: Patients) => {

    const {list} = props;
    return (
        <div className={'patients-list'}>
            <p>List of patients</p>
            <ul>
                {
                    list.length ?
                        list.map((item: object, i: number) => {
                            return <li key={i} id={item.id}>{item.name}</li>
                        })
                        : <li>List of patients is empty</li>
                }
            </ul>
        </div>
    )
};

export default PatientsList;