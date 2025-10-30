from flask import Flask, request, jsonify
import pickle
import xgboost as xgb
import pandas as pd
import requests

from flask_cors import CORS, cross_origin
app = Flask(__name__)
CORS(app, support_credentials=True)
samples=pd.read_csv("./merged.csv")