import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { UpdateUserDto } from './users.dto';
import { Announcement } from '../announcement.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepo: Repository<Users>,

        @InjectRepository(Announcement)
        private announcementRepo: Repository<Announcement>,
    ) {}

    async register(userData: any): Promise<any> {
        const user = this.usersRepo.create(userData);
        return await this.usersRepo.save(user);
    }

    async login(email: string, pass: string): Promise<any> {
        const user = await this.usersRepo.findOne({ where: { email } as any });
        
        if (user && user.password === pass) {
            return {
                id: user.id,
                fullname: user.fullname,
                role: user.role 
            }; 
        }
        throw new UnauthorizedException('Invalid email or password');
    }

    async createAnnouncement(data: any): Promise<any> {
        const newAnnouncement = this.announcementRepo.create(data);
        return await this.announcementRepo.save(newAnnouncement);
    }

    // --- BAGONG DAGDAG: Update Announcement para sa EDIT feature ---
    async updateAnnouncement(id: number, data: any): Promise<any> {
        const announcement = await this.announcementRepo.findOne({ where: { id } as any });
        if (!announcement) {
            throw new NotFoundException(`Announcement with ID ${id} not found`);
        }
        
        // I-apply ang bagong title at content
        Object.assign(announcement, data);
        return await this.announcementRepo.save(announcement);
    }

    async findAllAnnouncements(): Promise<Announcement[]> {
        return await this.announcementRepo.find({
            order: { createdAt: 'DESC' } as any
        });
    }

    async deleteAnnouncement(id: number): Promise<{ message: string }> {
        const post = await this.announcementRepo.findOne({ where: { id } as any });
        if (!post) throw new NotFoundException(`Announcement with ID ${id} not found`);
        
        await this.announcementRepo.remove(post);
        return { message: `Announcement deleted successfully` };
    }

    async getHomeData() {
        const list = await this.announcementRepo.find({
            order: { createdAt: 'DESC' } as any 
        });

        return { 
            message: 'Welcome to the School Announcement System',
            announcements: list
        };
    }

    async findAll(): Promise<Users[]> {
        return await this.usersRepo.find();
    }

    async delete(id: number): Promise<{ message: string }> {
        const user = await this.usersRepo.findOne({ where: { id } as any });
        if (!user) throw new NotFoundException(`User with ID ${id} not found`);
        
        await this.usersRepo.remove(user);
        return { message: `User with ID ${id} deleted successfully` };
    }

    async findOne1(id: number): Promise<Users> {
        const user = await this.usersRepo.findOne({ where: { id } as any });
        if (!user) throw new NotFoundException(`User with ID ${id} not found`);
        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<any> {
        const user = await this.findOne1(id);
        Object.assign(user, updateUserDto);
        return await this.usersRepo.save(user);
    }
}
