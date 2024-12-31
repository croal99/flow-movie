import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Chip from '@mui/material/Chip';
import Stack from "@mui/material/Stack";
import Divider from '@mui/material/Divider';
import Typography from "@mui/material/Typography";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Badge, CircularProgress, LinearProgress} from "@mui/material";


import {useWalrus} from "@/hooks/useWalrusFile.ts";
import toast from "react-hot-toast";
import {useEffect, useState} from "react";
import Player from "@components/movie/Player.tsx";
import MovieInfo from "@components/movie/MovieInfo.tsx";
import MovieProvider from "@/provider/movieProvider.tsx";

import {useFlowMovie} from "@/hooks/useFlowMovie.ts";
import {useLoaderData} from "react-router-dom";
import {IManageOnChain, IMovieOnChain} from "@/types/IMovieInfo.ts";

import {IPlayerOnChain} from "@/types/IPlayerOnChain.ts";
import TextField from "@mui/material/TextField";
import * as fcl from "@onflow/fcl";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

export async function loader({params}) {
    const id = params.id;
    return {id};
}

export default function ViewPage() {
    const [isDownload, setIsDownload] = useState(false);
    const [blobUrl, setBlobUrl] = useState('');
    const [blobId, setBlobId] = useState('');
    const [manageInfo, setManageInfo] = useState<IManageOnChain>();
    const [movieInfo, setMovieInfo] = useState<IMovieOnChain>();
    const [player, setPlayer] = useState<IPlayerOnChain>();
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [openPay, setOpenPay] = useState(false);
    const [isSubscribe, setIsSubscribe] = useState(false);
    const [user, setUser] = useState({loggedIn: false});

    const env = import.meta.env;
    const MOVIE_CLIENT = env.VITE_MOVIE_CLIENT;

    const {id} = useLoaderData();
    const {getBufferFromWalrus} = useWalrus();

    const handlePlayMovie = async (index: number) => {
        const blob_id = movieInfo?.blob_ids[index] || "";

        setIsDownload(false);
        setOpen(true);

        const data = await getBufferFromWalrus(blob_id, movieInfo?.key);

        if (!data) {
            toast.error("Network Error!");
            setOpen(false);
            return false;
        }

        const blob = new Blob([new Uint8Array(data)], {type: "video/mp4"});
        setBlobUrl(URL.createObjectURL(blob));
        setIsDownload(true);
        setOpen(false);
        toast.success("Loading successfully");
    }

    const fetchData = async () => {
        // console.log("fetchData", id, user);
        if (!user.loggedIn) {
            setIsLoading(true);

            return
        }
        setIsLoading(true);
        const result = await fcl.query({
            cadence: `
      import MovieList from ${MOVIE_CLIENT}

      access(all) fun main(): [MovieList.Info] {
        return MovieList.getList()
      }
      `,
            args: (arg, t) => []
        });

        setMovieInfo(result[id]);

        setIsLoading(false);
    }

    useEffect(() => {
        fetchData().then(() => {
            // console.log('end fetch');
        });

        return () => {
        }
    }, [user]);

    useEffect(() => {
        fcl.currentUser().subscribe(setUser);

    }, []);

    if (isLoading) {
        return (
            <>
                {/*<LinearProgress/>*/}
                <Container
                    sx={{
                        pt: {xs: 4, sm: 16},
                        pb: {xs: 8, sm: 16},
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: {xs: 3, sm: 6},
                    }}
                >
                    <CircularProgress size="30px"/>
                    Waiting to connect your wallet.
                    <Stack sx={{width: '100%', color: 'grey.500'}} spacing={2}>
                        <LinearProgress color="success"/>
                    </Stack>
                </Container>
            </>
        )
    }

    return (
        <Container
            sx={{
                pt: {xs: 4, sm: 16},
                pb: {xs: 8, sm: 16},
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: {xs: 3, sm: 6},
            }}
        >

            <Box
                sx={{
                    width: {sm: '100%', md: '100%'},
                    textAlign: {sm: 'left', md: 'center'},
                }}
            >
                <Grid container spacing={2}>
                    <Grid size={8}>
                        <Stack spacing={2}>
                            {isDownload ?
                                (
                                    <Item>
                                        <Player videoUrl={blobUrl}/>
                                    </Item>
                                ) :
                                <MovieProvider file={movieInfo}>
                                    <MovieInfo/>
                                </MovieProvider>
                            }
                        </Stack>
                    </Grid>
                    <Grid size={4}>
                        <Stack spacing={2}>

                            <Item>
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                >
                                    {movieInfo?.description}
                                </Typography>
                            </Item>

                            <Grid container spacing={1} columns={4}>
                                {movieInfo?.blob_ids.map((id, index) => (
                                    <Grid key={index} size={1}>
                                        <Paper>
                                            {index < movieInfo.free_count ?
                                                <Badge color="success" badgeContent={"free"}>
                                                    <Button onClick={() => handlePlayMovie(index)}> {index + 1}</Button>
                                                </Badge> :
                                                <Button onClick={() => handlePlayMovie(index)}> {index + 1}</Button>
                                            }
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>

                        </Stack>
                    </Grid>
                </Grid>
            </Box>

            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>
                    Please wait to read data from Walrus.
                </DialogTitle>
                <DialogContent>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 2,
                        }}
                    >
                        <CircularProgress/>
                    </Box>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>

        </Container>
    );
}
