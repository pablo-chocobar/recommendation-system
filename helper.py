from os import link
import pandas as pd

class Movie():
    def __init__(self) -> None:
        self.db = pd.read_csv("poster.csv")
        
    def get_poster_link(self, title):
        self.poster_link = "https://image.tmdb.org/t/p/w342"
        self.poster_link += self.db[self.db["title"] == title]["0"].values[0]
        return str(self.poster_link)

    def get_movie_name(self):
        return self.db["title"].to_list()

    def get_movie_links(self, title):
        self.movie_id = self.db[self.db["title"] == title]["id"].values[0]
        self.name_split = str(self.movie_id)
        for i in title.split(" "):
            self.name_split += "-" + i 
        self.name_split = self.name_split.rstrip("-") 
        self.movie_link = "https://tmdb.org/movie/" + self.name_split
        return str(self.movie_link)

