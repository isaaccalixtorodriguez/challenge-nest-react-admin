import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UserCourseService } from './user-course.service';

@Controller('user-courses')
@ApiTags('User Courses')
@ApiBearerAuth()
@UseGuards(JwtGuard)
export class UserCourseController {
  constructor(private readonly userCourseService: UserCourseService) {}

  @Post(':courseId/enroll')
  async enrollUserInCourse(
    @Request() req,
    @Param('courseId') courseId: string,
  ) {
    return this.userCourseService.enrollUserInCourse(req.user.id, courseId);
  }

  @Delete(':courseId/unenroll')
  async unenrollUserFromCourse(
    @Request() req,
    @Param('courseId') courseId: string,
  ) {
    return this.userCourseService.unenrollUserFromCourse(req.user.id, courseId);
  }

  @Get('my-courses')
  async getUserCourses(@Request() req) {
    return this.userCourseService.getUserCourses(req.user.id);
  }

  @Get(':courseId/users')
  async getCourseUsers(@Param('courseId') courseId: string) {
    return this.userCourseService.getCourseUsers(courseId);
  }
}
