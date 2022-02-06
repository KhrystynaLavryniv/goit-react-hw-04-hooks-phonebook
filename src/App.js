import React, { useEffect, useState } from 'react';
import { Container } from './components/ContactsForm/ContactsForm.style';
import ContactsForm from './components/ContactsForm/ContactsForm';
import Filter from './components/Filter/Filter';
import shortid from 'shortid';
import ContactList from './components/ContactList/ContactList';

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    console.log(parsedContacts);
  }, [contacts]);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = (name, number) => {
    const newContact = {
      id: shortid.generate(),
      name,
      number,
    };
    if (
      !contacts.find(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      setContacts(contacts => [newContact, ...contacts]);
    } else {
      alert(`${newContact.name} is already in contacts`);
    }
  };

  const handleFilterChange = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const handleDeleteContact = e => {
    const contactId = e.currentTarget.id;
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  return (
    <Container>
      <h2>Phonebook</h2>

      <ContactsForm onSubmit={formSubmitHandler} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilterChange} />

      <ContactList
        contacts={contacts}
        visibleContacts={getVisibleContacts()}
        onDelete={handleDeleteContact}
      />
    </Container>
  );
};

export default App;
