from PIL import Image
from io import BytesIO

import base64

def fun_open(data):
  return Image.open(BytesIO(base64.b64decode(data, '-_')))
