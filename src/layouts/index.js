import React from 'react'
import Link from 'gatsby-link'
import { Container } from 'react-responsive-grid'
import { rhythm, scale } from '../utils/typography'

import '../css/style.css';
import 'prismjs/themes/prism-tomorrow.css';

export default class Template extends React.Component {

  getHeader(location) {
    let header;
    
    const bigHeader = 
      ["/", "/tags/"].indexOf(location.pathname) !== -1 ||
                location.pathname.indexOf("/tags/") !== -1;

    if (bigHeader) {
      return (
        <h1 style={{ ...scale(1.5),  marginBottom: rhythm(1.5), marginTop: 0, }} >
          <Link style={{ boxShadow: 'none', textDecoration: 'none', color: 'inherit', }}
              to={'/'}>
            My blog
          </Link>
        </h1>
      )
    }
    
    // default

    return (
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
    );

  }

  render() {
    const { location, children } = this.props;

    return (
      <Container style={{ maxWidth: rhythm(26), padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`, }}>
        {this.getHeader(location)}
        {children()}
      </Container>
    );
  }
}

Template.propTypes = {
  children: React.PropTypes.func,
  location: React.PropTypes.object,
  route: React.PropTypes.object,
};
