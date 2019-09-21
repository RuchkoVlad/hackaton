import React from 'react';
import './calendar.css';
import '../pop-up/pop-up.css';
import {PopUp} from "../pop-up/pop-up";

const daysInMonth = function (date) {
    return 32 - new Date(date.getFullYear(), date.getMonth(), 32).getDate();
};

let monthName = ["Січень", "Лютий", "Березнь", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"];

function createCalendar(year, month) {
    let body = [];
    let date = new Date(year, month);
    let startPosisiton = 0;
    if (date.getDay() === 0) {
        startPosisiton = 7;
    } else {
        startPosisiton = date.getDay();
    }
    for (let i = 1; i < startPosisiton; i++) {
        body.push('');
    }
    for (let i = 1; i <= daysInMonth(date); i++) {
        let getCurrentDay = new Date(year, month, i);
        let date = {
            dateNumber: i,
            fullDate: `${getCurrentDay.getDate()}.${getCurrentDay.getMonth()}.${getCurrentDay.getFullYear()}`
        };
        body.push(date);
    }
    for (let i = daysInMonth(date) + startPosisiton - 1; i % 7; i++) {
        body.push('');
    }
    return body;
}

let tasks = {};

function renderTasks(date) {
    let renderTask;
    if (tasks[date]) {
        renderTask = tasks[date].map((task) => {
            return <li className={'calendar__task'}>{task.title}</li>
        })
    } else {
        return
    }
    return renderTask;
}

export class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
            isModalOpened: false,
            openedDate: null,
        };

        this.moveForward = this.moveForward.bind(this);
        this.movePrevious = this.movePrevious.bind(this);
        this.currentMonth = this.currentMonth.bind(this);
        this.openModal = this.openModal.bind(this);
        this.cancelButton = this.cancelButton.bind(this);
        this.saveButton = this.saveButton.bind(this);
    };

    openModal(openedDate) {
        this.setState(state => ({
            isModalOpened: true,
            openedDate: openedDate,
        }));
    }

    saveButton(task) {
        this.setState(state => ({isModalOpened: false}));


        if (task !== '') {
            if (tasks[this.state.openedDate]) {
                tasks[this.state.openedDate].push({title: task});
            } else {
                tasks[this.state.openedDate] = [];
                tasks[this.state.openedDate].push({title: task});
            }
        }
    }

    cancelButton() {
        this.setState(state => ({isModalOpened: false}));
    }

    moveForward() {
        this.setState(state => ({
            month: state.month + 1
        }));

        if (this.state.month > 10) {
            this.setState(state => ({
                month: 0,
                year: state.year + 1
            }));
        }

    }

    movePrevious() {
        this.setState(state => ({
            month: state.month - 1
        }));

        if (this.state.month < 1) {
            this.setState(state => ({
                month: 11,
                year: state.year - 1
            }));
        }
    }

    currentMonth() {
        this.setState(state => ({
            month: new Date().getMonth(),
            year: new Date().getFullYear()
        }))
    }

    render() {
        const calendarDays = createCalendar(this.state.year, this.state.month);
        return (<div className={'main'}>
            <div className="calendar">
                <div className="calendar__buttons">
                    <button onClick={this.movePrevious}>Попередній місяць</button>
                    <button onClick={this.currentMonth}>Сьогодні</button>
                    <button onClick={this.moveForward}>Наступний місяць</button>
                </div>
                <span>Місяць: {monthName[this.state.month]}, Рік: {this.state.year}</span>
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
                    {calendarDays.map((day, i) => {
                        return day ? <div className={'calendar__day'} key={i} onClick={() => {
                            this.openModal(day.fullDate);
                        }}>
                            <div className={'calendar__date'}>{day.dateNumber}</div>
                            <div className={'calendar__event'}><ol>
                                {renderTasks(day.fullDate)}
                            </ol></div>
                        </div> : <div className={'calendar__day'}></div>
                    })}
                </div>
            </div>
            {this.state.isModalOpened ? <PopUp openModal={this.openModal}
                                               cancelButton={this.cancelButton}
                                               saveButton={this.saveButton}/> : null}
        </div>)
    };
}

