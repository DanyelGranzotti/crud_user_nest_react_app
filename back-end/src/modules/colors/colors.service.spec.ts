import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColorsService } from './colors.service';
import { Color } from './entities/color.entity';

describe('ColorsService', () => {
  let service: ColorsService;
  let repository: Repository<Color>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ColorsService,
        {
          provide: getRepositoryToken(Color),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ColorsService>(ColorsService);
    repository = module.get<Repository<Color>>(getRepositoryToken(Color));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a color', async () => {
    const createColorDto = { name: 'Red', hex_code: '#FF0000', active: true };
    const color = new Color();
    Object.assign(color, createColorDto);

    jest.spyOn(repository, 'findOne').mockResolvedValue(null);
    jest.spyOn(repository, 'create').mockReturnValue(color);
    jest.spyOn(repository, 'save').mockResolvedValue(color);

    expect(await service.create(createColorDto)).toEqual(color);
  });

  it('should throw an error if color name already exists', async () => {
    const createColorDto = { name: 'Red', hex_code: '#FF0000', active: true };
    const color = new Color();
    Object.assign(color, createColorDto);

    jest.spyOn(repository, 'findOne').mockResolvedValue(color);

    await expect(service.create(createColorDto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should find all active colors', async () => {
    const color = new Color();
    color.name = 'Red';
    color.hex_code = '#FF0000';
    color.active = true;

    jest.spyOn(repository, 'find').mockResolvedValue([color]);

    const colors = await service.findAll();
    expect(colors).toEqual([color]);
  });

  it('should find one active color by id', async () => {
    const color = new Color();
    color.name = 'Red';
    color.hex_code = '#FF0000';
    color.active = true;

    jest.spyOn(repository, 'findOne').mockResolvedValue(color);

    expect(
      await service.findOne('550e8400-e29b-41d4-a716-446655440000'),
    ).toEqual(color); // Use valid UUID
  });

  it('should throw an error if color not found by id', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);

    await expect(
      service.findOne('550e8400-e29b-41d4-a716-446655440000'),
    ).rejects.toThrow(NotFoundException); // Use valid UUID
  });

  it('should update a color', async () => {
    const color = new Color();
    color.name = 'Red';
    color.hex_code = '#FF0000';
    color.active = true;

    const updateColorDto = { name: 'Blue' };

    jest.spyOn(repository, 'findOne').mockResolvedValue(color);
    jest.spyOn(repository, 'update').mockResolvedValue(undefined);
    jest
      .spyOn(repository, 'findOne')
      .mockResolvedValue({ ...color, ...updateColorDto });

    expect(
      await service.update(
        '550e8400-e29b-41d4-a716-446655440000',
        updateColorDto,
      ),
    ).toEqual({
      // Use valid UUID
      ...color,
      ...updateColorDto,
    });
  });

  it('should throw an error if color to update not found', async () => {
    const updateColorDto = { name: 'Blue' };

    jest.spyOn(repository, 'findOne').mockResolvedValue(null);

    await expect(
      service.update('550e8400-e29b-41d4-a716-446655440000', updateColorDto),
    ).rejects.toThrow(
      // Use valid UUID
      NotFoundException,
    );
  });

  it('should deactivate a color instead of deleting', async () => {
    const color = new Color();
    color.name = 'Red';
    color.hex_code = '#FF0000';
    color.active = true;

    jest.spyOn(repository, 'findOne').mockResolvedValue(color);
    jest.spyOn(repository, 'update').mockResolvedValue(undefined);
    jest
      .spyOn(repository, 'findOne')
      .mockResolvedValue({ ...color, active: false });

    const deactivatedColor = await service.remove(
      '550e8400-e29b-41d4-a716-446655440000',
    ); // Use valid UUID
    expect(deactivatedColor.active).toBe(false);
  });

  it('should throw an error if color to deactivate not found', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);

    await expect(
      service.remove('550e8400-e29b-41d4-a716-446655440000'),
    ).rejects.toThrow(NotFoundException); // Use valid UUID
  });

  it('should throw an error if color is in use by users', async () => {
    const color = new Color();
    color.name = 'Red';
    color.hex_code = '#FF0000';
    color.active = true;
    color.users = [{} as any];

    jest.spyOn(repository, 'findOne').mockResolvedValue(color);

    await expect(
      service.remove('550e8400-e29b-41d4-a716-446655440000'),
    ).rejects.toThrow(BadRequestException); // Use valid UUID
  });
});
