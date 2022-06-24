/* eslint-disable @typescript-eslint/no-explicit-any */
import {firestore} from "firebase-functions/v1";
import {Notificaciones} from "./Notificaciones";

export const creacionTokenController = (
    dataSnapshot: firestore.QueryDocumentSnapshot
) => {
  const notificaciones = new Notificaciones();
  console.log(notificaciones, dataSnapshot);

  return notificaciones.registrarTokenAlTopico(dataSnapshot.data().token);
};
