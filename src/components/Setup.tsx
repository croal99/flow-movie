import Button from "@mui/material/Button";
import * as fcl from "@onflow/fcl";
import {initiateData} from "@/hooks/initiateData.tsx";

export default function Setup() {
    const movieList = initiateData;

    const env = import.meta.env;
    const MOVIE_CLIENT = env.VITE_MOVIE_CLIENT;

    async function initMoveList() {
        for (const movie of movieList) {
            await initMoveInfo(movie)
            await initBlodId(movie.idx, movie.blob_ids)

        }
    }

    async function initMoveInfo(info) {
        console.log('initMoveList', info);
        const transactionId = await fcl.mutate({
            cadence: `
      import MovieList from 0xf8d6e0586b0a20c7

      transaction(name: String, url: String, title: String, tag: String, actors: String, year: String, description: String, key: String, iv: String, total: Int, free: Int) {
        prepare(signer: &Account) {

        }

        execute {
          MovieList.addInfo(name: name, url: url, title: title, tag: tag, actors: actors, year: year, description: description, key: key, iv: iv, total: total, free: free)
        }
      }
      `,
            args: (arg, t) => [
                arg(info.movie_info.name, t.String),
                arg(info.movie_info.url, t.String),
                arg(info.movie_info.title, t.String),
                arg(info.movie_info.tag, t.String),
                arg(info.movie_info.actors, t.String),
                arg(info.movie_info.year, t.String),
                arg(info.movie_info.description, t.String),
                arg(info.key, t.String),
                arg(info.iv, t.String),
                arg(info.movie_info.total, t.Int),
                arg(info.movie_info.free, t.Int)
            ],
            proposer: fcl.currentUser,
            payer: fcl.currentUser,
            authorizations: [fcl.currentUser.authorization],
            limit: 999
        });

        console.log('Transaction Id', transactionId);
    }

    async function initBlodId(idx, blob_ids) {
        console.log('initBlodId', idx, blob_ids);
        const transactionId = await fcl.mutate({
            cadence: `
      import MovieList from ${MOVIE_CLIENT}

      transaction(idx: Int, blob_ids: [String]) {
        prepare(signer: &Account) {

        }

        execute {
          MovieList.addBlobIDS(idx: idx, blob_ids: blob_ids)
        }
      }
      `,
            args: (arg, t) => [
                arg(idx, t.Int),
                arg(blob_ids, t.Array(t.String)),
            ],
            proposer: fcl.currentUser,
            payer: fcl.currentUser,
            authorizations: [fcl.currentUser.authorization],
            limit: 999
        });

        console.log('Transaction Id', transactionId);
    }

    return (
        <>
            <Button onClick={initMoveList}>Init</Button>
        </>
    )
}