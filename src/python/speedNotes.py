



while True:
    if button.is_pressed:
        currentSpeed=currentSpeed+1
    else:
        if currentSpeed > 0:
            currentSpeed=currentSpeed-1