import { createParamDecorator, ExecutionContext, BadRequestException } from '@nestjs/common';

export const QueryRequired = createParamDecorator((key: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const value = request.query[key];

    if (value === undefined) {
        throw new BadRequestException(`Пропущен обязательный параметр: '${key}'`);
    }

    return value;
});
