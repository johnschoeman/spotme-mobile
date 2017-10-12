import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import NewSpotScreen from './NewSpotScreen'
import { receiveSpot } from '../../../redux/actions/spotEntityActions'

const mapStateToProps = (state, ownProps) => {
  const backAction = NavigationActions.back()

  return {
    navigateBack: () => ownProps.navigation.dispatch(backAction),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    receiveSpot: spot => dispatch(receiveSpot(spot))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewSpotScreen);
