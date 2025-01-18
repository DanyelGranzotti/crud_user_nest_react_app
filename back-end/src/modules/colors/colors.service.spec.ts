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
    jest.spyOn(repository, 'create').mockReturnValue(createColorDto as Color);
    jest.spyOn(repository, 'save').mockResolvedValue(createColorDto as Color);
    const color = await service.create(createColorDto);
    expect(color).toMatchObject(createColorDto);
  });

  it('should find all active colors', async () => {
    const createColorDto = { name: 'Red', hex_code: '#FF0000', active: true };
    jest.spyOn(repository, 'find').mockResolvedValue([createColorDto as Color]);
    const colors = await service.findAll();
    expect(colors.length).toBe(1);
  });

  it('should find one active color by id', async () => {
    const createColorDto = { name: 'Red', hex_code: '#FF0000', active: true };
    jest
      .spyOn(repository, 'findOne')
      .mockResolvedValue(createColorDto as Color);
    const foundColor = await service.findOne(1);
    expect(foundColor).toMatchObject(createColorDto);
  });

  it('should update a color', async () => {
    const createColorDto = { name: 'Red', hex_code: '#FF0000', active: true };
    const updateColorDto = { name: 'Blue' };
    jest.spyOn(repository, 'update').mockResolvedValue(undefined);
    jest
      .spyOn(repository, 'findOne')
      .mockResolvedValue({ ...createColorDto, ...updateColorDto } as Color);
    const updatedColor = await service.update(1, updateColorDto);
    expect(updatedColor.name).toBe('Blue');
  });

  it('should deactivate a color instead of deleting', async () => {
    const createColorDto = { name: 'Red', hex_code: '#FF0000', active: true };
    jest.spyOn(repository, 'update').mockResolvedValue(undefined);
    jest
      .spyOn(repository, 'findOne')
      .mockResolvedValue({ ...createColorDto, active: false } as Color);
    const deactivatedColor = await service.remove(1);
    expect(deactivatedColor.active).toBe(false);
  });
});
