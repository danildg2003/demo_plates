import { Injectable, Logger } from '@nestjs/common';
import { Plates } from './plates/plates.entity';
import { Interlayer, InterlayersStatuses } from './model/interlayer';
import { CreateNewPlatesDTO } from './dto/input/query-create-new-plates-info';
import { PlatesBaseDTO } from './dto/output/plate-base.dto';
import { DeletePlatesDTO } from './dto/input/delete-plates';
import { AppRepository } from './app.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(
    @InjectRepository(Plates) private readonly platesRepo: Repository<Plates>,
    private readonly appRepository: AppRepository,
  ) {}

  async getPlates(
    PagePlates: number,
    NumPlates: number,
  ): Promise<Interlayer<PlatesBaseDTO>> {
    const notice = new Interlayer<PlatesBaseDTO>();
    const plates: PlatesBaseDTO = await this.appRepository.getPlates(
      PagePlates,
      NumPlates,
    );

    if (!plates.items) {
      this.logger.log('Номера не найдены');
      notice.addError('Номера не найдены', '', InterlayersStatuses.NOT_FOUND);
      return notice;
    }
    notice.addData(plates);
    return notice;
  }

  async acceptNewPlates(createNewInfoPlates: CreateNewPlatesDTO) {
    try {
      const newPlate = this.platesRepo.create(createNewInfoPlates);
      const savedPlate = await this.platesRepo.save(newPlate);
      return savedPlate;
    } catch (error) {
      this.logger.error(`Ошибка при создании записи: ${error.message}`);
      throw new Error('Не удалось создать новую запись');
    }
  }

  async deletePlate(deletePlatesDto: DeletePlatesDTO) {
    const { WordPlates, NumPlates } = deletePlatesDto;
    const plate = await this.platesRepo.findOne({
      where: { WordPlates, NumPlates },
    });
    if (!plate) {
      return { success: false, message: 'Запись не найдена' };
    }
    await this.platesRepo.remove(plate);
    return { success: true, message: 'Запись успешно удалена' };
  }
}
