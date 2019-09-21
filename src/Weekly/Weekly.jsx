// import React from "react";
// import Button from "react-bootstrap/Button";
// import DropdownButton from "react-bootstrap/DropdownButton";
// import Dropdown from "react-bootstrap/Dropdown";
// import {PopUp} from "../pop-up/pop-up";
//
// export class Weekly extends React.Component {
//
//     constructor(props) {
//         super(props);
//     }
//
// render() {
//     // const calendarDays = createCalendar(this.state.year, this.state.month);
//     return (<div className={'main'}>
//         <div className="calendar">
//             <div className="calendar__header">
//                 <div className="calendar__dayOfWeek">пн</div>
//             </div>
//             <div className="calendar__body">
//                 {calendarDays.map((day, i) => {
//                     return day ? <div className={'calendar__day'} key={i} onClick={() => {
//                         this.openModal(day.fullDate);
//                     }}>
//                         <div className={'calendar__date'}>{day.dateNumber}</div>
//                         <div className={'calendar__event'}>
//                             <ol>
//                                 {this.renderTasks(day.fullDate)}
//                             </ol>
//                         </div>
//                     </div> : <div className={'calendar__day'}></div>
//                 })}
//             </div>
//         </div>
//         {this.state.isModalOpened ? <PopUp openModal={this.openModal}
//                                            cancelButton={this.cancelButton}
//                                            saveButton={this.saveButton}/> : null}
//     </div>)
// };
// }
//
