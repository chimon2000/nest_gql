const authors = [
    { id: 1, firstName: 'Tom', lastName: 'Coleman' },
    { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
    { id: 3, firstName: 'Mikhail', lastName: 'Novikov' }
]

const posts = [
    { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
    { id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3 },
    { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
    { id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7 }
]

export class AuthorService {
    getAuthors() {
        return authors
    }

    getAuthorById(id) {
        return authors.find(author => author.id === id)
    }

    getPostsByAuthorId(authorId) {
        return posts.filter(post => post.authorId === authorId)
    }

    upvotePost(postId) {
        const post = posts.find(post => post.id === postId)
        const postIndex = posts.findIndex(post => post.id === postId)

        if (post) {
            const updatedPost = { ...post, votes: post.votes + 1 }
            posts[postIndex] = updatedPost
            return updatedPost
        }
    }
}
