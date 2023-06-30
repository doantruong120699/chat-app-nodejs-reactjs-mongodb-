import { Controller, Post, Body, Param, HttpCode, HttpStatus, UseGuards, Delete, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '~core/decorators/current-user.decorator';
import { CommentDto } from '~posts/dto/comment.dto';
import { CommentService } from '~posts/services/comment.service';
import { UserEntity } from '~users/entities/user.entity';
import { JwtAuthGuard } from '~users/guards/jwt-auth.guard';

@Controller('api/user/comment')
@ApiTags('Posts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Post(':postId')
    @HttpCode(HttpStatus.OK)
    async create(@CurrentUser() user: UserEntity, @Param('postId') postId: string, @Body() data: CommentDto) {
        return this.commentService.create(postId, data, user);
    }

    @Get(':postId')
    @HttpCode(HttpStatus.OK)
    async getCommentByPost(@CurrentUser() user: UserEntity, @Param('postId') postId: string) {
        return this.commentService.getCommentByPost(postId, user);
    }

    // @Get()
    // async findAll(@CurrentUser() user: UserEntity) {
    //     return this.postsService.findAll(user);
    // }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     // return this.postsService.findOne(+id);
    // }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    //     return this.postsService.update(+id, updatePostDto);
    // }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.commentService.remove(+id);
    }
}
