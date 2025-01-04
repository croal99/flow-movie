import MovieList from "../MovieList.cdc"

transaction(newGreeting: String) {
        prepare(signer: &Account) {

  }

  execute {
    MovieList.changeGreeting(newGreeting: newGreeting)
  }
}