namespace fwdMotors {
    function createDrivingControls() {
        let enabled = false
        let leftMotor: fwdMotors.FwdServoClient
        let rightMotor: fwdMotors.FwdServoClient
        let leftBias = 1
        let rightBias = 1

        function initMotors(
            left: fwdMotors.FwdServoClient,
            right: fwdMotors.FwdServoClient
        ) {
            leftMotor = left
            rightMotor = right
            leftMotor.setEnabledFwd(true)
            rightMotor.setEnabledFwd(true)
        }

        function stop() {
            leftMotor.setSpeed(0)
            rightMotor.setSpeed(0)
        }

        function drive(leftSpeed: number, rightSpeed: number) {
            leftMotor.setSpeed(leftSpeed)
            rightMotor.setSpeed(rightSpeed)
        }

        return {
            initMotors: initMotors,
            stop: stop,
            drive: drive
        }
    }

    export const drivingControls = createDrivingControls()

    /**
     * Use this block in "on start" to ensure the servos are enabled and the driving controls are initialized.
     * @param left the servo client to use as the left motor
     * @param right the servo client to use as the right motor
     */
    //% group="Driving"
    //% block="setup driving|left motor is $left|right motor is $right"
    //% blockId=fwd_driving_setup
    //% inlineInputMode=external
    //% weight=100
    export function setupDriving(
        left: fwdMotors.FwdServoClient,
        right: fwdMotors.FwdServoClient
    ) {
        drivingControls.initMotors(left, right)
    }

    /**
    * Sets the left and right motors to the provided speeds.
    * Pauses execution for the provided duration and then sets the motors to be stationary.
    * To go forward set left to positive and right to negative.
    * To reverse set left to negative and right to positive.
    * To spin right set left to positive and right to positive.
    * To spin left set left to negative and right to negative.
    * @param leftSpeed the speed to set the left motor to
    * @param rightSpeed the speed to set the right motor to
    * @param duration how long to run the motors at these speeds
    */
    //% group="Driving"
    //% block="set left to $leftSpeed \\% and right to $rightSpeed \\% for $duration ms"
    //% blockId=fwd_driving_drive
    //% leftSpeed.min=-100 leftSpeed.max=100 rightSpeed.min=-100 rightSpeed.max=100 duration.min=0
    //% weight=99
    export function drive(leftSpeed: number, rightSpeed: number, duration: number) {
        drivingControls.drive(leftSpeed, rightSpeed)
        pause(duration)
        drivingControls.stop()
    }

    // /**
    //  * Sets the left and right motors to be stationary.
    //  * @param duration
    //  */
    // //% group="Driving"
    // //% block="stop driving"
    // //% blockId=fwd_driving_stop
    // //% weight=98
    // export function stop() {
    //     drivingControls.stop()
    // }

    
}
