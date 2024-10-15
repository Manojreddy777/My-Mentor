import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

class CheckboxGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOptions: props.defaultValue || []
        };
    }

    handleCheckboxChange = (value) => {
        const { selectedOptions } = this.state;
        const index = selectedOptions.indexOf(value);
        let updatedSelectedOptions;

        if (index === -1) {
            // If the checkbox is not already selected, add it to the selected options
            updatedSelectedOptions = [...selectedOptions, value];
        } else {
            // If the checkbox is already selected, remove it from the selected options
            updatedSelectedOptions = selectedOptions.filter(option => option !== value);
        }

        this.setState({ selectedOptions: updatedSelectedOptions });

        // Notify parent component of the change
        if (this.props.onChange) {
            this.props.onChange(updatedSelectedOptions);
        }
    };

    render() {
        const { options, disabled } = this.props;
        const { selectedOptions } = this.state;

        return (
            <div>
                {options.map((option, index) => (
                    <Form.Check
                        key={index}
                        type="checkbox"
                        id={`checkbox-${index}`}
                        label={option.label}
                        value={option.value}
                        checked={selectedOptions.includes(option.value)}
                        onChange={() => this.handleCheckboxChange(option.value)}
                        disabled={disabled}
                    />
                ))}
            </div>
        );
    }
}

export default CheckboxGroup;
