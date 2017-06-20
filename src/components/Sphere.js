import React from 'react'

function sphereProps(props) {
    return {
        cx: props.x,
        cy: props.y,
        r: depth(props.z, props.radius),
        style: {
            fill: props.color,
            zIndex: -Math.round(props.z)
        }
    }
}

function shadowProps(props) {
    const { x, y, z } = props
    const angle = props.light.angle(x, y, z) + (0.5 * Math.PI)
    const radius = depth(z, props.radius)
    const startX = radius * Math.cos(angle) + x
    const startY = radius * Math.sin(angle) + y
    const start = `${startX} ${startY}`
    const endX = radius * Math.cos(angle + Math.PI) + x
    const endY = radius * Math.sin(angle + Math.PI) + y
    const end = `${endX} ${endY}`
    const innerRadii = `${radius * 1.2} ${radius * 1.2}`
    const outerRadii = `${radius} ${radius}`
    return {
        d: `M${start}A${innerRadii} 0 0 0 ${end} ${outerRadii} 0 1 1 ${start}z`,
        fill: props.light.shade(x, y, z)
    }
}

function sheenProps(props) {
    const { x, y, z } = props
    const angle = props.light.angle(x, y, z) - (0.5 * Math.PI)
    const radius = depth(z, props.radius)
    const startX = radius * Math.cos(angle) + x
    const startY = radius * Math.sin(angle) + y
    const start = `${startX} ${startY}`
    const endX = radius * Math.cos(angle + Math.PI) + x
    const endY = radius * Math.sin(angle + Math.PI) + y
    const end = `${endX} ${endY}`
    const innerRadii = `${radius * 1.01} ${radius * 1.01}`
    const outerRadii = `${radius} ${radius}`
    return {
        d: `M${start}A${innerRadii} 0 0 0 ${end} ${outerRadii} 0 1 1 ${start}z`,
        fill: props.light.shine(x, y, z)
    }
}

function depth(z, radius) {
    if (z === 0) return radius
    if (z < 0) return radius * (1 + Math.max(0, Math.log10(Math.abs(z))))
    return Math.max(0, radius / (1 + Math.max(0, Math.log10(z))))
}

function Sphere(props) {
    return (
        <g>
            <circle {...sphereProps(props)} />
            <path {...shadowProps(props)} />
            <path {...sheenProps(props)} />
        </g>
    )
}

export default Sphere
