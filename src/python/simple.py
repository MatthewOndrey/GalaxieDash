from gpiozero import Button
from signal import pause
from flask import render_template, Flask, Response, json, send_from_directory
from flask_cors import CORS
import RPi.GPIO as gpio
import time

gpio.setmode(gpio.BCM)


app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

a_pin = 18
b_pin = 23
hallpin = 18
ledpin = 23
gpio.setup(hallpin, gpio.IN)
gpio.setup(ledpin, gpio.OUT)
gpio.output(ledpin, False)

def hallread():    
    return gpio.input(hallpin)    

def discharge():
    gpio.setup(a_pin, gpio.IN)
    gpio.setup(b_pin, gpio.OUT)
    gpio.output(b_pin, False)
    time.sleep(0.005)

def charge_time():
    gpio.setup(b_pin, gpio.IN)
    gpio.setup(a_pin, gpio.OUT)
    count = 0
    gpio.output(a_pin, True)
    while not GPIO.input(b_pin):
        count = count + 1
    return count

def analog_read():
    discharge()
    return charge_time()

currentspeed = 0
currentfuel = 0
button = Button(18)

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

@app.route('/api/gethall')
def get_hall():
    return Response(
        json.dumps({'hall': hallread()}),
        mimetype='application/json'
    )
    
@app.route('/api/getfuel')
def get_fuel():
    return Response(
        json.dumps({'hall': hallread()}),
        mimetype='application/json'
    )

@app.route('/pydash')
def index():
    return render_template('pydash.html')

button.when_pressed = press_button

app.run(host='0.0.0.0', port=5000, debug=False)

while True:
    if(gpio.input(hallpin) == False):
        gpio.output(ledpin, True)
    else:
        gpio.output(ledpin, False)
        


