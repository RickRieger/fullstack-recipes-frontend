import React, { Component } from 'react'

export class Text extends Component {
  render() {
    return (
      <div
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.1),rgba(0, 0, 0, 0.5)), url(banner.png)",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow:'hidden',
        backgroundAttachment: 'fixed',
        width:'100vw',
        height:'100vh'
        
        // overflowY: 'scroll'
      }}>
        
      </div>
    )
  }
}

export default Text
