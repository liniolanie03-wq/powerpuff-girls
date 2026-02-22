import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module'; // Inayos ang path (tinanggal ang 's' sa filename)
import { Announcement } from './announcement.entity'; // Import ang announcement entity

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      // Gagamit ng MYSQL_URL sa Railway, at default sa local kung wala ito
      url: process.env.MYSQL_URL || 'mysql://root:@localhost:3306/sas', 
      autoLoadEntities: true,
      synchronize: true, 
    }),
    // Mahalaga ito para magamit ang Announcement entity sa database
    TypeOrmModule.forFeature([Announcement]), 
    ServeStaticModule.forRoot({
      // Siguraduhin na ang 'public' folder ay nasa labas ng 'src'
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/',
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
