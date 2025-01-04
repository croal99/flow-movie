access(all) contract MovieList {
    access(all) struct Info {
        access(all) let name: String
        access(all) let url: String
        access(all) let title: String
        access(all) let tag: String
        access(all) let actors: String
        access(all) let year: String
        access(all) let description: String
        access(all) let key: String
        access(all) let iv: String
        access(all) let blob_ids: [String]
        access(all) let total: Int
        access(all) let free: Int

        init(_name: String, _url: String, _title: String, _tag: String, _actors: String, _year: String,
        	_description: String, _key: String, _iv: String, _total: Int, _free: Int) {
            self.name = _name
            self.url = _url
            self.title = _title
            self.tag = _tag
            self.actors = _actors
            self.year = _year
            self.description = _description
            self.key = _key
            self.iv = _iv
            self.total = _total
            self.free = _free
            self.blob_ids = []
        }
    }

access(all) var greeting: String
    access(all) var movies: [Info]

    access(all) fun changeGreeting(newGreeting: String) {
        self.greeting = newGreeting
    }
    access(all) fun getList(): [Info] {
        return self.movies
    }

    access(all) fun addInfo(name: String, url: String, title: String, tag: String, actors: String, year: String,
    	description: String, key: String, iv: String, total: Int, free: Int) {
		let newInfo = Info(_name: name, _url: url, _title:title, _tag:tag, _actors:actors, _year:year,
			_description:description, _key:key, _iv:iv, _total:total, _free:free)

		self.movies.append(newInfo)
	}

	access(all) fun addBlobIDS(idx: Int, blob_ids: [String]) {
        for blob_id in blob_ids {
            self.movies[idx].blob_ids.append(blob_id);
        }
	}

    init() {
        self.greeting = "Hello, Flow Movie!"
        self.movies = []
    }

}
