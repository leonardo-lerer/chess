from PIL import Image
from io import BytesIO
import numpy as np
import pickle
import base64

def fun_open(data):
  data = data[22:] + "===="
  im = Image.open(BytesIO(base64.b64decode(data)))
  im = np.array(im.resize((128,128)))
  im = x[np.newaxis,...]
  im = np.reshape(conv_model(x), (1,-1))
  conv_model = pickle.load(open("/static/conv_model.pkl, "rb"))
  xgb_model = pickle.load(open("/static/xgb_model.pkl, "rb"))
  res = xgb_model.predict_proba(x)
  return "try"
  
  
