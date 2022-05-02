import {staticRequest} from "tinacms";
import { Container } from "../../../components/container";
import { Section } from "../../../components/section";
import { Posts } from "../../../components/posts";
import type { PostsConnection } from "../../../.tina/__generated__/types";
import {Db, readDb, writeDb} from '../../../lib/utils'

export default function PostListing(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  const posts = props.getPostsList.edges;

  return (
    <Section className="flex-1">
      <Container size="large">
        <Posts
          data={posts}
          nextPage={props.nextPage}
          prevPage={props.prevPage}
        />
      </Container>
    </Section>
  );
}

export const getStaticProps = async ({ params }) => {
  const db = await readDb()

  const pageNum = Number(params.page)
  if (db.pages.length < pageNum) {
    throw new Error(`Unable to render page ${params.page} - not enough cached pages`)
  }

  const page = db.pages[pageNum - 1]

  const first = page.limit
  const variables = { first, sort: page.sort, after: page.cursor }

  const tinaProps = (await staticRequest({
    query: `#graphql
        query GetPostsList(
              $first: Float,
              $after: String, 
              $last: Float, 
              $before: String, 
              $sort: String) {
            getPostsList(
              first: $first,
              after: $after,
              last: $last,
              before: $before,
              sort: $sort) {
                edges {
                  node {
                  id
                  values
                  data {
                    author {
                      ... on AuthorsDocument {
                        data {
                          name
                          avatar
                        }
                      }
                    }
                  }
                  sys {
                    filename
                  }
                  }
                }
            }
          }
    `,
    variables,
  })) as { getPostsList: PostsConnection };

  return {
    props: {
      ...tinaProps,
      prevPage: pageNum > 1 ? String(pageNum - 1) : '',
      nextPage: pageNum < db.pages.length ? String(pageNum + 1) : ''
    },
  };
};

export const getStaticPaths = async () => {
  const db: Db = {
    pages: []
  }

  const paths = []
  const first = 5
  let cursor: string | undefined
  let page = 1
  while (true) {
    const variables = { first, sort: 'date' }
    if (cursor) {
      variables['after'] = cursor
    }
    const postsResponse = await staticRequest({
      query: `#graphql
        query GetPostsList(
              $first: Float,
              $after: String, 
              $last: Float, 
              $before: String, 
              $sort: String) {
            getPostsList(
              first: $first,
              after: $after,
              last: $last,
              before: $before,
              sort: $sort) {
                pageInfo {
                  hasNextPage
                  startCursor
                  endCursor
                }
            }
          }
      `,
      variables,
    }) as { getPostsList: PostsConnection }

    const { pageInfo } = postsResponse.getPostsList

    paths.push({
      params: {
        page: `${page}`
      }
    })

    db.pages.push({
      cursor,
      limit: variables.first,
      sort: variables.sort
    })

    page += 1

    if (!pageInfo.hasNextPage) {
      break
    }
    cursor = pageInfo.endCursor
  }

  await writeDb(db)

  return {
    paths,
    fallback: false,
  };
};

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;