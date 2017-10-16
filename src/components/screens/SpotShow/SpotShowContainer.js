import { connect } from 'react-redux'

import SpotShow from './SpotShow'

const mapStateToProps = (state, ownProps) => {

  return {
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {

  return {

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpotShow);
