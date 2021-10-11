import * as React from 'react';
import { Container } from 'react-bootstrap';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { graphql } from 'gatsby';

const BlogPost = (props) => {
  return (
    <Container className={'blogpost'}>
      <MDXRenderer>
        {props.data.mdx.body}
      </MDXRenderer>
    </Container>
  );
};

export default BlogPost;

export const pageQuery = graphql`
  query MDXQuery($id: String!) {
    mdx(id: { eq: $id }) {
      id
      body
    }
  }
`
