import { connect } from 'react-redux'

import HomeConditionalScreen from './HomeConditionalScreen'

const mapStateToProps = (state, ownProps) => {

  return {
    isLoggedIn: Boolean(state.session.currentUser)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {

  return {

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeConditionalScreen);
