namespace fwdMotors {
    function createDrivingControls() {
        let enabled = false
        let leftMotor: fwdBase.FwdServoClient
        let rightMotor: fwdBase.FwdServoClient
        let leftBias = 1
        let rightBias = 1

        function initMotors(
            left: fwdBase.FwdServoClient,
            right: fwdBase.FwdServoClient,
            bias = 0
        ) {
            leftMotor = left
            rightMotor = right
            if (bias > 0) {
                leftBias = (100 - bias) / 100
            } else {
                rightBias = (100 - bias) / 100
            }
            enabled = true
        }

        function drive(direction: -1 | 1, speed: number): void {
            if (!enabled) return
            leftMotor.setSpeed(direction * speed * leftBias)
            rightMotor.setSpeed(-direction * speed * rightBias) //motors are mounted opposite directions
        }

        function turnInPlace(angle: number): void {
            if (!enabled) return
            // angle is how far to turn. Neg: left, Pos: right.
            const DEG_PER_SEC = 30 // magic number, determined by testing
            const direction = angle > 0 ? 1 : -1
            leftMotor.setSpeed(60 * direction * leftBias)
            rightMotor.setSpeed(60 * direction * rightBias)
            basic.pause((Math.abs(angle) / DEG_PER_SEC) * 1000)
            leftMotor.setSpeed(0)
            rightMotor.setSpeed(0)
        }

        return {
            initMotors: initMotors,
            drive: drive,
            turnInPlace: turnInPlace,
        }
    }

    export const drivingControls = createDrivingControls()

    /**
     * Use this block before using the other driving blocks to set which servo clients get treated as left and right.
     * @param left the servo client to use as the left motor
     * @param right the servo client to use as the right motor
     * @param bias if the motors don't spin at quite the same rate, use the bias to balance them
     */
    //% group="Driving"
    //% block="setup driving|left motor $left|right motor $right||left/right bias $bias"
    //% blockId=fwd_driving_setup
    //% bias.shadow="speedPicker"
    //% bias.defl=0
    //% inlineInputMode=external
    //% weight=100
    export function setupDriving(
        left: fwdBase.FwdServoClient,
        right: fwdBase.FwdServoClient,
        bias = 0
    ) {
        drivingControls.initMotors(left, right, bias)
    }

    /**
     * Drive forwards or backwards at the desired speed (requires setup driving to used first).
     * @param direction forwards or backwards
     * @param speed 0% (stationary) to 100% (max speed)
     */
    //% group="Driving"
    //% block="drive $direction at $speed %"
    //% blockId=fwd_driving_drive
    //% speed.shadow="speedPicker"
    //% weight=99
    export function drive(direction: fwdEnums.ForwardReverse, speed: number) {
        drivingControls.drive(direction, speed)
    }

    /**
     * Stop driving or turning. Sets speed to 0%.
     */
    //% group="Driving"
    //% block="stop motors"
    //% blockId=fwd_driving_stop
    //% weight=98
    export function stop() {
        drivingControls.drive(1, 0)
    }

    /**
     * Turns the vehicle left or right in place by spinning the wheels in opposite directions.
     * @param angle positive angles turn right, negative angles turn left
     */
    //% group="Driving"
    //% block="turn $angle ° in place"
    //% blockId=fwd_driving_turn_in_place
    //% angle.min=-359 angle.max=359
    //% weight=97
    export function turn(angle: number) {
        drivingControls.turnInPlace(angle)
    }
}
