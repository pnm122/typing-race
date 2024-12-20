"use client"

import { Room } from "$shared/types/Room"
import { User } from "$shared/types/User"
import { createContext, useContext, useEffect, useRef, useState } from "react"
import { useSocket } from "./Socket"
import { getColor, getUsername } from "@/utils/user"
import { onChangeRoomData, onJoinRoom, onLeaveRoom } from "@/utils/room"
import { useNotification } from "./Notification"
import { ServerJoinRoomPayload } from "$shared/types/events/server/JoinRoom"
import { ServerLeaveRoomPayload } from "$shared/types/events/server/LeaveRoom"
import { ChangeRoomDataPayload } from "$shared/types/events/server/ChangeRoomData"

export type GlobalState = {
  user: User | null
  room: Room | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  setRoom: React.Dispatch<React.SetStateAction<Room | null>>
  waitForStateChange: () => Promise<void>
}

const GlobalStateContext = createContext<GlobalState>({
  user: null,
  room: null,
  setUser() {},
  setRoom() {},
  async waitForStateChange() {}
})

export function GlobalStateProvider({
  children
}: React.PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null)
  const [room, setRoom] = useState<Room | null>(null)
  const socket = useSocket()
  const notifs = useNotification()
  const stateHasChanged = useRef<(() => void) | null>(null)
  const waitForStateChangePromise = useRef<Promise<void> | null>(null)

  useEffect(() => {
    if(stateHasChanged.current) {
      stateHasChanged.current()
      stateHasChanged.current = null
    }
  }, [room, user])

  useEffect(() => {
    if(socket.state !== 'valid') return

    const username = getUsername()
    const color = getColor()

    setUser({
      id: socket.value.id!,
      username,
      color
    })
  }, [socket])

  useEffect(() => {
    if(socket.state !== 'valid') return

    const handleJoinRoom = (res: ServerJoinRoomPayload) => onJoinRoom(res, { globalState: { user, setUser, room, setRoom, waitForStateChange }, notifs })
    const handleLeaveRoom = (res: ServerLeaveRoomPayload) => onLeaveRoom(res, { globalState: { user, setUser, room, setRoom, waitForStateChange }, notifs })
    const handleChangeRoomData = (res: ChangeRoomDataPayload) => onChangeRoomData(res, { globalState: { user, room, setUser, setRoom, waitForStateChange }})

    socket.value.on('join-room', handleJoinRoom)
    socket.value.on('leave-room', handleLeaveRoom)
    socket.value.on('change-room-data', handleChangeRoomData)

    return () => {
      socket.value.off('join-room', handleJoinRoom)
      socket.value.off('leave-room', handleLeaveRoom)
      socket.value.off('change-room-data', handleChangeRoomData)
    }
  }, [socket, room])

  function waitForStateChange() {
    if(waitForStateChangePromise.current) {
      return waitForStateChangePromise.current
    }
    waitForStateChangePromise.current = new Promise<void>(res => stateHasChanged.current = res)
    return waitForStateChangePromise.current
  }

  return (
    <GlobalStateContext.Provider value={{ user, room, setUser, setRoom, waitForStateChange }}>
      {children}
    </GlobalStateContext.Provider>
  )
}

export const useGlobalState = () => useContext(GlobalStateContext)