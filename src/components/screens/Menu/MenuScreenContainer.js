import { connect } from 'react-redux'

import MenuScreen from './MenuScreen'

const mapStateToProps = (state, ownProps) => {
  const currentUser = state.session.currentUser
  console.log(currentUser);
  return {
    currentUser
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {

  return {

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuScreen);
