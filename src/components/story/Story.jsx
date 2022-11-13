import React from 'react'
import Content from './content/Content'
import Pics from './pics/Pics'
import "./Story.scss"

const Story = () => {
  return (
    <div className='story'>
        <Pics />
        <Content />
    </div>
  )
}

export default Story