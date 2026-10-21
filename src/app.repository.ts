import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { NewPlatesBaseDTO } from './dto/output/new-plate-base.dto';
import { PlatesBaseDTO } from './dto/output/plate-base.dto';
import { Plates } from './plates/plates.entity';
import { itemsMapper } from './function/items-mapper';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class AppRepository {
  private readonly logger = new Logger(AppRepository.name);
  constructor(
    @InjectDataSource() private readonly dataSourcePlates: DataSource,
  ) {}

  // Получаем информацию о номерах с учетом пагинации и фильтрации
  async getPlates(
    PagePlates: number,
    NumPlates: number,
  ): Promise<PlatesBaseDTO> {
    this.logger.log('Plates started');
    const PlatesRepository = this.dataSourcePlates.getRepository(Plates);
    try {
      const skip = Math.floor(NumPlates * (PagePlates - 1));
      const plates = await PlatesRepository.find({
        select: {
          nameCar: true,
          WordPlates: true,
          NumPlates: true,
        },
        skip: skip,
        take: NumPlates,
      });
      const itemMapped =
        plates.length > 0 ? plates.map((platees) => itemsMapper(platees)) : [];
      const ResultAsyncNewPlates = await this.getNewPlates(
        PagePlates,
        NumPlates,
      );
      // если в массиве чет есть, то маплю
      return {
        pageNum: ResultAsyncNewPlates.pageNum,
        pages: ResultAsyncNewPlates.pages,
        total: ResultAsyncNewPlates.total,
        items: itemMapped,
      };
    } catch (e) {
      this.logger.error('getPlates in error');
      this.logger.debug(e);
      throw new Error('Ошибка при получении данных о номерах');
    }
  }

  // Работа с pages/total/perPage
  async getNewPlates(
    PagePlates: number,
    NumPlates: number,
  ): Promise<NewPlatesBaseDTO> {
    this.logger.log('get counts ready');
    const PlatesRepository = this.dataSourcePlates.getRepository(Plates);
    let total: number;
    try {
      total = await PlatesRepository.count({
        select: {
          nameCar: true,
          WordPlates: true,
          NumPlates: true,
        },
      });
      const pages = Math.ceil(total / NumPlates);
      return {
        pageNum: PagePlates,
        pages: pages,
        total: total,
      };
    } catch (error) {
      this.logger.error('Ошибка при обработке запроса', error);
      throw new Error('Ошибка получения данных');
    }
  }
}
