import { connect } from 'react-redux'

import FBLoginForm from './FBLoginForm'
import { receiveCurrentUser } from '../../../../redux/actions/sessionActions'

const mapStateToProps = (state, ownProps) => {

  return {
  
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    receiveCurrentUser: user => dispatch(receiveCurrentUser(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FBLoginForm);
