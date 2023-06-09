
from flask import Flask
from flask import render_template
from flask import request

import model


app = Flask(__name__)

@app.route("/")
def home():
  return render_template("index.html")

@app.route("/upload", methods=['GET','POST'])
def upload():
  params = request.get_json(force=True)
  im = params["img"]
  pred = model.fun_open(im)
  
  
  return pred
  
if __name__ == "__main__":
  app.run(debug=True)
