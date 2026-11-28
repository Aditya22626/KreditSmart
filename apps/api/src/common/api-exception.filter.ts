import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import type { Request, Response } from 'express';
import { STATUS_CODES } from 'node:http';
import { requestId } from './http-context';

export class InputValidationException extends HttpException {
  constructor(public readonly fields: string[]) {
    super('Invalid request input', 400);
  }
}

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ApiExceptionFilter.name);
  catch(error: unknown, host: ArgumentsHost): void {
    const http = host.switchToHttp();
    const req = http.getRequest<Request>();
    const res = http.getResponse<Response>();
    const status = error instanceof HttpException ? error.getStatus() : 500;
    const id = requestId(res);
    if (status >= 500) {
      // Do not log raw error messages, SQL, stack traces or user data here.
      this.logger.error({ requestId: id, status, event: 'request_failed' });
    }
    if (res.headersSent) return;
    if (req.path === '/health/ready' && status === 503) {
      res.status(503).json({ service: 'kreditsmart-api', status: 'unavailable', database: 'down' });
      return;
    }
    const code = error instanceof InputValidationException ? 'VALIDATION_ERROR' : `HTTP_${status}`;
    res.status(status).json({ success: false, error: {
      code, message: status >= 500 ? 'Service unavailable or internal error' :
        error instanceof InputValidationException ? 'Invalid request input' : (STATUS_CODES[status] ?? 'Request failed'),
      ...(error instanceof InputValidationException ? { fields: error.fields } : {}),
    }, requestId: id });
  }
}
