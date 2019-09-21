import React from "react";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import {PopUp} from "../pop-up/pop-up";


export class Monthly extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (<div className={'main2'}>

            <span
                className="calendar__date--main">Місяць: {this.props.monthName[this.props.month]}, Рік: {this.props.year}</span>
            <div className="calendar__header">
                <div className="calendar__dayOfWeek">пн</div>
                <div className="calendar__dayOfWeek">вт</div>
                <div className="calendar__dayOfWeek">ср</div>
                <div className="calendar__dayOfWeek">чт</div>
                <div className="calendar__dayOfWeek">пт</div>
                <div className="calendar__dayOfWeek">сб</div>
                <div className="calendar__dayOfWeek">нд</div>
            </div>
            <div className="calendar__body">
                {this.props.calendarDays.map((day, i) => {
                    return day ? <div className={'calendar__day'} key={i} onClick={() => {
                        this.props.openModal(day.fullDate);
                    }}>
                        <div className={'calendar__date'}>{day.dateNumber}</div>
                        <div className={'calendar__event'}>
                            <ol>
                                {this.props.renderTasks(day.fullDate)}
                            </ol>
                        </div>
                    </div> : <div className={'calendar__day'}></div>
                })}
            </div>

        </div>)
    };
}

