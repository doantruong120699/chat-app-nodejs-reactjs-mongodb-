import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '~core/decorators/current-user.decorator';
import { ReactionDto } from '~posts/dto/reaction.dto';
import { UpdatePostDto } from '~posts/dto/update-post.dto';
import { PostsService } from '~posts/services/posts.service';
import { ReactionService } from '~posts/services/reaction.service';
import { UserEntity } from '~users/entities/user.entity';
import { JwtAuthGuard } from '~users/guards/jwt-auth.guard';

@Controller('api/user/reaction')
@ApiTags('Posts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ReactionController {
    constructor(private readonly reactionService: ReactionService, private readonly postService: PostsService) {}

    @Post(':postId')
    @HttpCode(HttpStatus.OK)
    async create(@CurrentUser() user: UserEntity, @Param('postId') postId: string, @Body() data: ReactionDto) {
        return this.reactionService.create(postId, data, user);
    }

    @Get()
    async findAll(@CurrentUser() user: UserEntity) {
        return this.reactionService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        // return this.reactionService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
        return this.reactionService.update(+id, updatePostDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.reactionService.remove(+id);
    }
}
