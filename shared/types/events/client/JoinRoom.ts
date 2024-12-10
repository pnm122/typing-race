import { User } from '../../User'
import { Room } from '../../Room'
import { Return } from '../../Return'

type Payload = {
  roomId: Room['id']
  user: User
}

type Callback = (
  value: Return<
    {
      user: User,
      room: Room
    },
    | 'invalid-user-id'
    | 'username-not-provided'
    | 'color-not-provided'
    | 'user-in-room-already'
    | 'room-does-not-exist'
    | 'game-in-progress'
    | 'room-is-full'
  >
) => void

export type {
  Payload as ClientJoinRoomPayload,
  Callback as ClientJoinRoomCallback
}