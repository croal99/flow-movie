import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import Logo from '@components/Logo.tsx';
import MovieList from "@components/MovieList.tsx";

const Item = styled(Paper)(({theme}) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(1),
}));

export default function HomePage() {
    return (
        <>
            <Logo />
            <div>
                <Divider />
                <MovieList />
                <Divider />
                <Item>
                    <Typography variant="body2" sx={{color: 'text.secondary'}}>
                        Version: 2024.12.31.01 [testnet]
                    </Typography>
                </Item>
            </div>
        </>
    );
}
