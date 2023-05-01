import { ID } from '../../core/types';

export interface GetChatListParams {
  user: ID | null;
  isActive: boolean;
}
