import { EntityRepository, Repository } from 'typeorm';
import { AlbumEntity } from '~posts/entities/album.entity';

@EntityRepository(AlbumEntity)
export class AlbumRepository extends Repository<AlbumEntity> {}
