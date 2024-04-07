import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    // Log request details
    // this.logRequestDetails(req);

    // Log to file
    this.logToFile(req);
    next();
  }
  // private logRequestDetails(req: Request) {
  //   this.logger.log(`Request -${req}`);
  // }

  private logToFile(req: Request) {
    const logData = {
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
      body: req.body,
      params: req.params,
      query: req.query,
    };
    fs.appendFile('request_logs.txt', JSON.stringify(logData) + '\n', (err) => {
      if (err) {
        this.logger.error(`Error writing to log file: ${err}`);
      }
    });
  }
}
