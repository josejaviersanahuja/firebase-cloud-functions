import {EventContext, firestore} from "firebase-functions/v1";
import {Notificaciones} from "../notificaciones/Notificaciones";
import {IPlayList, playlistConverter} from "../utilidad/TypeConverter";

export const creacionNuevoPlaylistController = (
    snapShot: firestore.QueryDocumentSnapshot,
    context: EventContext,
) => {
  console.log(snapShot, context);
  const notificaciones = new Notificaciones();
  const playlist : IPlayList = playlistConverter(snapShot.data());

  notificaciones.enviarNotificacion(
      playlist.name,
      playlist.description,
      playlist.uid,
      null,
      ""
  );
};
