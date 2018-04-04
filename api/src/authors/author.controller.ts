import { Get, Controller } from '@nestjs/common'
import { AuthorService } from './author.service'

@Controller('api/authors')
export class AuthorsController {
    constructor(private readonly authorService: AuthorService) {}
    @Get()
    getAuthors() {
        return this.authorService.getAuthors()
    }
}
