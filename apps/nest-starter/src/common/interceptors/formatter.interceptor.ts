// format-response.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class FormatResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // check if the response contains an error
        const error = this.hasError(context);

        // extract error messages
        const message = this.extractErrorMessages(error);

        // modify the response format here
        return { data, message, error };
      }),
    );
  }

  private hasError(context: ExecutionContext): boolean {
    const response = context.switchToHttp().getResponse();
    return response.statusCode >= 400;
  }

  private extractErrorMessages(error: boolean): string[] {
    if (!error) {
      return ['The request was successful. No error occurred.'];
    }

    return ['An error occurred.'];
  }
}
