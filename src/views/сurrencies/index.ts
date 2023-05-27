import { withAuthentication } from '../../utils/authUtils';
import CurrenciesView from './CurrenciesView';

export default withAuthentication(CurrenciesView, true);
