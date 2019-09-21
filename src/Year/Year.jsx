import React from "react";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import {PopUp} from "../pop-up/pop-up";
import {Calendar} from "../calendar/calendar";
import {Monthly} from "../Monthly/Monthly";
import './Year.css'

export class Year extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Year">


                {
                    this.props.monthName.map((month, i) => {
                        return   (
                            <div className={'mainY'}>
            <span
                className="calendar__date--mainY">Місяць: {this.props.monthName[i]}</span>
                                <div className="calendar__headerY">
                                    <div className="calendar__dayOfWeekY">пн</div>
                                    <div className="calendar__dayOfWeekY">вт</div>
                                    <div className="calendar__dayOfWeekY">ср</div>
                                    <div className="calendar__dayOfWeekY">чт</div>
                                    <div className="calendar__dayOfWeekY">пт</div>
                                    <div className="calendar__dayOfWeekY">сб</div>
                                    <div className="calendar__dayOfWeekY">нд</div>
                                </div>


                                <div className="calendar__bodyY">
                                    {
                                        this.props.createCalendar(this.props.year, i).map((day, i) => {
                                            return day ? <div className={'calendar__dateY'}>{day.dateNumber}</div> :
                                                <div className={'calendar__dateY'}></div>
                                        })
                                    }
                                </div>
                            </div>
                        )

                    })
                }

            </div>
        )
    };
}

