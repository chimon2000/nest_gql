import { ResolveProperty, Resolver, Query, Mutation } from '@nestjs/graphql'
import { AuthorService } from './author.service'

@Resolver('Author')
export class AuthorResolver {
    constructor(private readonly authorService: AuthorService) {}
    @Query('authors')
    getAuthors(obj, args, context, info) {
        return this.authorService.getAuthors()
    }
    @Query('author')
    getAuthor(obj, args, context, info) {
        return this.authorService.getAuthorById(args.id)
    }

    @Mutation()
    upvotePost(obj, args, context, info) {
        return this.authorService.upvotePost(args.postId)
    }

    @ResolveProperty('posts')
    getPosts({ id: authorId }) {
        return this.authorService.getPostsByAuthorId(authorId)
    }
}
