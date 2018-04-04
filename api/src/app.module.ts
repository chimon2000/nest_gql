import { Module, MiddlewaresConsumer, NestModule, RequestMethod } from '@nestjs/common'
import { graphqlExpress } from 'apollo-server-express'
import { GraphQLModule, GraphQLFactory } from '@nestjs/graphql'
import { AuthorsModule } from './authors/authors.module'
import { typeDefs } from '../src/authors/author.schema'
import { mergeSchemas } from 'graphql-tools'

@Module({
    imports: [GraphQLModule, AuthorsModule]
})
export class ApplicationModule implements NestModule {
    constructor(private readonly graphQLFactory: GraphQLFactory) {}

    configure(consumer: MiddlewaresConsumer) {
        const localSchema = this.graphQLFactory.createSchema({ typeDefs })
        const delegates = this.graphQLFactory.createDelegates()

        const schema = mergeSchemas({
            schemas: [localSchema],
            resolvers: delegates
        })

        consumer
            .apply(graphqlExpress(req => ({ schema, rootValue: req })))
            .forRoutes({ path: '/graphql', method: RequestMethod.ALL })
    }
}
