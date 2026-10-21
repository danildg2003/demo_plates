import { Plates } from 'src/plates/plates.entity';
import { PlatesDTO } from 'src/dto/output/plates.dto';

export const itemsMapper = (platees: Plates): PlatesDTO => {
  return {
    id: platees.id,
    nameCar: platees.nameCar,
    WordPlates: platees.WordPlates,
    NumPlates: platees.NumPlates,
  };
};
