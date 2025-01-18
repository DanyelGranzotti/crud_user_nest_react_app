import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ColorsService } from './colors.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';

@ApiTags('colors')
@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new color' })
  @ApiResponse({
    status: 201,
    description: 'The color has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @UseGuards(JwtAuthGuard)
  create(@Body() createColorDto: CreateColorDto) {
    return this.colorsService.create(createColorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active colors' })
  @ApiResponse({ status: 200, description: 'Return all active colors.' })
  findAll() {
    return this.colorsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a color by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the color with the given ID.',
  })
  @ApiResponse({ status: 404, description: 'Color not found.' })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.colorsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a color by ID' })
  @ApiResponse({
    status: 200,
    description: 'The color has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Color not found.' })
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateColorDto: UpdateColorDto,
  ) {
    // Add ParseUUIDPipe
    return this.colorsService.update(id, updateColorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deactivate a color by ID' })
  @ApiResponse({
    status: 200,
    description: 'The color has been successfully deactivated.',
  })
  @ApiResponse({ status: 404, description: 'Color not found.' })
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    // Add ParseUUIDPipe
    return this.colorsService.remove(id);
  }
}
