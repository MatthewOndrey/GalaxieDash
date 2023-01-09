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

joypin1=17
joypin2=27
ledpin = 23
gpio.setup(hallpin, gpio.IN)
gpio.setup(ledpin, gpio.OUT)
gpio.setup(joypin1, gpio.IN)
gpio.setup(joypin2, gpio.IN)
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
button1 = Button(17)
button2 = Button(27)

def press_button1():
    global currentspeed
    currentspeed = currentspeed + 1
    if (currentspeed > 120):
        currentspeed = 120
    return

def press_button2():
    global currentspeed
    currentspeed = currentspeed - 1
    if (currentspeed < 0):
        currentspeed=0
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

button1.when_pressed = press_button1
button2.when_pressed = press_button2


app.run(host='0.0.0.0', port=5000, debug=False)

        


