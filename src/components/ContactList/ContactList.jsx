import { ContactItem } from 'components/ContactsItem/ContactsItem';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getFilterState, getContacts } from 'components/redux/selectors';
import { List } from 'components/ContactList/ContactList.styled';

let visibleContacts = null;

export const ContactList = ({ handleBtnClick }) => {
  const filterState = useSelector(getFilterState);
  const contacts = useSelector(getContacts);

  if (filterState === '') {
    visibleContacts = contacts;
  } else {
    visibleContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(filterState)
    );
  }
  return (
    <List>
      {visibleContacts.map(({ id, name, number }) => (
        <ContactItem
          key={id}
          name={name}
          number={number}
          handleRemoval={handleBtnClick}
        />
      ))}
    </List>
  );
};

ContactList.propTypes = {
  handleBtnClick: PropTypes.func.isRequired,
};
