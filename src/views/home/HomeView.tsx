import React from 'react';
import { useAppDispatch } from '../../store/store';
import { hello } from '../../store/user/userSlice';

const HomeView = () => {

    const dispatch = useAppDispatch();

    const sendHello = (e: React.MouseEvent<HTMLButtonElement>) => {
        
        dispatch(hello());
    };

    return <button onClick={sendHello}>Hello</button>
}

export default HomeView;