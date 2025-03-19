import { Test, TestingModule } from "@nestjs/testing";
import { expect } from "earl";
import { GameHistoryController } from "./game-history.controller";

describe("GameController", () => {
     let controller: GameHistoryController;

     beforeEach(async () => {
          const module: TestingModule = await Test.createTestingModule({
               controllers: [GameHistoryController],
          }).compile();

          controller = module.get<GameHistoryController>(GameHistoryController);
     });

     it("should be defined", () => {
          expect(controller).toBeTruthy();
     });
});
