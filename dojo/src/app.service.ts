import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'ANA JÚLIA, PARE, POR FAVOR, VOCÊ NÃO É O ZECA PAGODINHO!';
  }
}
