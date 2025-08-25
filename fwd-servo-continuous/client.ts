namespace fwdMotors {
    //% fixedInstances
    export class FwdServoClient extends modules.ServoClient {
        constructor(role: string) {
            super(role)
        }

        /**
         * Set the servo to enabled or disabled.
         * @param state enabled = true, disabled = false
         */
        //% group="Servo - Continuous"
        //% block="turn $this $state"
        //% blockId=fwd_servort_set_enabled
        //% state.shadow="toggleOnOff"
        //% weight=100
        // can't override this method or it will be called during ServoClient.setAngle()
        setEnabledFwd(state: boolean): void {
            super.setEnabled(state)
            pause(1000) // need to allow time for the servo to actually enable
        }

        /**
         * Set the servo speed to between 100% and -100%. Negative speeds are the reverse direction.
         * @param speed the speed to set the servo to (%)
         */
        //% group="Servo"
        //% block="set $this to $speed \\%"
        //% blockId=fwd_servort_set_speed
        //% speed.min=-100 speed.max=100
        //% weight=99
        setSpeed(speed: number): void {
            this.setAngle(
                Math.map(speed, -100, 100, this.minAngle(), this.maxAngle())
            )
        }

        // used internally
        setAngle(angle: number): void {
            if (!this.enabled()) {
                this.setEnabled(true)
            }
            super.setAngle(angle)
        }
    }

    //% fixedInstance whenUsed
    export const leftServo = new FwdServoClient("leftServo?srvo=0")
    //% fixedInstance whenUsed
    export const rightServo = new FwdServoClient("rightServo?srvo=2")
}
