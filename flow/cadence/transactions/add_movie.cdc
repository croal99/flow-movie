import MovieList from "../MovieList.cdc"

      transaction(name: String, url: String, title: String, tag: String, actors: String, year: String, description: String, key: String, iv: String, total: Int, free: Int) {
        prepare(signer: &Account) {

        }

        execute {
          MovieList.addInfo(name: name, url: url, title: title, tag: tag, actors: actors, year: year, description: description, key: key, iv: iv, total: total, free: free)
        }
}