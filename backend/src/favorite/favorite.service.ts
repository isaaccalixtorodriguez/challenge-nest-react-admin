import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';
import { User } from 'src/user/user.entity';
import { Course } from 'src/course/course.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async addFavorite(userId: string, courseId: string): Promise<Favorite> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
    });

    if (!user || !course) {
      throw new NotFoundException('User or Course not found');
    }

    const existingFavorite = await this.favoriteRepository.findOne({
      where: {
        user: { id: userId },
        course: { id: courseId },
      },
    });

    if (existingFavorite) {
      return existingFavorite;
    }

    const favorite = this.favoriteRepository.create({
      user,
      course,
    });

    return this.favoriteRepository.save(favorite);
  }

  async removeFavorite(userId: string, courseId: string): Promise<void> {
    const favorite = await this.favoriteRepository.findOne({
      where: {
        user: { id: userId },
        course: { id: courseId },
      },
    });

    if (!favorite) {
      throw new NotFoundException('Favorite not found');
    }

    await this.favoriteRepository.remove(favorite);
  }

  async getUserFavorites(userId: string): Promise<Favorite[]> {
    return this.favoriteRepository.find({
      where: { user: { id: userId } },
      relations: ['course'],
    });
  }
}
