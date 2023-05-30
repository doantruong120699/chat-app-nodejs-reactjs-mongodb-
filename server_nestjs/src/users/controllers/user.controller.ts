import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Put,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { UpdateMyInfoDto } from '../dto/update-my-info.dto';
import { BaseController } from '~core/controllers/base.controller';
import { UserService } from '~users/services/user.service';
import { UserEntity } from '~users/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadAvatarDto } from '~users/dto/upload-avatar.dto';
import { MulterUtils } from '~core/utils/multer-utils';
import { UploadTypesEnum } from '~core/constants/upload-types.enum';
import { CurrentUser } from '~core/decorators/current-user.decorator';

@Controller('api/users')
@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserController extends BaseController {
    constructor(private userService: UserService) {
        super();
    }

    @Get('me')
    async user(@CurrentUser() user: UserEntity) {
        return this.userService.findOne({ where: { id: user.id }, relations: ['profile'] });
    }

    @Put('change-password')
    @HttpCode(HttpStatus.NO_CONTENT)
    async changePassword(@CurrentUser() user: UserEntity, @Body() request: ChangePasswordDto) {
        return this.userService.changePassword(user.id, request.newPassword, request.oldPassword);
    }

    @Put('upload-avatar')
    @HttpCode(HttpStatus.OK)
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('avatar', MulterUtils.getConfig(UploadTypesEnum.IMAGES, '/avatars')))
    async updateAvatar(
        @CurrentUser() user: UserEntity,
        @Body() request: UploadAvatarDto,
        @UploadedFile() avatar: Express.Multer.File
    ) {
        return this.userService.uploadAvatar(user, avatar);
    }

    @Put('update-info')
    @HttpCode(HttpStatus.OK)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async updateMyInfo(@CurrentUser() user: UserEntity, @Body() request: UpdateMyInfoDto) {
        this.userService.updateMyInfo(user, request);
        return {
            message: 'Updated successfully'
        };
    }
}
