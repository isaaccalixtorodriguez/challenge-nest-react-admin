import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { ContentModule } from './content/content.module';
import { CourseModule } from './course/course.module';
import { StatsModule } from './stats/stats.module';
import { UserModule } from './user/user.module';
import { FavoriteModule } from './favorite/favorite.module';
import { UserCourseModule } from './user-course/user-course.module';
import * as ormconfig from '../ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(ormconfig),
    UserModule,
    AuthModule,
    CourseModule,
    ContentModule,
    StatsModule,
    FavoriteModule,
    UserCourseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
