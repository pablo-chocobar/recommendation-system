import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.metrics.pairwise import linear_kernel, cosine_similarity

class MovieRec():
    def __init__(self) -> None:
        self.movies = pd.read_csv("re-movies.csv")
        self.pop = pd.read_csv("popularity.csv")
        self.titles = self.movies['title']
        self.indices = pd.Series(self.movies.index, index=self.movies['title'])

        self.count_cosine_sim = self.count_cosine(self.movies)
    
    def count_cosine(self,df,col = "soup"):
        count = CountVectorizer(analyzer='word',ngram_range=(1, 2), stop_words='english')
        count_matrix = count.fit_transform(df[col])
        count_matrix = count_matrix.astype("float32")
        count_cosine_sim = cosine_similarity(count_matrix, count_matrix)
        
        return count_cosine_sim

    def get_recommendations(self,title):
        idx = self.indices[title]
        sim_scores = list(enumerate(self.count_cosine_sim[idx]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        sim_scores = sim_scores[1:26]
        movie_indices = [i[0] for i in sim_scores]
        
        recs = self.movies.iloc[movie_indices]
        threshold = self.pop["0"].quantile(0.60)
        
        index, qualified_titles, qualified_popularity = recs[(recs["popularity"] >= threshold)].index, recs[(recs["popularity"] >= threshold)]["title"],\
        recs[(recs["popularity"] >= threshold)]["popularity"]
        
        sim_scores = [sim_scores[i][1] for i in range(len(movie_indices)) if movie_indices[i] in index]
        
        return [[qualified_titles[index[i]],qualified_popularity[index[i]],sim_scores[i]] for i in range(len(index))]

# t1c = time.perf_counter()    
# recommender = MovieRec()
# t2c = time.perf_counter()
# print(recommender.get_recommendations("The Dark Knight")[:10])
# t3c = time.perf_counter()

# print(f"\ninit{t1c- t2c:0.4f} seconds\nrecs{t2c- t3c:0.4f} seconds\ntotal{t1c- t3c:0.4f} seconds\n")