import { Injectable } from "@nestjs/common";
import { User } from "./user";

export interface ReadUsersRepo {
     findAllByUsername: (username: string) => User[];
}

@Injectable()
export class UserRepository implements ReadUsersRepo {
     // TODO: Good enough for now, implement real repository
     private inMemoryUsers: User[] = [
          {
               userId: "123",
               username: "Game Master",
               password: "aA1!",
               roleId: "Game master",
          },
          {
               userId: "456",
               username: "Player1",
               password: "player1",
               roleId: "player",
          },
          {
               userId: "789",
               username: "Player2",
               password: "player2",
               roleId: "player",
          },
     ];

     public findAllByUsername(username: string): User[] {
          return this.inMemoryUsers.filter(
               (user) => user.username === username
          );
     }
}
