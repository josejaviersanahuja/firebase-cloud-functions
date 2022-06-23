/* eslint-disable @typescript-eslint/no-explicit-any */
import {Notificaciones} from "./Notificaciones";

export const creacionTokenController = (dataSnapshot: any) => {
  const notificaciones = new Notificaciones();
  console.log(notificaciones, dataSnapshot);
};
