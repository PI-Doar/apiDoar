import { Injectable, Inject, HttpException, HttpStatus, forwardRef } from '@nestjs/common';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Token } from './token.entity';
import { UsuarioService } from 'src/usuario/usuario.service';
import { AuthService } from 'src/auth/auth.service';
import { Usuario } from 'src/usuario/usuario.entity';


@Injectable()
export class TokenService {
    constructor(
        @Inject('TOKEN_REPOSITORY')
        private tokenRepository: Repository<Token>,
        private usuarioService: UsuarioService,
        @Inject(forwardRef(() => AuthService))
        private authService: AuthService
    ) { }

    async save(hash: string, username: string) {
        let objToken = await this.tokenRepository.findOneBy({ username: username })
        if (objToken) {
            this.tokenRepository.update(objToken.id, {
                hash: hash
            })
        } else {
            this.tokenRepository.insert({
                hash: hash,
                username: username
            })
        }

    }

    async refreshToken(oldToken: string) {
        let objToken = await this.tokenRepository.findOneBy({ hash: oldToken })
        if (objToken) {
            let usuario = await this.usuarioService.findOne(objToken.username)
            return this.authService.login(usuario)
        }
        else {
            return new HttpException({
                errorMessage: 'Token inválido'
            }, HttpStatus.UNAUTHORIZED)
        }
    }

    async getUsuarioByToken(token: string): Promise<Usuario> {
        if(token !=null){
            token = token.replace("Bearer ","").trim()
               
            let objToken: Token = await this.tokenRepository.findOneBy({ hash: token })
            if (objToken) {
                let usuario = await this.usuarioService.findOne(objToken.username)
                return usuario
            }
            else {
                return null
            }
        }
        else null
    }
}