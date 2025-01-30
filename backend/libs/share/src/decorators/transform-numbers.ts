import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { TransformNumbersInterceptor } from '../interceptors';

export function TransformNumbers(...fields: string[]) {
    return applyDecorators(UseInterceptors(new TransformNumbersInterceptor(fields)));
}
