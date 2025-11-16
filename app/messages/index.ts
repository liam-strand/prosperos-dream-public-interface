import { Message } from './types';
import { message001 } from './message-001';
import { message002 } from './message-002';
import { message003 } from './message-003';
import { message004 } from './message-004';
import { message005 } from './message-005';
import { message006 } from './message-006';

export const allMessages: Message[] = [
    message001,
    message002,
    message004,
    message003,
    message005,
    message006
];

export type { Message };
export { message001, message002, message003, message004, message005, message006 };
