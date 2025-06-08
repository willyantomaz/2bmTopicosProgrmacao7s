import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'atividade',
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
  ],
})
export class AppModule {}
