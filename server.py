from click import confirm
from flask import Flask, request, render_template, redirect, url_for
from flask_cors import CORS
from elasticsearch7 import Elasticsearch
import flask_login
import mysql.connector
from recommender import MovieRec
from helper import Movie
from flask_login import LoginManager
login_manager = LoginManager()

#to connect to the MySQL database that contains the user login details
con = mysql.connector.connect(host = "localhost", port = "3306", database = "cia",user = "root", password = "root")
cursor = con.cursor()


#to connect to the ElasticSearch Server that provides fuzzy search 
es = Elasticsearch("http://127.0.0.1:9200")

app = Flask(__name__)
app.secret_key = 'yomama'
cors = CORS(app)

login_manager.init_app(app)


movie = Movie()

Recommender = MovieRec()
names = movie.get_movie_name()
users1 = {}


def userFetch():
    #function to fetch the users from the database
    global users1
    cursor.execute("SELECT * FROM login")
    users = cursor.fetchall()
    users_ = {"uid" : [] , "pwd" : []}
    for i in users:
        users_["uid"].append(i[0])
        users_["pwd"].append(i[1])
    users1 = users_

userFetch()


class User(flask_login.UserMixin):
    pass


@login_manager.user_loader
def user_loader(userid):
    if userid not in users1["uid"]:
        return

    user = User()
    user.id = userid
    return user

@login_manager.request_loader
def request_loader(request):
    userid = request.form.get('uid')
    if userid not in users1["uid"]:
        return

    user = User()
    user.id = userid
    return user



@app.route("/login", methods = ["POST", "GET"])
def login():

    userFetch()

    if request.method == "GET":
        return render_template("login.html")
    
    uid = request.form['uid']
    if uid in users1["uid"]:
        num = users1["uid"].index(uid)
        pwrd = users1["pwd"][num]
        if request.form['pwd'] == pwrd:
            user = User()
            user.id = uid
            flask_login.login_user(user)
            return redirect(url_for('protected'))

    return "Bad Login"

@app.route("/register", methods = ["POST", "GET"])
def register():
    
    userFetch()

    if request.method == "GET":
        return render_template("register.html")


    if request.method == "POST":
        username = request.form['uid']
        password = request.form["pwd"]
        confirmation = request.form["confirmation"]

        if username in users1["uid"]:
            _warning = "Username already exists"
            return render_template("register.html", warning1 = _warning)
        
        elif confirmation!= password:
            _warning = "Passwords do not match"
            return render_template("register.html", warning2 = _warning)

        else:
            password = request.form["pwd"]
            query = "insert into login values(%s,%s)"
            values = (username, password)

            cursor.execute(query,values)
            con.commit()
            
            return redirect(url_for("login"))

    return "Bad Login"


#this route handles the autocomplete functionality of the search-bar in the home page
@app.route("/search")
def search_autocomplete():
    query = request.args["q"].lower()
    tokens = query.split(" ")

    clauses = [
        {
            "span_multi": {
                "match": {"fuzzy": {"name": {"value": i, "fuzziness": "AUTO"}}}
            }
        }
        for i in tokens
    ]

    payload = {
        "bool": {
            "must": [{"span_near": {"clauses": clauses, "slop": 0, "in_order": False}}]
        }
    }

    resp = es.search(index="movie_names", query=payload, size=8)
    print("serving ")

    resp_dict = {"vals" : []}
    for result in resp['hits']['hits']:
        resp_dict["vals"].append(result['_source']['name'])
    return resp_dict


@app.route('/protected')
@flask_login.login_required
def protected():
    return render_template("home.html", user = flask_login.current_user.id)


@app.route('/logout')
def logout():
    flask_login.logout_user()
    return redirect("http://127.0.0.1:5000/login")

#route that returns recommended movies for a given movie
@app.route("/suggest" , methods = ["POST"])
def suggest():
    movie_title = request.form["movie-search-bar"]

    try: 
        movie_list = [i[0] for i in Recommender.get_recommendations(movie_title)]
        poster_links = [movie.get_poster_link(i) for i in movie_list]
        
        movie_links = [movie.get_movie_links(i) for i in movie_list]
        
        movies = [[movie_list[i], poster_links[i], movie_links[i]] for i in range(len(movie_list))]
        
        return render_template("home.html", user = flask_login.current_user.id, movies = movies)
    except KeyError:
        return "The Movie was not found"


if __name__ == "__main__":
    app.run(debug=True, port = 5000)
