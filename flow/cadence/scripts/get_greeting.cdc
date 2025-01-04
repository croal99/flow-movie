import MovieList from "../MovieList.cdc"

access(all) fun main(): String {
    let movies = MovieList.getList()

        for movie in movies {
            log(movie.title)
        }

        //MovieList.changeGreeting(newGreeting: "Hello World2")
        log("aaa")
  return MovieList.greeting
}