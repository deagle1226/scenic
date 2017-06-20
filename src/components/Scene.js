import React, { Component } from 'react'
import takeRight from 'lodash/takeRight'
import mean from 'lodash/mean'

class Scene extends Component {
    constructor(props) {
        super(props)
        this.state = {
            start: null,
            elapsedTime: 0,
            frameTime: null
        }
        this.frameTimes = []
        this.frame = 0
        this.update = this.update.bind(this)
    }
    
    componentDidMount() {
        if (this.props.play) window.requestAnimationFrame(this.update)    
    }
    
    update(timestamp) {
        const start = this.state.start || timestamp
        const elapsedTime = timestamp - start
        const frameTime = elapsedTime - this.state.elapsedTime
        this.frameTimes.push(frameTime)
        this.frameTimes = takeRight(this.frameTimes, 60)
        if (this.props.debug && frameTime > 17) console.warn('FrameDrop at frame #', this.frame)
        this.setState({
            start,
            elapsedTime,
            frameTime
        }, () => {
            this.frame++
            if (this.props.play) window.requestAnimationFrame(this.update)
        })
    }
    
    render() {
        const { debug, children } = this.props
        return debug ? (
            <div>
              <pre>
                <code>{JSON.stringify(this.state)}</code><br />
                <code>fps: {(1000 / mean(this.frameTimes)).toFixed(1)}</code>
              </pre>
              <svg>
                {children(this.state)}
              </svg>
            </div>
        ) : (
          <svg>
            {children(this.state)}
          </svg>
        )
    }
}

Scene.defaultProps = {
    play: true
}

export default Scene