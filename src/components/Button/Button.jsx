import PropTypes from 'prop-types';
import s from 'components/Button/Button.module.css';

const Button = ({ onPress }) => {
  return (
    <button className={s.button} type="button" onClick={onPress}>
      Load more
    </button>
  );
};
Button.propTypes = {
  onPress: PropTypes.func.isRequired,
};
export default Button;
