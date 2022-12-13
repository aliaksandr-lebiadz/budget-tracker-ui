import { useAppDispatch } from '../../store/store';
import { hello, helloAdmin } from '../../store/user/userSlice';

const HomeView = () => {

    const dispatch = useAppDispatch();

    const sendHello = () => {
        
        dispatch(hello());
    };

    const sendHelloAdmin = () => {
        
        dispatch(helloAdmin());
    };

    return (
        <>
            <button onClick={sendHello}>Hello</button>
            <button onClick={sendHelloAdmin}>Hello admin</button>
        </>
    );
}

export default HomeView;