import React from 'react'
import { storiesOf, action, linkTo } from '@kadira/storybook'
import { withKnobs, color, number, boolean } from '@kadira/storybook-addon-knobs'
import { Motion, spring } from 'react-motion'
import backgrounds from "react-storybook-addon-backgrounds"
import Scene from '../components/Scene'
import Sphere from '../components/Sphere'
import Light from '../components/Light'
import { bounce } from '../utils/update'

function linear(sceneState, delta, period) {
  const time = sceneState.elapsedTime % period
  return (time / period) * delta
}

storiesOf('Examples', module)
  .addDecorator(withKnobs)
  .addDecorator(backgrounds([
    { name: "dark", value: "#eee", default: true },
    { name: "light", value: "#ffffff" },
    
  ]))
  .add('Bouncing Ball', () => {
    return (
      <div>
        <h1>Bouncing Ball</h1>
        <Scene debug={boolean('Debug info', false)}>
          {sceneState => (
            <g>
              <Light brightness={10} x={0} y={0} z={1} color="#00ff00">
                {lightState => (
                  <Sphere {...{
                    x: 50,
                    y: bounce(sceneState, 50, 2000) + 50,
                    z: linear(sceneState, 30, 2000) + 1,
                    radius: number('Radius', 50, {
                       range: true,
                       min: 1,
                       max: 100,
                       step: 1,
                    }),
                    color: color('Color', '#4A90E2'),
                    light: lightState
                  }} />
                )}
              </Light>
              <Light brightness={10} x={200} y={50} z={1} color="#ffffff">
                {lightState => (
                  <Sphere {...{
                    x: 150,
                    y: bounce(sceneState, 50, 2000) + 50,
                    z: linear(sceneState, 30, 2000) + 5,
                    radius: 50,
                    color: '#4A90E2',
                    light: lightState
                  }} />
                )}
              </Light>
            </g>
          )}
        </Scene>
      </div>
    )
  })