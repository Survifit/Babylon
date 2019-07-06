import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/languages.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# # Save references to each table
StatusUNESCO = Base.classes.language_status_UNESCO
importData = Base.classes.importdata
# Samples = Base.classes.samples

#Page routes
#Home-page (globe graph)
@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

#Statistics
@app.route("/statistics")
def statistics():
    """Return the statistics charts"""
    return render_template("statistics.html")

#tables
@app.route("/tables")
def tables():
    """Return the data tables"""
    return render_template("tables.html")

#Language families and english details
@app.route("/english")
def english():
    """Return the language network graphs"""
    return render_template("english.html")

#Spam 'easter egg' page
@app.route("/spam")
def spam():
    """Return the hidden Spam page"""
    return render_template("spam.html")

@app.route("/unescoTable")
def unescoTable():
    """Return the html table"""
    return render_template("unescoData.htm")

@app.route("/api/unesco")
def unesco():
    """Return the UNESCOData"""
    sel = [
        StatusUNESCO.Latitude,
        StatusUNESCO.Longitude,
        StatusUNESCO.Degreeofendangerment
    ]

    #results = db.session.query(*sel).all()
    results = db.session.query(*sel).all()
    # Create a dictionary entry for each row of metadata information
    UNESCOdata = {}
    UNESCOdata["Latitude"] = []
    UNESCOdata["Longitude"] = []
    UNESCOdata["Degreeofendangerment"] = []
    for result in results:
        UNESCOdata["Latitude"].append(result[0])
        UNESCOdata["Longitude"].append(result[1])
        UNESCOdata["Degreeofendangerment"].append(result[2])
        

    #print(results)
    return jsonify(UNESCOdata)

@app.route("/api/import")
def importRoute():
    """Return the import language data"""
    sel = [
        importData.e,
        importData.i,
        importData.v 
    ]

    results = db.session.query(*sel).all()

    loanerWordData = []
    for result in results:
        tmpDict = {}
        tmpDict["e"] = result[0]
        tmpDict["i"] = result[1]
        tmpDict["v"] = result[2] * 5000
        loanerWordData.append(tmpDict)

    return jsonify(loanerWordData)


if __name__ == "__main__":
    app.run()
