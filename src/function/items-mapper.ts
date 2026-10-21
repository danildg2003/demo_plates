import { Plates } from '../plates/plates.entity';
import { PlatesDTO } from '../dto/output/plates.dto';

export const itemsMapper = (platees: Plates): PlatesDTO => {
  return {
    id: platees.id,
    nameCar: platees.nameCar,
    WordPlates: platees.WordPlates,
    NumPlates: platees.NumPlates,
  };
};
