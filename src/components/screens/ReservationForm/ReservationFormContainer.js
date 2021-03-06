import { connect } from 'react-redux'

import ReservationForm from './ReservationForm'
import { receiveReservation } from '../../../redux/actions/reservationActions'

const mapStateToProps = (state, ownProps) => {

    return {
      currentUser: state.session.currentUser
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {

    return {
        receiveReservation: user => dispatch(receiveReservation(user))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReservationForm);
