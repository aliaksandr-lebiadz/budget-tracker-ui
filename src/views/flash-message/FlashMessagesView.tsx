
import FlashMessageComponents from '../../components/flash-message';
import { useAppSelector } from '../../store/store';
import FlashMessage from './FlashMessage';

const FlashMessagesView = () => {
    const flashMessages = useAppSelector((state) => state.flashMessages);

    return (
        <FlashMessageComponents.Wrapper>
            {flashMessages.map(flashMessage => (
                <FlashMessage key={flashMessage.id} {...flashMessage} />
            ))}
        </FlashMessageComponents.Wrapper>
    );
};

export default FlashMessagesView;