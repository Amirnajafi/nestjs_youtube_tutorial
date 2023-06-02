import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  use(req: Request, res: Response, next: (error?: any) => void) {
    const { ip, method, baseUrl } = req;
    const userAgent = req.get('user-agent') || '';
    const startAt = process.hrtime();
    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');
      const dif = process.hrtime(startAt);
      const responseTime = dif[0] * 1e3 + dif[1] * 1e-6;
      this.logger.log(
        `${method} ${baseUrl} ${statusCode} ${contentLength} - ${responseTime.toFixed(
          2,
        )}ms ${userAgent} ${ip}`,
      );
    });

    next();
  }
}
