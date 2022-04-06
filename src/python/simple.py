from gpiozero import Button
from signal import pause
from flask import Flask, Response, send_from_directory
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

currentspeed = 0
button = Button(2)

def press_button():
    global currentspeed
    currentspeed = currentspeed + 1
    return

@app.route("/")
def galaxie_root():
    return "GALAXIE 666" 


@app.route('/api/getspeed')
def get_speed():
    return Response(
        json.dumps({'currentspeed': currentspeed}),
        mimetype='application/json'
    )

button.when_pressed = press_button
