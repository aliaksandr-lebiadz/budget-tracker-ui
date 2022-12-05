import { withoutAuthentication } from '../../utils/authUtils';
import LoginView from './LoginView';

export default withoutAuthentication(LoginView);
