import actions from 'src/actions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
export default connect(
    state => ({state}),
    dispatch => bindActionCreators(actions, dispatch)
)
