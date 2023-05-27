import { CircularProgress, SxProps } from '@mui/material';
import { Theme } from '@emotion/react';

import styles from './Loading.styles';

interface Props {
    
    sx?: SxProps<Theme>,
};

const Loading = (props: Props) => <CircularProgress sx={{...styles.root, ...props.sx}} size={24} />;

export default Loading;