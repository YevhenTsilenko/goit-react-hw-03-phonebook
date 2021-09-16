import PropTypes from 'prop-types';
import styles from './ContactList.module.css';

function ContactList ({ contacts, onDelete }) {
    return (
        <ul >
        {contacts.map(({ id, name, number }) => (
          <li key={id} className={styles.contact}>
            <span>
              {name}: {number}
            </span>
            <button
              className={styles.button}
              type="button"
              onClick={() => onDelete(id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    )
}

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  
};

export { ContactList };