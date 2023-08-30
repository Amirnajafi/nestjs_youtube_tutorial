import { ApiProperty } from '@nestjs/swagger';

export class ProductForBiddenRespnonse {
  @ApiProperty({
    type: String,
    description: 'Http error code ',
    example: 403,
  })
  statusCode: number;
  @ApiProperty({
    type: String,
    description: 'Description about the error',
    example: 'You don"t have permission to access this resource',
  })
  message: string;
}
