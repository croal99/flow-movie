import {IManageOnChain, IManageStoreOnChain, IMovieOnChain} from "@/types/IMovieInfo.ts";
import {IPlayerOnChain} from "@/types/IPlayerOnChain.ts";
import * as fcl from "@onflow/fcl";
import {useEffect, useState} from "react";

export const useFlowMovie = () => {
    const [user, setUser] = useState({loggedIn: false});

    // user for you automatically.
    useEffect(() => {
        fcl.currentUser().subscribe(setUser);
    }, [])

    const getStoreMovies = async () => {
        console.log("getStoreMovies");
        const result = await fcl.query({
            cadence: `
      import MovieList from 0xf8d6e0586b0a20c7

      access(all) fun main(): [MovieList.Info] {
        return MovieList.getList()
      }
      `,
            args: (arg, t) => []
        });

        console.log(result);
        const movie_list:IMovieOnChain[] = [];

        console.log("movie list", movie_list);

        return movie_list;
    }


    return {
        getStoreMovies,
    }
}