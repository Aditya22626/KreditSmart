import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import type { Request, Response } from 'express';
import { map, Observable } from 'rxjs';
import { isVersionedApi, requestId } from './http-context';

@Injectable()
export class ApiResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const http = context.switchToHttp();
    const req = http.getRequest<Request>();
    const res = http.getResponse<Response>();
    if (!isVersionedApi(req)) return next.handle();
    return next.handle().pipe(map((data: unknown) => ({
      success: true, data: data ?? null, requestId: requestId(res),
    })));
  }
}
