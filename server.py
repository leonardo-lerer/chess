
from flask import Flask
from flask import render_template
from flask import request

import model


app = Flask(__name__)

@app.route("/")
def home():
  return render_template("index2.html")

@app.route("/upload", methods=['GET','POST'])
def upload():
  params = request.get_json(force=True)
  im = params["img"]
  im = model.fun_open(im)
  
  
  return "try"
  
if __name__ == "__main__":
  app.run(debug=True)
