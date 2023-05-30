import { EntityRepository, Repository } from 'typeorm';
// import { UserEntity } from '../entities/user.entity';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { ProfileEntity } from '../entities/profile.entity';

@EntityRepository(ProfileEntity)
export class ProfileRepository extends Repository<ProfileEntity> {
    findByEmail(email: string, options?: FindOneOptions<ProfileEntity>) {
        return 1;
    }
}
