import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'

import { rhythm } from '../utils/typography'

export default class PostPreview extends React.Component {

    render() {
        const { post } = this.props;

        if (post.node.path === '/404/')
          return <div />

        const title = get(post, 'node.frontmatter.title') || post.node.path
        return (
          <div key={post.node.frontmatter.path}>
            <h3 style={{ marginBottom: rhythm(1 / 4), }}>
              <Link style={{ boxShadow: 'none' }}
                    to={post.node.frontmatter.path} >
                {post.node.frontmatter.title}
              </Link>
            </h3>
            <small>{post.node.frontmatter.date}</small>
            <p dangerouslySetInnerHTML={{ __html: post.node.excerpt }} />
          </div>
        );
    }
}
