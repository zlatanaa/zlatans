import { connect } from 'react-redux'
import VerifyPassword from  '../pages/register/VerifyPassword'

export default connect(state=>({phone:state.phone}))(VerifyPassword)