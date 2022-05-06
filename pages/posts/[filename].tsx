import { Post } from "../../components/post";
import {ExperimentalGetTinaClient} from "../../.tina/__generated__/types";
import FourOhFour from "../404";
import { useTina } from "tinacms/dist/edit-state";

// Use the props returned by get static props
export default function BlogPostPage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });
  if (data && data.posts) {
    return <Post {...data.posts} />;
  }
  // We're likely loading a new document that doesn't yet have data
  // show the 404 which will quickly be replace by client side content
  // from Tina
  return <FourOhFour />;
}

export const getStaticProps = async ({ params }) => {
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
  const postsListData = await client.postsConnection();
  return {
    paths: postsListData.data.postsConnection.edges.map((post) => ({
      params: { filename: post.node._sys.filename },
    })),
    fallback: false,
  };
};

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;
