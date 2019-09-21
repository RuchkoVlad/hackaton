import React from 'react';
import './pop-up.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export class PopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        return (<div className={'pop-up__wrapper'}>

            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

            <div className="pop-up">
                <div className="pop-up__upper"><h2 className="pop-up__title">Введите задачу</h2>
                    <input type="text" className="pop-up__description" placeholder="Задача"
                           value={this.state.value}
                           onChange={this.handleChange}
                           autoFocus={true}/>
                </div>
                <div className="pop-up__buttons">
                    <input type="button" className="pop-up__button pop-up__button-save close" value="Сохранить"
                           onClick={() => {
                               this.props.saveButton(this.state.value)
                           }}/>
                    <input type="button" className="pop-up__button pop-up__button-cancel close" value="Отменить"
                           onClick={this.props.cancelButton}/>
                </div>
            </div>
        </div>)
    };
}
