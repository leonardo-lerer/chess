from PIL import Image
from io import BytesIO
import numpy as np
import pickle
import base64
import tensorflow as tf
# import lightgbm
import sklearn 

int_to_str = {1: "wr", 2: "wn", 3: "wb", 4 : "wq", 5 : "wk", 6 : "wp",
              7 : "br", 8 : "bn", 9 : "bb", 10 : "bq", 11 : "bk", 12 : "bp",
              0 : "nn"}
conv_model = tf.keras.models.load_model('static/conv_model.h5')
preprocess = tf.keras.applications.mobilenet_v2.preprocess_input

#gbm_model = pickle.load(open("static/gbm_model_new.pkl", "rb"))
# log_reg = tf.keras.models.load_model('static/log_reg.h5')
sk_log_reg = pickle.load(open("static/sk_log_reg.pkl", "rb"))

def fun_open(data):
  data = data[22:] + "===="
  im = Image.open(BytesIO(base64.b64decode(data))).convert('L')
  im = np.array(im.resize((128,128)))
  im = im[np.newaxis,...]
  im = np.repeat(im[..., np.newaxis], 3, -1)
  im = preprocess(im)
  im = tf.reshape(conv_model(im), [1,-1])
#   res = int_to_str[np.argmax(gbm_model.predict(im))]
  res = int_to_str[np.argmax(sk_log_reg.predict(im))]
  return res

  
  
