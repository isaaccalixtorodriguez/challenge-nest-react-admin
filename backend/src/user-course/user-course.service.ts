import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCourse } from './entities/user-course.entity';
import { User } from '../user/user.entity';
import { Course } from '../course/course.entity';

@Injectable()
export class UserCourseService {
  constructor(
    @InjectRepository(UserCourse)
    private userCourseRepository: Repository<UserCourse>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async enrollUserInCourse(
    userId: string,
    courseId: string,
  ): Promise<UserCourse> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
    });

    if (!user || !course) {
      throw new NotFoundException('User or Course not found');
    }

    const existingEnrollment = await this.userCourseRepository.findOne({
      where: {
        user: { id: userId },
        course: { id: courseId },
      },
    });

    if (existingEnrollment) {
      return existingEnrollment;
    }

    const userCourse = this.userCourseRepository.create({
      user,
      course,
    });

    return this.userCourseRepository.save(userCourse);
  }

  async unenrollUserFromCourse(
    userId: string,
    courseId: string,
  ): Promise<void> {
    const userCourse = await this.userCourseRepository.findOne({
      where: {
        user: { id: userId },
        course: { id: courseId },
      },
    });

    if (!userCourse) {
      throw new NotFoundException('Enrollment not found');
    }

    await this.userCourseRepository.remove(userCourse);
  }

  async getUserCourses(userId: string): Promise<UserCourse[]> {
    return this.userCourseRepository.find({
      where: { user: { id: userId } },
      relations: ['course'],
    });
  }

  async getCourseUsers(courseId: string): Promise<UserCourse[]> {
    return this.userCourseRepository.find({
      where: { course: { id: courseId } },
      relations: ['user'],
    });
  }
}
