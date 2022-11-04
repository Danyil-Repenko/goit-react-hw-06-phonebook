import PropTypes from 'prop-types';
import { DeleteBtn } from './ContactItem.styled';
import { deleteContact } from 'components/redux/contactSlice';
import { useDispatch } from 'react-redux';

export const ContactItem = ({ contact: { name, number, id } }) => {
  const dispatch = useDispatch();

  const removeContact = () => dispatch(deleteContact(id));

  return (
    <li style={{ marginBottom: 10 }}>
      {name}: {number}
      <DeleteBtn type="button" onClick={removeContact}>
        Delete
      </DeleteBtn>
    </li>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};
