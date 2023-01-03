from gpiozero import Button
import json
from flask import Flask, Response, send_from_directory
app = Flask(__name__, static_folder=None)
button = Button(2)

currentSpeed = 0

@app.route('/')
def hello_world():
    return "<P>Hello, World!</P>"

@app.route('/api/getspeed', methods=['GET'])
def get_speed():
    out_status = currentSpeed
    return Response(
        json.dumps({'status': out_status}),
        mimetype='application/json'
    )

