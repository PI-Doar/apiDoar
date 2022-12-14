
import {Body, Controller, Put} from '@nestjs/common'
import { RefreshTokenDto } from './dto/refresh.tolken';
import { TokenService } from './token.service';

@Controller('token') 
export class TokenController {
    constructor(
        private tokenService: TokenService
    ){}


    @Put('refresh')
    async refreshToken(@Body() data: RefreshTokenDto){
        return await this.tokenService.refreshToken(data.oldToken)
    }
        
    
    
}
