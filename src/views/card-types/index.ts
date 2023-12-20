import { withAuthentication } from '../../utils/authUtils';
import CardTypesView from './CardTypesView';

export default withAuthentication(CardTypesView, true);
