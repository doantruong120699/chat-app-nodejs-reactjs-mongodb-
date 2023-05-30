import { env } from '~config/env.config';
import { ValueTransformer } from 'typeorm';

export class ImageTransformer implements ValueTransformer {
    to(value) {
        return value;
    }

    from(value) {
        if (value) {
            if (value.startsWith('http')) {
                return value;
            }
            return env.BACKEND_URL + '/' + value;
        }
        return env.BACKEND_URL + '/assets/images/default-placeholder.jpg';
    }
}
