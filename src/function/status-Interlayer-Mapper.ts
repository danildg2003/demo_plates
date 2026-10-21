import { Interlayer, InterlayersStatuses } from '../model/interlayer';
import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export const statusInterlayerMapper = (interlayer: Interlayer<any>) => {
  switch (interlayer.extensions[0].code) {
    case InterlayersStatuses.NOT_FOUND: {
      throw new NotFoundException(interlayer.extensions[0].message);
    }
    case InterlayersStatuses.FORBIDDEN: {
      throw new ForbiddenException(interlayer.extensions[0].message);
    }
    case InterlayersStatuses.BAD_REQUEST: {
      throw new BadRequestException(interlayer.extensions[0].message);
    }
    case InterlayersStatuses.UNAUTHORIZED: {
      throw new UnauthorizedException(interlayer.extensions[0].message);
    }
    default: {
      throw new HttpException('Unknown error', 520);
    }
  }
};
