import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { DatabaseModule } from '../dataBase/database.module';
import { TokenController } from './token.controller';
import { TokenProviders } from './token.providers';
import { TokenService } from './token.service';

@Module({
  
  imports: [DatabaseModule, forwardRef(() => AuthModule), UsuarioModule ],
  controllers: [TokenController],
  providers: [
    ...TokenProviders,
    TokenService,
  ],
  exports:[TokenService]
})
export class TokenModule {}