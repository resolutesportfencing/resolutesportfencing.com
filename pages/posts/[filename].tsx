import { Post } from "../../components/post";
import {ExperimentalGetTinaClient, PostsConnection} from "../../.tina/__generated__/types";
import FourOhFour from "../404";
import { useTina } from "tinacms/dist/edit-state";
import { staticRequest } from "tinacms";

// Use the props returned by get static props
export default function BlogPostPage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });
  if (data && data.getPostsDocument) {
    return <Post {...data.getPostsDocument} />;
  }
  // We're likely loading a new document that doesn't yet have data
  // show the 404 which will quickly be replace by client side content
  // from Tina
  return <FourOhFour />;
}

const query = `query getPost($relativePath: String!) {
  getPostDocument(relativePath: $relativePath) {
    data {
      title
      body
    }
  }
}
`;

export const getStaticProps = async ({ params }) => {
  console.log(params)
  const client = ExperimentalGetTinaClient();
  const tinaProps = await client.BlogPostQuery({
    relativePath: `${params.filename}.md`,
  });
  return {
    props: {
      ...tinaProps,
    },
  };
};

/**
 * To build the blog post pages we just iterate through the list of
 * posts and provide their "filename" as part of the URL path
 *
 * So a blog post at "content/posts/hello.md" would
 * be viewable at http://localhost:3000/posts/hello
 */
/**
 * To build the blog post pages we just iterate through the list of
 * posts and provide their "filename" as part of the URL path
 *
 * So a blog post at "content/posts/hello.md" would
 * be viewable at http://localhost:3000/posts/hello
 */
export const getStaticPaths = async () => {
  const client = ExperimentalGetTinaClient();
  const postsListData = await client.getPostsList();
  return {
    paths: postsListData.data.getPostsList.edges.map((post) => ({
      params: { filename: post.node.sys.filename },
    })),
    fallback: false,
  };
};

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;
