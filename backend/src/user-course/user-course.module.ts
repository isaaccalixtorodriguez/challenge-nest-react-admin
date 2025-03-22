import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCourse } from './entities/user-course.entity';
import { User } from '../user/user.entity';
import { Course } from '../course/course.entity';
import { UserCourseController } from './user-course.controller';
import { UserCourseService } from './user-course.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserCourse, User, Course])],
  controllers: [UserCourseController],
  providers: [UserCourseService],
  exports: [UserCourseService],
})
export class UserCourseModule {}
