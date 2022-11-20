import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { UsuarioController } from './usuario.controller';
import { UsuarioProviders } from './usuario.providers';
import { UsuarioService } from './usuario.service';

@Module({
  
  imports: [DatabaseModule, forwardRef(() => AuthModule) ],
  controllers: [UsuarioController],
  providers: [
    ...UsuarioProviders,
    UsuarioService,
  ],
  exports:[UsuarioService]
})
export class UsuarioModule {}