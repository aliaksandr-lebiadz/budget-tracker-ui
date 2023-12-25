import { withAuthentication } from '../../utils/authUtils';
import BanksView from './BanksView';

export default withAuthentication(BanksView, true);
