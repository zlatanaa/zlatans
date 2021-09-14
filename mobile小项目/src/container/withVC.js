import { connect } from "react-redux";
import VerifyCode from "../pages/register/VerifyCode";
export default connect(state=>({phone:state.phone}),)(VerifyCode)