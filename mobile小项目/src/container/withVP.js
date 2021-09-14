import {connect} from 'react-redux'
import VerifyPhone from '../pages/register/verifyPhone'
import { savePhone } from '../redux/actions'
export default connect(state=>({phone:state.phone}),{savePhone})(VerifyPhone)