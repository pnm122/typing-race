import { ServerJoinRoomPayload } from './JoinRoom'
import { ChangeUserDataPayload } from './ChangeUserData'
import { ChangeRoomDataPayload } from './ChangeRoomData'
import { ServerLeaveRoomPayload } from './LeaveRoom'

interface ServerEvents {
  /** A user has joined the room */
  'join-room': (value: ServerJoinRoomPayload) => void,
  /** A user's data has changed */
  'change-user-data': (value: ChangeUserDataPayload) => void,
  /** The room's data has changed */
  'change-room-data': (value: ChangeRoomDataPayload) => void,
  /** A user has left the room */
  'leave-room': (value: ServerLeaveRoomPayload) => void,
}

export default ServerEvents