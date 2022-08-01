import { useState, useEffect } from "react";
import css from './App.module.css';


import ContactsForm from "./ContactsForm/ContactsForm";
import ContactsList from "components/ContactsList/ContactsList";
import Filter from 'components/Filter/Filter';
import { nanoid } from "nanoid";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

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
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId))
  };

  useEffect(() => {
    if (contacts.length === 0)
      return;
    
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts]);

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (savedContacts) {
      setContacts(savedContacts);
    }
  }, []);

  return (
    <div className={css.container}>
      <h1 className={css.mainTitle}>Phonebook</h1>
      <ContactsForm initialValues={{name: '', number: ''}} onSubmit={handleSubmit}/>
      <h2 className={css.title}>Contacts</h2>
      <Filter filter={filter} changeFilter={changeFilter} />
      <ContactsList filteredContacts={getFilteredContacts()} onDeleteContact={deleteContact} />
    </div>
  )
}

export default App;