import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ExceptionHandlingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        const req = context.switchToHttp().getRequest();
        const isHttpException = error instanceof HttpException;

        if (isHttpException) {          
          return throwError(() => error);
        } else {          
          console.error('Unexpected error:', error);

          const enhancedError = {
            statusCode: 500,
            timestamp: new Date().toISOString(),
            path: req.url,
            method: req.method,
            message: error?.message || 'Unexpected error occurred',
            errorName: error?.name || 'InternalServerError',
            stack: process.env.NODE_ENV !== 'production' ? error?.stack : undefined,
          };

          return throwError(
            () => new InternalServerErrorException(enhancedError)
          );
        }
      }),
    );
  }
}
