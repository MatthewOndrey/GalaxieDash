from gpiozero import Button
from signal import pause
from flask import render_template, Flask, Response, json, send_from_directory
from flask_cors import CORS
import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)


app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

a_pin = 18
b_pin = 23

def discharge():
    GPIO.setup(a_pin, GPIO.IN)
    GPIO.setup(b_pin, GPIO.OUT)
    GPIO.output(b_pin, False)
    time.sleep(0.005)

def charge_time():
    GPIO.setup(b_pin, GPIO.IN)
    GPIO.setup(a_pin, GPIO.OUT)
    count = 0
    GPIO.output(a_pin, True)
    while not GPIO.input(b_pin):
        count = count + 1
    return count

def analog_read():
    discharge()
    return charge_time()

currentspeed = 0
currentfuel = 0
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

@app.route('/api/getfuel')
def get_fuel():
    return Response(
        json.dumps({'currentfuel': analog_read()}),
        mimetype='application/json'
    )

@app.route('/pydash')
def index():
    return render_template('pydash.html')

button.when_pressed = press_button
