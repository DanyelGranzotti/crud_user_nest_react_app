import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorsController } from './colors.controller';
import { ColorsService } from './colors.service';
import { ColorsSeeder } from './colors.seeder';
import { Color } from './entities/color.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Color])],
  controllers: [ColorsController],
  providers: [ColorsService, ColorsSeeder],
})
export class ColorsModule {}
