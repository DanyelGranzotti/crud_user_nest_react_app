import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { Color } from './entities/color.entity';

@Injectable()
export class ColorsService {
  private readonly logger = new Logger(ColorsService.name);

  constructor(
    @InjectRepository(Color)
    private colorsRepository: Repository<Color>,
  ) {}

  async create(createColorDto: CreateColorDto) {
    const existingColor = await this.colorsRepository.findOne({
      where: { name: createColorDto.name },
    });
    if (existingColor) {
      this.logger.error(
        `Color with name ${createColorDto.name} already exists`,
      );
      throw new BadRequestException('Color with this name already exists');
    }
    const newColor = this.colorsRepository.create(createColorDto);
    return this.colorsRepository.save(newColor);
  }

  findAll() {
    return this.colorsRepository.find({ where: { active: true } });
  }

  async findOne(id: string) {
    const color = await this.colorsRepository.findOne({
      where: { id, active: true },
    });
    if (!color) {
      throw new NotFoundException('Color not found');
    }
    return color;
  }

  async update(id: string, updateColorDto: UpdateColorDto) {
    const color = await this.colorsRepository.findOne({ where: { id } });
    if (!color) {
      throw new NotFoundException('Color not found');
    }
    await this.colorsRepository.update(id, updateColorDto);
    return this.colorsRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    const color = await this.colorsRepository.findOne({ where: { id } });
    if (!color) {
      throw new NotFoundException('Color not found');
    }
    if (color.users && color.users.length > 0) {
      throw new BadRequestException('Color is in use by users');
    }
    await this.colorsRepository.update(id, { active: false });
    return this.colorsRepository.findOne({ where: { id } });
  }
}
