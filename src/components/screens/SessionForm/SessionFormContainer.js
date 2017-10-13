import { connect } from 'react-redux'

import SessionForm from './SessionForm'
import { receiveCurrentUser } from '../../../redux/actions/sessionActions'

const mapStateToProps = (state, ownProps) => {

  return {

  };
};

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    receiveCurrentUser: userInfo => dispatch(receiveCurrentUser(userInfo))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
