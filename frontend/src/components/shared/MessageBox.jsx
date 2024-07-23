import Alert from 'react-bootstrap/Alert';
import  PropTypes  from 'prop-types';

const MessageBox = ({children, variant}) => {
  return (
      <Alert variant={variant || "info"} >{children}</Alert>
  );
};

MessageBox.propTypes = {
  children: PropTypes.any,
  variant: PropTypes.string
};

export default MessageBox;