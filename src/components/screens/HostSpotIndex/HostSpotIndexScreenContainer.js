import { connect } from 'react-redux'

import HostSpotIndexScreen from './HostSpotIndexScreen'
import { getOwnSpots } from '../../../redux/selectors/entitiesSelectors'

const mapStateToProps = (state, ownProps) => {

  return {
    ownSpots: getOwnSpots(state)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {

  return {

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HostSpotIndexScreen);
