from flask import Flask, jsonify
from flask import request
from flask import session, g, redirect, url_for, abort, render_template, flash
from base64 import decodestring
from werkzeug.datastructures import FileStorage

import io


app = Flask(__name__)

@app.route('/')
def root():
  return render_template('/index.html')

@app.route('/ocr', methods=['POST'])
def ocr():
  request.files['image'].save('bla.png')
  return jsonify({"uuid": 'bla'})

if __name__ == '__main__':
  app.run('0.0.0.0', debug=True)