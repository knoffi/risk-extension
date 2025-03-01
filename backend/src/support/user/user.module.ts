import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

@Module({
    controllers:[],
    providers: [
        UserService,
        {
            provide: UserRepository.name, useClass: UserRepository
        }
    ],
    exports: [
        // {
        //     provide: UserService.name, useClass: UserService
        // }
        UserService
    ]
})
export class UserModule {

}
