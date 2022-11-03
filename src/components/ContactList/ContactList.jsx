import { ContactItem } from 'components/ContactsItem/ContactsItem';
import PropTypes from 'prop-types';
import { List } from 'components/ContactList/ContactList.styled';

let createContacts = null;
let creatContactItem = null;

export const ContactList = ({ contacts, filterState, handleBtnClick }) => {
  creatContactItem = ({ id, name, number }) => (
    <ContactItem
      key={id}
      name={name}
      number={number}
      handleRemoval={handleBtnClick}
    />
  );

  if (filterState === '') {
    createContacts = contacts.map(creatContactItem);
  } else {
    createContacts = contacts
      .filter(contact => contact.name.toLowerCase().includes(filterState))
      .map(creatContactItem);
  }

  return <List>{createContacts}</List>;
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  filterState: PropTypes.string.isRequired,
  handleBtnClick: PropTypes.func.isRequired,
};
