import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('favorites')
@UseGuards(JwtGuard)
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post(':courseId')
  async addFavorite(@Request() req, @Param('courseId') courseId: string) {
    return this.favoriteService.addFavorite(req.user.id, courseId);
  }

  @Delete(':courseId')
  async removeFavorite(@Request() req, @Param('courseId') courseId: string) {
    return this.favoriteService.removeFavorite(req.user.id, courseId);
  }

  @Get()
  async getUserFavorites(@Request() req) {
    return this.favoriteService.getUserFavorites(req.user.id);
  }
}
