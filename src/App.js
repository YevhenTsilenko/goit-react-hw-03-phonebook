import React, { Component } from 'react';
import shortid from 'short-id';
import './App.css';
import { ContactForm } from './components/ContactForm/ContactForm';
import { Filter } from './components/Filter/Filter';
import { ContactList } from './components/ContactList/ContactList';

class App extends Component {
  state = {
    contacts: [    
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],

    filter: ''
  }

  componentDidMount() {
    const lscontacts = JSON.parse(localStorage.getItem('contacts'));
    if(lscontacts && Array.isArray(lscontacts)) {
      this.setState({ contacts: lscontacts })
    }
  }

  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
  }

  handleSubmit = ({ name, number }) => {
    if(this.state.contacts.find(contact => contact.name === name)) {
      alert(`${name} already exists`)
    } else {
      this.setState(({ contacts }) => ({
        contacts: [
          ...contacts,
          {
            id: shortid.generate(),
            name: name,
            number: number,
          },
        ],
      }))
    }

  }

  hendleRemove = (id) => {
    this.setState({
      contacts: this.state.contacts.filter((contact) => contact.id !== id),
    });
  }

  onFilter = (e) => {
    this.setState({filter: e.currentTarget.value});
  }

  hendleSearch = () => {
    const { contacts, filter } = this.state;
    const universalFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(universalFilter),
    );
  };

  render () {
    const { filter } = this.state;

    return (
      <div className="App">
        <h1>Phonebook</h1>
        <ContactForm  onSubmit={this.handleSubmit}/>

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.onFilter}/>
        <ContactList contacts={this.hendleSearch()} onDelete={this.hendleRemove}/>
      </div>
    );
 }
}

export default App;
