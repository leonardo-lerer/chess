from PIL import Image
from io import BytesIO
import numpy as np
import pickle
import base64
import tensorflow as tf
import lightgbm

def fun_open(data):
  data = data[22:] + "===="
  im = Image.open(BytesIO(base64.b64decode(data)))
  im = np.array(im.resize((128,128)))
  im = im[np.newaxis,...]
  
  conv_model = tf.keras.models.load_model('static/conv_model.h5')
  gbm_model = pickle.load(open("static/gbm_model.pkl", "rb"))
  im = tf.reshape(conv_model(im), [1,-1])
  res = gbm_model.predict(im)
  return "try"
  
  
