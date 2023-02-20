import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import AppError from '../errors/app.error';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error: Error) => {
        const { message } = error;

        if (error instanceof AppError) {
          const { status } = error;

          throw new HttpException(message, status);
        } else {
          throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }),
    );
  }
}
