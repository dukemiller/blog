import React from 'react'

import 'typeface-montserrat'
import 'typeface-merriweather'

import profilePic from './profile-pic.jpg'
import { rhythm } from '../utils/typography'

export default class Bio extends React.Component {
  render() {
    return (
      <p style={{ marginBottom: rhythm(2.5), }} >
        <img
          src={profilePic}
          alt={`Duke Miller`}
          style={{
            float: 'left',
            marginRight: rhythm(1 / 4),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
          }}
        />
        Written by <strong>Duke Miller</strong>. More will go here eventually.
      </p>
    )
  }
}
