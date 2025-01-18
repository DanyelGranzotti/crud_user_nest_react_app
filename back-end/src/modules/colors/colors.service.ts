import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { Color } from './entities/color.entity';

@Injectable()
export class ColorsService {
  constructor(
    @InjectRepository(Color)
    private colorsRepository: Repository<Color>,
  ) {}

  create(createColorDto: CreateColorDto) {
    const newColor = this.colorsRepository.create(createColorDto);
    return this.colorsRepository.save(newColor);
  }

  findAll() {
    return this.colorsRepository.find({ where: { active: true } });
  }

  findOne(id: number) {
    return this.colorsRepository.findOne({ where: { id, active: true } });
  }

  async update(id: number, updateColorDto: UpdateColorDto) {
    await this.colorsRepository.update(id, updateColorDto);
    return this.colorsRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    await this.colorsRepository.update(id, { active: false });
    return this.colorsRepository.findOne({ where: { id } });
  }
}
