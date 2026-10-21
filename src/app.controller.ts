import { PlatesAccess } from './guard/access-token-plates';
import { AppService } from './app.service';
import { QueryPlatesInputDTO } from './dto/input/query-create-plates';
import { PlatesBaseDTO } from './dto/output/plate-base.dto';
import { CreateNewPlatesDTO } from './dto/input/query-create-new-plates-info';
import { DeletePlatesDTO } from './dto/input/delete-plates';
import {
  Controller,
  Get,
  Query,
  UseGuards,
  Logger,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
  Delete,
} from '@nestjs/common';
import { statusInterlayerMapper } from './function/status-Interlayer-Mapper';
import { CreatePlatesResultSwagger } from './swagger/createPlatesResult';
import { PutNewDataSwagger } from './swagger/putDataPlates';
import { DeletePlatesSwagger } from './swagger/deleteCurrentPlates';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

  /**
   * Получить список номерных знаков
   */
  @Get('create/plates')
  @UseGuards(PlatesAccess)
  @CreatePlatesResultSwagger()
  async getPlates(
    @Query() PlatesCreateInputDTO: QueryPlatesInputDTO,
  ): Promise<PlatesBaseDTO> {
    const platesInter = await this.appService.getPlates(
      PlatesCreateInputDTO.PageInfo,
      PlatesCreateInputDTO.PlatesQuantity,
    );
    if (platesInter.hasError()) {
      this.logger.error(platesInter.extensions[0].message);
      return statusInterlayerMapper(platesInter);
    }
    if (!platesInter.data) {
      this.logger.error('Error');
      return {
        pages: 0,
        pageNum: 0,
        total: 0,
        items: [],
      };
    }
    return {
      pages: platesInter.data.pages,
      pageNum: platesInter.data.pageNum,
      total: platesInter.data.total,
      items: platesInter.data.items,
    };
  }

  /**
   * Внести новую информацию о номерных знаках и автомобиле
   */

  @PutNewDataSwagger()
  @UseGuards(PlatesAccess)
  @Post('post/plates')
  @HttpCode(HttpStatus.CREATED)
  async acceptNewPlates(@Body() createNewInfoPlates: CreateNewPlatesDTO) {
    try {
      const createNewPlates =
        await this.appService.acceptNewPlates(createNewInfoPlates);
      return { success: true, data: createNewPlates };
    } catch (error) {
      throw new HttpException(
        { success: false, message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Удалить необходимую информацию о номерах
   */

  @DeletePlatesSwagger()
  @UseGuards(PlatesAccess)
  @Delete('delete/plates')
  @HttpCode(HttpStatus.OK)
  async deletePlate(@Query() deletePlatesDto: DeletePlatesDTO) {
    return this.appService.deletePlate(deletePlatesDto);
  }
}
