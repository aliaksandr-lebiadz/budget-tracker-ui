import { withAuthentication } from '../../utils/authUtils';
import HomeView from './HomeView';

export default withAuthentication(HomeView);
