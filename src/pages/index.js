import React from 'react'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Bio from '../components/Bio'
import PostPreview from '../components/PostPreview';
import { rhythm } from '../utils/typography'

export default class BlogIndex extends React.Component {

  render() {
    const title = get(this, 'props.data.site.siteMetadata.title');
    const posts = get(this, 'props.data.allMarkdownRemark.edges');

    return (
      <div>
        <Helmet title={title} />
        <Bio />
        <div id='posts'>
          {posts.map(post => <PostPreview post={post} />)}
        </div>
      </div>
    )
  }
}

BlogIndex.propTypes = {
  route: React.PropTypes.object,
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          frontmatter {
            path
            date(formatString: "DD MMMM, YYYY")
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
