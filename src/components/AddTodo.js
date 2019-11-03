import React from 'react';

class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialFormState();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getInitialFormState() {
        return {todo: this.props.newItemText, effort: '', impact: ''};
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({[name]: value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.submitHandler(this.state);
        this.setState(this.getInitialFormState());
    }

    componentDidUpdate(prevProps) {
        if (this.props.newItemText && (this.props.newItemText !== prevProps.newItemText)) {
            this.setState(this.getInitialFormState());
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="text-input-wrapper">
                    <input
                        value={this.state.todo}
                        onChange={this.handleInputChange}
                        name="todo"
                        placeholder="What needs to be done?"
                        type="text"
                        autoFocus={true}
                        required={true}
                        ref={this.props.todoRef}
                    />
                </div>
                <div className="ei-wrapper">
                    <input type="number" min="1" max="10" step="1" placeholder={this.props.settings.effort} className="effort" name="effort" required={true} value={this.state.effort} onChange={this.handleInputChange} ref={this.props.effortRef}/>
                    <input type="number" min="0" max="10" step="1" placeholder={this.props.settings.impact} className="impact" name="impact" required={true} value={this.state.impact} onChange={this.handleInputChange}/>
                </div>
                <button type="submit">Add</button>
            </form>
        );
    }
}

export default TodoForm
