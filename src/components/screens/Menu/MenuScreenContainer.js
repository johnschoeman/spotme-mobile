import { connect } from 'react-redux'

import { logoutUser } from '../../../redux/actions/sessionActions'
import MenuScreen from './MenuScreen'

const mapStateToProps = (state, ownProps) => {

  return {

  };
};

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    logoutUser: () => dispatch(logoutUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuScreen);
