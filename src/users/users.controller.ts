import { Controller, Post, Body, Get, Delete, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 1. Handles the Registration form
  @Post('register')
  async register(@Body() userData: any) {
    return this.usersService.register(userData);
  }

  // 2. Handles the Login form
  @Post('login')
  async login(@Body() loginData: any) {
    return this.usersService.login(loginData.email, loginData.password);
  }

  // 3. Handles the Home Page Data (For Students)
  @Get('home-data')
  async getHomeData() {
    return this.usersService.getHomeData(); 
  }

  // 4. Handles the Admin Posting Announcement
  @Post('announcements')
  async postAnnouncement(@Body() announcementData: any) {
    return this.usersService.createAnnouncement(announcementData);
  }

  // 5. GET ALL ANNOUNCEMENTS (Para sa table sa admin.html)
  @Get('announcements')
  async findAllAnnouncements() {
    return this.usersService.findAllAnnouncements();
  }

  // --- BAGONG DAGDAG: PATCH ROUTE PARA SA EDIT ---
  // 6. UPDATE ANNOUNCEMENT (Para mabago ang post)
  @Patch('announcements/:id')
  async updateAnnouncement(@Param('id') id: string, @Body() updateData: any) {
    return this.usersService.updateAnnouncement(+id, updateData);
  }

  // 7. DELETE ANNOUNCEMENT (Para mabura ang mga test posts)
  @Delete('announcements/:id')
  async deleteAnnouncement(@Param('id') id: string) {
    return this.usersService.deleteAnnouncement(+id);
  }

  // 8. ADMIN ONLY: Get all registered users
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  // 9. ADMIN ONLY: Delete a user by their ID
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }
}
