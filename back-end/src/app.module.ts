import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ColorsModule } from './modules/colors/colors.module';
import { NotesModule } from './modules/notes/notes.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, UsersModule, AuthModule, ColorsModule, NotesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
