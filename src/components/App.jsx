import { useState } from "react";
import css from './App.module.css';


import ContactsForm from "./ContactsForm/ContactsForm";
import ContactsList from "components/ContactsList/ContactsList";
import Filter from 'components/Filter/Filter';
import { nanoid } from "nanoid";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = ({ name, number }, { resetForm }) => {
    const id = nanoid();
    contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase()) ? alert(`${name} is already in contacts`) :
    setContacts(prevContacts => [...prevContacts, {name, number, id}])
    resetForm();
  };

  const changeFilter = (evt) => {
    setFilter(evt.currentTarget.value);
  };

  const getFilteredContacts = () => {
      return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
  };

  const deleteContact = (contactId) => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId)
    )
  }

  return (
    <div className={css.container}>
      <h1 className={css.mainTitle}>Phonebook</h1>
      <ContactsForm initialValues={{name, number}} onSubmit={handleSubmit}/>
      <h2 className={css.title}>Contacts</h2>
      <Filter filter={filter} changeFilter={changeFilter} />
      <ContactsList filteredContacts={getFilteredContacts()} onDeleteContact={deleteContact} />
    </div>
  )


  // state = {
  //   contacts: [],
  //   filter: '',
  //   name: '',
  //   number: '',
  // }

  // handleSubmit = ({ name, number }, { resetForm }) => {
  //   const id = nanoid();
  //   this.state.contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase()) ? alert(`${name} is already in contacts`) :
  //   this.setState(prevState => ({contacts: [...prevState.contacts, {name, number, id}]}))
  //   resetForm();
  // };

  // changeFilter = (evt) => {
  //   this.setState({ filter: evt.currentTarget.value });
  // };

  // getFilteredContacts = () => {
  //   return this.state.contacts.filter(contact => contact.name.toLowerCase().includes(this.state.filter.toLowerCase()));
  // };

  // deleteContact = ( contactId ) => {
  //   this.setState(prevState => ({
  //     contacts: prevState.contacts.filter(contact => contact.id !== contactId)
  //   }))
  // }

  // componentDidUpdate(prevProps, prevState) {

  //   if (this.state.contacts !== prevState.contacts) {
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
  //   }
  // }

  // componentDidMount() {
  //   const contacts = localStorage.getItem('contacts');
  //   const parsedContacts = JSON.parse(contacts);

  //   if (parsedContacts) {
  //     this.setState({ contacts: parsedContacts })
  //   }
  // }
  
  // render() {
  //   const filteredContacts = this.getFilteredContacts();
  //   const { name, number } = this.state;
    
  //   return (
  //     <div className={css.container}>
  //       <h1 className={css.mainTitle}>Phonebook</h1>
  //       <ContactsForm initialValues={{name, number}} onSubmit={this.handleSubmit}/>
  //       <h2 className={css.title}>Contacts</h2>
  //       <Filter filter={this.state.filter} changeFilter={this.changeFilter} />
  //       <ContactsList filteredContacts={filteredContacts} onDeleteContact={this.deleteContact} />
  //     </div>
  //   )
  // }
}

export default App;