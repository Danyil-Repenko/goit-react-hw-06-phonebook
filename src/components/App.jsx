import { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export function App() {
  const contactsFormLocalStorage = useRef(
    JSON.parse(localStorage.getItem('contacts'))
  );

  const [contacts, setContacts] = useState(
    () => contactsFormLocalStorage.current || []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (contacts === [] || contacts === contactsFormLocalStorage.current)
      return;

    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = e => {
    e.preventDefault();

    const nameInput = e.target.elements.name;
    const numberInput = e.target.elements.number;
    const nameSameness = contacts.find(
      contact => contact.name === nameInput.value
    );

    if (nameSameness) {
      Notify.info(`${nameInput.value} is already in contacts`);
      return;
    } else {
      const newContact = {
        name: nameInput.value,
        number: numberInput.value,
        id: nanoid(),
      };
      setContacts([...contacts, newContact]);
    }

    nameInput.value = '';
    numberInput.value = '';
  };

  const removeContact = e => {
    if (e.target.nodeName === 'BUTTON') {
      const contactName = e.currentTarget.getAttribute('data-name');
      return setContacts(
        contacts.filter(contact => contact.name !== contactName)
      );
    }
  };

  const handleFilterInput = e => {
    setFilter(e.target.value.toLowerCase());
  };

  return (
    <div style={{ margin: '20px 0 0 20px' }}>
      <h1>Phonebook</h1>
      <ContactForm handleSubmit={addContact} />

      <h2>Contacts</h2>
      <Filter handleInput={handleFilterInput} />
      <ContactList
        contacts={contacts}
        filterState={filter}
        handleBtnClick={removeContact}
      />
    </div>
  );
}
