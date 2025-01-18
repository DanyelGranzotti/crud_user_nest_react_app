import { Injectable, Logger } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { CreateColorDto } from './dto/create-color.dto';

@Injectable()
export class ColorsSeeder {
  private readonly logger = new Logger(ColorsSeeder.name);

  constructor(private readonly colorsService: ColorsService) {}

  async seed() {
    const colors: CreateColorDto[] = [
      { name: 'Red', hex_code: '#FF0000', active: true },
      { name: 'Orange', hex_code: '#FFA500', active: true },
      { name: 'Yellow', hex_code: '#FFFF00', active: true },
      { name: 'Green', hex_code: '#008000', active: true },
      { name: 'Blue', hex_code: '#0000FF', active: true },
      { name: 'Indigo', hex_code: '#4B0082', active: true },
      { name: 'Violet', hex_code: '#EE82EE', active: true },
    ];

    await Promise.all(
      colors.map(async (color) => {
        try {
          await this.colorsService.create(color);
        } catch (error) {
          this.logger.error(
            `Failed to create color ${color.name}: ${(error as any).message}`,
          );
        }
      }),
    );
  }
}
