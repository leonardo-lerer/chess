from PIL import Image
from io import BytesIO
import numpy as np
import pickle
import base64
import tensorflow as tf

def fun_open(data):
  data = data[22:] + "===="
  im = Image.open(BytesIO(base64.b64decode(data)))
  im = np.array(im.resize((128,128)))
  im = im[np.newaxis,...]
  
  conv_model = tf.keras.models.load_model('static/conv_model.h5')
  xgb_model = pickle.load(open("static/xgb_model.pkl", "rb"))
  im = np.reshape(conv_model(im), (1,-1))
  res = xgb_model.predict_proba(im)
  return "try"
  
  
