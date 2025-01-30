import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformNumbersInterceptor implements NestInterceptor {
    constructor(private readonly fields: string[]) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();

        if (request.body) {
            this.fields.forEach((field) => {
                if (
                    typeof request.body[field] === 'string' &&
                    !isNaN(Number(request.body[field]))
                ) {
                    request.body[field] = Number(request.body[field]);
                }
            });
        }

        return next.handle().pipe(
            map((data) => {
                return data;
            }),
        );
    }
}
