namespace fwdMotors {
    /**
     * Set the servo to enabled or disabled.
     * @param servo the servo client to set the status of
     * @param state enabled = true, disabled = false
     */
    //% group="Servo - Continuous"
    //% block="turn $servo $state"
    //% blockId=fwd_servocon_set_enabled
    //% state.shadow="toggleOnOff"
    //% weight=100
    export function conSetEnabled(
        servo: fwdBase.FwdServoClient,
        state: boolean
    ): void {
        return servo.setEnabled(state)
    }

    /**
     * Set the servo speed to between 100% and -100%. Negative speeds are the reverse direction.
     * @param servo the servo client to set the speed of
     * @param speed the speed to set the servo to (%)
     */
    //% group="Servo - Continuous"
    //% block="set $servo to $speed \\%"
    //% blockId=fwd_servocon_set_speed
    //% speed.min=-100 speed.max=100
    //% weight=99
    export function setSpeed(
        servo: fwdBase.FwdServoClient,
        speed: number
    ): void {
        servo.setSpeed(speed)
    }

    /**
     * Returns the speed that the servo is set to (%).
     * @param servo the servo client to get the speed of
     */
    //% group="Servo - Continuous"
    //% block="$servo speed (\\%)"
    //% blockId=fwd_servocon_get_speed
    //% weight=98
    export function getSpeed(servo: fwdBase.FwdServoClient): number {
        return servo.getSpeed()
    }

    /**
     * Returns whether the servo is enabled, enabled = true, disabled = false.
     * @param servo the servo client to get the status of
     */
    //% group="Servo - Continuous"
    //% block="$servo is enabled"
    //% blockId=fwd_servocon_is_enabled
    //% weight=97
    export function conIsEnabled(servo: fwdBase.FwdServoClient): boolean {
        return servo.enabled()
    }
}
