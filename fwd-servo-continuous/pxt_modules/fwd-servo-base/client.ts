namespace fwdBase {
    //% fixedInstances
    export class FwdServoClient extends modules.ServoClient {
        constructor(role: string) {
            super(role)
        }

        // block created in fwd-servo-positional / fwd-servo-continuous
        isEnabled(): boolean {
            return super.enabled()
        }

        // block created in fwd-servo-positional / fwd-servo-continuous
        setEnabled(state: boolean): void {
            super.setEnabled(state)
            pause(1000) // need to allow time for the servo to actually enable
        }

        // block created in fwd-servo-positional
        getAngle(): number {
            return super.angle()
        }

        // block created in fwd-servo-positional
        setAngle(angle: number): void {
            if (!this.enabled()) {
                this.setEnabled(true)
            }
            super.setAngle(angle)
        }

        // block created in fwd-servo-positional
        setAngleAndWait(angle: number): void {
            super.setAngle(angle)
            pause(1000)
        }

        // block created in fwd-servo-continuous
        getSpeed(): number {
            return Math.map(
                this.angle(),
                this.minAngle(),
                this.maxAngle(),
                -100,
                100
            )
        }

        // block created in fwd-servo-continuous
        setSpeed(speed: number): void {
            this.setAngle(
                Math.map(speed, -100, 100, this.minAngle(), this.maxAngle())
            )
        }
    }

    //% fixedInstance whenUsed
    export const leftServo = new FwdServoClient("leftServo?srvo=0")
    //% fixedInstance whenUsed
    export const middleServo = new FwdServoClient("middleServo?srvo=1")
    //% fixedInstance whenUsed
    export const rightServo = new FwdServoClient("rightServo?srvo=2")
}
