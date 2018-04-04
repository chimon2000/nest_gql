import { makeExecutableSchema } from 'graphql-tools'

export const typeDefs = `
    type Author {
        id: Int!
        firstName: String
        lastName: String
        posts: [Post]
    }

    type Post {
        id: Int!
        title: String
        votes: Int
    }

    type Query {
        author(id: Int!): Author
        authors: [Author]
    }

    type Mutation {
        upvotePost(postId: Int!): Post
    }
`

export default makeExecutableSchema({ typeDefs })