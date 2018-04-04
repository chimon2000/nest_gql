import { AuthorResolver } from './author.resolver'
import { Module } from '@nestjs/common'
import { AuthorService } from './author.service'
import { AuthorsController } from './author.controller'

@Module({
    controllers: [AuthorsController],
    components: [AuthorResolver, AuthorService]
})
export class AuthorsModule {}
