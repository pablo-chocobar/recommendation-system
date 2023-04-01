from helper import Name
from elasticsearch7 import Elasticsearch
name = Name()
es = Elasticsearch("http://127.0.0.1:9200")

movies = name.get_names()

# for i in movies:
#     print(i)
# for i in range(len(movies)):
#     movie_body = {"name": movies[i]}
#     es.index(index="movie_names", id= i, document= movie_body)
#     print(movie_body)

# print("done")

# print(es.indices.refresh(index='movie_names'))

data = es.get(index="movie_names",id=11000) 
print(data)