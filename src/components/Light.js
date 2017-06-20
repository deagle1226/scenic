import React from 'react'
import * as vector from '../utils/vector'
import { shadeHex, hexToRgb } from '../utils/color'

function Light({x, y, z, brightness, color, children }) {
    const shadowColor = shadeHex(color, -0.5)
    const shineColor = shadeHex(color, 0.1)
    function angle(dx, dy, dz) {
        return Math.atan2(dy - y, dx - x)
    }
    
    function distance(dx, dy, dz) {
        return vector.distance({x, y, z}, {x: dx, y: dy, z: dz})
    }
    
    function alpha(dx, dy, dz) {
        return brightness / distance(dx, dy, dz) * 3
    }
    
    function shade(dx, dy, dz) {
        const rgb = hexToRgb(shadowColor)
        return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha(dx, dy, dz)})`
    }
    
    function shine(dx, dy, dz) {
        const rgb = hexToRgb(shineColor)
        return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha(dx, dy, dz)})`
    }
    
    return (
        <g>
            {children({ angle, distance, shade, shine })}
            <circle cx={x} cy={y} r={brightness} style={{ fill: color }} />
        </g>
    )
}

Light.defaultProps = {
    color: '#ffffff'
}

export default Light
