import { io } from 'socket.io-client';
import { defaultConfigService } from './supporting/config/config.service';

const url = defaultConfigService.getSocketUrl();

export const socket = io(url);