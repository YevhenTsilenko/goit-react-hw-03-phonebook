import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../Button/Button';
import styles from './ContactForm.module.css';

class ContactForm extends Component {
    state = {
        name: '',
        number: ''
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state);
        this.reset();
    };
    
    reset = () => {
        this.setState({ name: "", number: "" });
    };

    render () {
        const { name, number } = this.state;

        return (
            <form onSubmit={this.onFormSubmit} className={styles.form}>
                <label className={styles.label}>
                  Name
                    <input 
                        className={styles.form_input}
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
                        required
                        value={name}
                        onChange={(e) => {
                            this.setState({ name: e.currentTarget.value });
                        }}/>
                </label>
                <label className={styles.label}>
                  Number
                    <input 
                        className={styles.form_input}
                        type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
                        required
                        value={number}
                        onChange={(e) => {
                            this.setState({ number: e.currentTarget.value });
                        }}/>
                </label>
                <Button type="submit" btnName="Add contact" disabled={!(name && number)} className={styles.form_btn}/>
            </form>
        )
    }
}

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export { ContactForm };