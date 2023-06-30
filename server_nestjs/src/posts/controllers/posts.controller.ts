import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    HttpStatus,
    UseInterceptors,
    UploadedFiles,
    UseGuards
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UploadTypesEnum } from '~core/constants/upload-types.enum';
import { CurrentUser } from '~core/decorators/current-user.decorator';
import { MulterUtils } from '~core/utils/multer-utils';
import { CreatePostDto } from '~posts/dto/create-post.dto';
import { UpdatePostDto } from '~posts/dto/update-post.dto';
import { PostsService } from '~posts/services/posts.service';
import { UserEntity } from '~users/entities/user.entity';
import { JwtAuthGuard } from '~users/guards/jwt-auth.guard';

@Controller('api/user/posts')
@ApiTags('Posts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FilesInterceptor('photos', 10, MulterUtils.getConfig(UploadTypesEnum.IMAGES, '/photos')))
    async create(
        @CurrentUser() user: UserEntity,
        @Body() createPostDto: CreatePostDto,
        @UploadedFiles() files: Express.Multer.File[]
    ) {
        return this.postsService.create(user, createPostDto, files);
    }

    @Get()
    async findAll(@CurrentUser() user: UserEntity) {
        return this.postsService.findAll(user);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        // return this.postsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
        return this.postsService.update(+id, updatePostDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.postsService.remove(+id);
    }
}
