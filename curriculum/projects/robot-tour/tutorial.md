# Robot Tour Tutorial

```package
fwd-robot-tour=github:Forward-Education/pxt-robot-tour#v1.0.2
```

## Robot Tour Tutorial @showdialog
In this tutorial, you'll learn how to control your **Robot Tour** vehicle with the different MakeCode blocks available in Forward Education's Robot Tour extension.

<img src="https://raw.githubusercontent.com/Forward-Education/pxt-robot-tour/main/curriculum/projects/robot-tour/render.png" alt="Final robot tour render" style="display: block; width: 100%; margin:auto;">


## Step 1 @showdialog
To connect your vehicle to the computer, click the three dots beside the `|Download|` button, then select _Connect Device_. Follow the steps to pair your micro:bit.

<img src="https://raw.githubusercontent.com/Forward-Education/pxt-robot-tour/main/curriculum/general-assets/pairmicrobitGIF.webp"  alt="Pairing gif" style="display: block; width: 60%; margin:auto;">

## Step 2
Take a look at the `||fwdSensors:Sensors||` and `||fwdMotors:Motors||` categories to see the different blocks you can use to control your vehicle. We'll walk-through each of these in this tutorial.

## Step 3
First, you'll need to initialize the driving capabilites of your vehicle by dragging the `||fwdMotors:setup driving||` block into the `||Basic:on start||` event. Set which servo motors get treated as left and right.

```blocks
fwdMotors.setupDriving(
fwdMotors.leftServo,
fwdMotors.rightServo
)
```

## Step 4
To make your vehicle **drive forward** in a straight line, you can use a `||fwdMotors:set left to 0% and right to 0% for 0 ms||` block inside an event like `||input:on button A+B pressed||`.

The percentage values for left and right represent the speed for each motor. The millisecond (ms) value represents the length of time the motors are to run.

```blocks
input.onButtonPressed(Button.AB, function () {
    fwdMotors.drive(0, 0, 0)
})
```

## Step 5
Because the motors mirror each other on opposite sides of the vehicle, they will need to spin in _opposite directions_ to ensure the vehicle drives straight. This will allows the _wheels_ themselves to spin in the _same direction_. A positive value (e.g., 25) makes a motor spin forward, and a negative value (e.g., -25) makes it spin backward. 

To start, set the left motor to '30%' and the right motor to '-30%' for '2000 ms'. 

```blocks
input.onButtonPressed(Button.AB, function () {
    // @highlight
    fwdMotors.drive(30, -30, 2000)
})
```

## Step 6
Download your code. Test it out by pressing the A and B buttons on the micro:bit. What do you notice?

If the car is left-leaning, decrease the absolute value of the right motor. If the car is right-leaning, increase the absolute value of the right motor. Try a few different values until you are satisfied. Save these values somewhere as they will be slightly different for each build.

~hint Tell me more!
Servo motors can sometimes run at slightly different speeds, especially when spinning in reverse, which creates a slight bias towards one side. 
hint~

```blocks
input.onButtonPressed(Button.AB, function () {
    // @highlight
    fwdMotors.drive(30, -43, 2000)
})
```

## Step 7
You can also use a `||fwdMotors:set left to 0% and right to 0% for 0 ms||` block to **reverse**. In this case, you'll use a negative value for the left motor and a positive value for the right. 

To start, set the left motor to '-30%' and the right motor to '30%' for '2000 ms'. 

```blocks
input.onButtonPressed(Button.AB, function () {
    // @highlight
    fwdMotors.drive(-30, 30, 2000)
})
```

## Step 8
Adjust the speed of the right motor until you are satisfied with the bias reduction. Save these values somewhere as they will be slightly different for each build.

```blocks
input.onButtonPressed(Button.AB, function () {
    // @highlight
    fwdMotors.drive(-30, 20, 2000)
})
```

## Step 9
A vehicle should be able to drive _and_ break. You can use the `||fwdMotors:set leftServo to||` block to **break** the vehicle. 

Add two copies of this block inside a `||input:on logo pressed||` event for now. Select 'rightServo' from dropdown of the second block. This will allow you to stop both servos together!

```blocks
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    fwdMotors.leftServo.setSpeed(0)
    fwdMotors.rightServo.setSpeed(0)
})
```

## Step 10
Now, let's program a simple **right turn** with the `||fwdMotors:set left to 0% and right to 0% for 0 ms||` block. 

In this case, the left and right motor should both have _positive_ values for speed. This will ensure the _wheels_ are spinning in _opposite directions_. 

```blocks
input.onButtonPressed(Button.AB, function () {
    // @highlight
    fwdMotors.drive(30, 30, 2000)
})
```

## Step 11
Try to adjust the speed of the right motor _and_ the duration of the movement to complete a **90° turn to the right**. Save these values somehwere as they will be slightly different for each build.

```blocks
input.onButtonPressed(Button.AB, function () {
    // @highlight
    fwdMotors.drive(30, 30, 800)
})
```

## Step 12
To program a **left turn**, the left and right motor should both have _negative_ values for speed. 

Adjust the speed of the right motor _and_ the duration of the movement to complete a **90° turn to the left**. Save these values somewhere as they will be slightly different for each build.

```blocks
input.onButtonPressed(Button.AB, function () {
    // @highlight
    fwdMotors.drive(-30, -30, 1200)
})
```

## Step 13
If you want to create a fixed, non-linear path for the vehicle, you can combine several `||fwdMotors:set left to 0% and right to 0% for 0 ms||` blocks in sequence. Check out our example in the lightbulb hint below!

```blocks
input.onButtonPressed(Button.AB, function () {
    fwdMotors.drive(30, -43, 2000)
    fwdMotors.drive(30, 30, 800)
    fwdMotors.drive(30, -43, 4000)
    fwdMotors.drive(-30, -30, 1200)
    fwdMotors.drive(30, -43, 1000)
    fwdMotors.drive(30, 30, 800)
    fwdMotors.drive(-30, 20, 2000)
})
```

## Step 14
Beyond programming fixed paths, we can also _automate_ driving with obstacle avoidance. First, let's write a **conditional statement** that uses the sonar sensor to detect if an object is in our vehicle's direct path. 

Drag an `||Logic:if then||` block into a `||Basic:forever||` loop, and put the `||fwdSensors:sonar distance is over||` block inside the hypothesis of the conditional. Use the dropdown to change 'over' to 'under'.

```blocks
basic.forever(function () {
    if (fwdSensors.sonar1.isPastThreshold(0, fwdEnums.OverUnder.Under)) {
    	
    }
})
```

## Step 15
Adjust the value inside the `||fwdSensors:sonar distance is under||` block to change the sensitivity of your vehicle. 

```blocks
basic.forever(function () {
    if (fwdSensors.sonar1.isPastThreshold(0.5, fwdEnums.OverUnder.Under)) {
        
    }
})
```

## Step 16
When an obstacle is detected, make the car stop and turn to the right as we've done before. You may also want to add `||basic:pause||` blocks between stopping and turning to improve the functionality of the program.

```blocks
basic.forever(function () {
    if (fwdSensors.sonar1.isPastThreshold(0.5, fwdEnums.OverUnder.Under)) {
        fwdMotors.leftServo.setSpeed(0)
        fwdMotors.rightServo.setSpeed(0)
        basic.pause(500)
        fwdMotors.drive(30, 30, 800)
        basic.pause(500)
    }
})
```

## Step 17
Let's make sure it continues to drive forward _forever_ as long as there is no obstacle detected! 

Press '+' at the bottom of your conditional. Then, drag a `||fwdMotors:set leftServo to||` and `||fwdMotors:set rightServo to||` block into this new else branch. Set the motor speeds to the values you optimized for forward driving earlier in this tutorial.

~hint Tell me more!

We are _not_ using the `||fwdMotors:set left to 0% and right to 0% for 0 ms||` block here as we do _not_ want to specify the duration. We want the car to drive forward _until it detects an obstacle._

hint~

```blocks
basic.forever(function () {
    if (fwdSensors.sonar1.isPastThreshold(0.5, fwdEnums.OverUnder.Under)) {
        fwdMotors.leftServo.setSpeed(0)
        fwdMotors.rightServo.setSpeed(0)
        basic.pause(500)
        fwdMotors.drive(30, 30, 800)
        basic.pause(500)
    } else {
        // @highlight
        fwdMotors.leftServo.setSpeed(30)
        // @highlight
        fwdMotors.rightServo.setSpeed(-43)
    }
})
```

## Step 18
Now, let's use the buttons to enable or disable this autonomous driving behavior. First, we need a way for our program to "remember" whether autonomous driving should be active. We can do this with a **variable**. Create a variable called `||variables:drivingEnabled||`.

## Step 19
Program the buttons to change the value of our new variable. Drag an `||input:on button A pressed||` block, a `||variables:set drivingEnabled to||` block, and a `||logic:true||` block into the workspace. Combine them so they say 'on button A pressed, set drivingEnabled to true'.

```blocks
input.onButtonPressed(Button.A, function () {
    drivingEnabled = true
})
```

## Step 20
Drag an `||input:on button B pressed||` block, a `||variables:set drivingEnabled to||` block, and a `||logic:false||` block into the workspace. Combine them so they say 'on button B pressed, set drivingEnabled to false'.

```blocks
input.onButtonPressed(Button.B, function () {
    drivingEnabled = false
})
```

## Step 21
Ensure driving is also disabled `||Basic:on start||`.

```blocks
let drivingEnabled = false
// @highlight
drivingEnabled = false
fwdMotors.setupDriving(
fwdMotors.leftServo,
fwdMotors.rightServo
)
```

## Step 22
Finally, let's connect our buttons to our autonomous driving code. Add an `||Logic:if then||` block around the contents of the `||Basic:forever||` loop to check if `||variables:drivingEnabled||` is true.

```blocks
basic.forever(function () {
    // @highlight
    if (drivingEnabled) {
        if (fwdSensors.sonar1.isPastThreshold(0.5, fwdEnums.OverUnder.Under)) {
            fwdMotors.leftServo.setSpeed(0)
            fwdMotors.rightServo.setSpeed(0)
            basic.pause(500)
            fwdMotors.drive(30, 30, 800)
            basic.pause(500)
        } else {
            fwdMotors.leftServo.setSpeed(30)
            fwdMotors.rightServo.setSpeed(-43)
        }
    }
})
```

## Step 23
Add an else condition stop the motors when `||variables:drivingEnabled||` is false.

```blocks
basic.forever(function () {
    // @highlight
    if (drivingEnabled) {
        if (fwdSensors.sonar1.isPastThreshold(0.5, fwdEnums.OverUnder.Under)) {
            fwdMotors.leftServo.setSpeed(0)
            fwdMotors.rightServo.setSpeed(0)
            basic.pause(500)
            fwdMotors.drive(30, 30, 800)
            basic.pause(500)
        } else {
            fwdMotors.leftServo.setSpeed(30)
            fwdMotors.rightServo.setSpeed(-43)
        }
    } else {
        fwdMotors.leftServo.setSpeed(0)
        fwdMotors.rightServo.setSpeed(0)
    }
})
```

## Download
Click the `|Download|` button to download the code to your vehicle and test it out!

## Reflection
Before we wrap up:
- List 2 new things you learned today.
- What is one thing you want to learn more about?

## Finished
Click the `|Done|` button to finish this tutorial.





