import crypto from 'crypto';
import { isString } from 'lodash';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { isUUID } from '@nestjs/common/utils/is-uuid';

export function makeAToken() {
    return crypto.createHash('md5').update(randomStringGenerator()).digest('hex');
}
