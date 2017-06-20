import { easeOutBounce } from './easing'

export function bounce(sceneState, height, period) {
    const time = sceneState.elapsedTime % period
    return easeOutBounce(time, 0, height, period)
}