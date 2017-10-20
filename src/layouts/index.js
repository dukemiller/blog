import React from 'react'
import Link from 'gatsby-link'
import { Container } from 'react-responsive-grid'

require('prismjs/themes/prism-tomorrow.css');

import { rhythm, scale } from '../utils/typography'

class Template extends React.Component {

  render() {
    const { location, children } = this.props;

    let header;
   
    /*
    let rootPath = `/`;

    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }
    */

    if (["/", "/tags/"].indexOf(this.props.location.pathname) !== -1 ||
    this.props.location.pathname.indexOf("/tags/") !== -1) {
      header = (
        <h1 style={{ ...scale(1.5),  marginBottom: rhythm(1.5), marginTop: 0, }} >
          <Link style={{ boxShadow: 'none', textDecoration: 'none', color: 'inherit', }}
              to={'/'}>
            My blog
          </Link>
        </h1>
      )
    } 
    
    else {
      header = (
        <h3 style={{ fontFamily: 'Montserrat, sans-serif', 
                     marginTop: 0, 
                     marginBottom: rhythm(-1), }} >
          <Link to={'/'}
            style={{ boxShadow: 'none', 
                     textDecoration: 'none', 
                     color: 'inherit', }}>
            My blog
          </Link>
        </h3>
      )
    }

    return (
      <Container style={{ maxWidth: rhythm(26), padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`, }}>
        {header}
        {children()}
      </Container>
    );

  }
}

Template.propTypes = {
  children: React.PropTypes.func,
  location: React.PropTypes.object,
  route: React.PropTypes.object,
}

export default Template
