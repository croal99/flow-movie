import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import {useTheme} from '@mui/system';
import {CardActionArea, CardActions, CardMedia, CircularProgress, LinearProgress} from "@mui/material";
import Button from "@mui/material/Button";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {IMovieOnChain} from "@/types/IMovieInfo.ts";
import {useFlowMovie} from "@/hooks/useFlowMovie.ts";
import Stack from "@mui/material/Stack";
import * as fcl from "@onflow/fcl";

export default function MovieList() {
    const [user, setUser] = useState({loggedIn: false});
    const [isLoading, setIsLoading] = useState(true);
    const [movieList, setMovieList] = useState<IMovieOnChain[] | []>([]);
    const navigate = useNavigate();
    const {MAIN_STORE_ID, getStoreMovies} = useFlowMovie();

    const env = import.meta.env;
    const Deployer = env.VITE_PUBLIC_CONTRACT_ADDRESS;

    const fetchData = async () => {
        if (!user.loggedIn) {
            console.log("User logged out...");
            return;
        }
        setIsLoading(true);
        const result = await fcl.query({
            cadence: `
      import MovieList from 0x${Deployer}

      access(all) fun main(): [MovieList.Info] {
        return MovieList.getList()
      }
      `,
            args: (arg, t) => []
        });

        for (let i = 0; i < result.length; i++) {
            result[i].idx = i;
        }
        console.log("MovieList", result);
        setMovieList(result);
        setIsLoading(false);
    }

    useEffect(() => {
        fcl.currentUser().subscribe(setUser);

        fetchData().then(() => {
            // console.log('end fetch');
        });

        return () => {
            // console.log("uninstall application")
        }
    }, []);

    useEffect(() => {
        fetchData().then(() => {
            // console.log('end fetch');
        });
    }, [user]);

    const handleView = (movie: IMovieOnChain) => {
        // console.log("play", movie);
        navigate(`/view/${movie.idx}`);
    }

    return (
        <Container
            sx={{
                pt: {xs: 4, sm: 2},
                pb: {xs: 8, sm: 16},
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: {xs: 3, sm: 6},
            }}
        >
            {!user.loggedIn ?
                <>
                    <Stack sx={{width: '100%', color: 'grey.500'}} spacing={2}>
                        <LinearProgress color="success"/>
                    </Stack>
                    Waiting to connect your wallet.
                </> :
                <>
                    <Grid container spacing={2}>
                        {movieList.map((movieInfo, index) => (
                            <Grid size={{xs: 12, sm: 6, md: 4}} key={index} sx={{display: 'flex'}}>
                                <Card
                                    variant="outlined"
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        flexGrow: 1,
                                    }}
                                >
                                    <CardActionArea onClick={() => handleView(movieInfo)}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={movieInfo.url}
                                            alt={movieInfo.name}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {movieInfo.name}
                                            </Typography>
                                            <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                                {movieInfo.description}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>

                                    <CardActions>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </>
            }
        </Container>
    );
}
