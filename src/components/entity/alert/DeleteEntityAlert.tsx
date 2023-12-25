import Alert from '../../alert/Alert';

interface Props {
    content: JSX.Element,

    onClose: () => void,
    onConfirm: () => void,
};

const DeleteEntityAlert = (props: Props) => {

    return (
        <Alert
            title='Are you sure?'
            content={props.content}
            closeButtonTitle='Close'
            confirmButtonTitle='Delete'
            onClose={props.onClose}
            onConfirm={props.onConfirm}
        />
    );
};

export default DeleteEntityAlert;