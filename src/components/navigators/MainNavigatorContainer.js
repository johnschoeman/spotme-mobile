import { connect } from 'react-redux'

import MainNavigator from './MainNavigator'

const mapStateToProps = (state, ownProps) => {

  return {
    screenProps: {
      isLoggedIn: Boolean(state.session.currentUser)
    }
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {

  return {

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainNavigator);
