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

        return {
            initMotors: initMotors
        }
    }

    export const drivingControls = createDrivingControls()

    /**
     * Use this block before using the other driving blocks to set which servo clients get treated as left and right.
     * @param left the servo client to use as the left motor
     * @param right the servo client to use as the right motor
     */
    //% group="Driving"
    //% block="setup driving|left motor $left|right motor $right"
    //% blockId=fwd_driving_setup
    //% bias.shadow="speedPicker"
    //% inlineInputMode=external
    //% weight=100
    export function setupDriving(
        left: fwdMotors.FwdServoClient,
        right: fwdMotors.FwdServoClient
    ) {
        drivingControls.initMotors(left, right)
    }
}
