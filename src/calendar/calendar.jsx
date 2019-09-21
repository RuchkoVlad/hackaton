import React from 'react';
import './calendar.css';
import '../pop-up/pop-up.css';
import {PopUp} from "../pop-up/pop-up";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {Weekly} from "../Weekly/Weekly";
import {Monthly} from "../Monthly/Monthly";
import {Year} from "../Year/Year";

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
    console.log(body);
    return body;
}

// let tasks = {};

export class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
            isModalOpened: false,
            openedDate: null,
            tasks: JSON.parse(window.localStorage.getItem("tasks")) || {},
        };

        this.moveForward = this.moveForward.bind(this);
        this.movePrevious = this.movePrevious.bind(this);
        this.currentMonth = this.currentMonth.bind(this);
        this.openModal = this.openModal.bind(this);
        this.cancelButton = this.cancelButton.bind(this);
        this.saveButton = this.saveButton.bind(this);
        this.renderTasks = this.renderTasks.bind(this);
    };

    renderTasks(date) {
        let renderTask;
        if (this.state.tasks[date]) {
            renderTask = this.state.tasks[date].map((task) => {
                return <li className={'calendar__task'}>{task.title}</li>
            })
        } else {
            return
        }
        return renderTask;
    }

    openModal(openedDate) {
        this.setState(state => ({
            isModalOpened: true,
            openedDate: openedDate,
        }));
    }

    saveButton(task) {
        this.setState(state => ({isModalOpened: false}));


        if (task !== '') {
            if (this.state.tasks[this.state.openedDate]) {
                this.state.tasks[this.state.openedDate].push({title: task});
                window.localStorage.setItem("tasks", JSON.stringify({...this.state.tasks}));
            } else {
                this.state.tasks[this.state.openedDate] = [];
                this.state.tasks[this.state.openedDate].push({title: task});
                window.localStorage.setItem("tasks", JSON.stringify({...this.state.tasks}));
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
                <Weekly/>
                <div className="calendar__buttons">
                    <Button variant="light" onClick={this.movePrevious}> &lt; </Button>
                    <Button variant="light" onClick={this.moveForward}> > </Button>
                    <Button onClick={this.currentMonth}>Сьогодні</Button>
                </div>
                <DropdownButton id="dropdown-basic-button" title="Режим вiдображення" variant="Secondary">
                    <Dropdown.Item>Тиждень</Dropdown.Item>
                    <Dropdown.Item>Мiсяць</Dropdown.Item>
                    <Dropdown.Item>Рiк</Dropdown.Item>
                </DropdownButton>

                <Monthly
                    month={this.state.month}
                    year={this.state.year}
                    calendarDays={calendarDays}
                    openModal={this.openModal}
                    renderTasks={this.renderTasks}
                    monthName={monthName}
                />

                <Year
                    year={this.state.year}
                    calendarDays={calendarDays}
                    openModal={this.openModal}
                    renderTasks={this.renderTasks}
                    monthName={monthName}
                    createCalendar={createCalendar}/>


            </div>
            {this.state.isModalOpened ? <PopUp openModal={this.openModal}
                                               cancelButton={this.cancelButton}
                                               saveButton={this.saveButton}/> : null}
        </div>)
    };
}

