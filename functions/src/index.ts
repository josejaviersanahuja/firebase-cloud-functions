import {firestore} from "firebase-functions";
import admin from "firebase-admin";

import {config} from
  "./playlists-tutoriales-firebase-adminsdk-x2zlw-24daf4f4dc";
import {
  creacionTokenController,
} from "./componentes/notificaciones/NotificacionesController";
import {
  creacionNuevoPlaylistController,
} from "./componentes/playlists/PlaylistsController";

admin.initializeApp({
  credential: admin.credential.cert(config),
});


admin.firestore().settings({timestampsInSnapshots: true});
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = https.onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send(
//       `Hello from Firebase! Plante: ${process.env.PLANET},
//       Población: ${process.env.AUDIENCE}`
//   );
// });

export const registrarTopico = firestore.document("/tokens/{id}")
    .onCreate(creacionTokenController);

export const enviarNotificacion = firestore.document("/playlists/{plid}")
    .onCreate(creacionNuevoPlaylistController);

/* AUTH FUNCTIONS
import {
  usuarioCreacionController,
  usuarioEliminadoController,
  creacionUsuarioCRMController,
} from "./componentes/usuarios/UsuarioController";

export const creacionUsuario = auth.user()
    .onCreate((user) => usuarioCreacionController(user));

export const eliminacionUsuario = auth.user()
    .onDelete(usuarioEliminadoController);

export const creacionUsuarioCRM = auth.user()
    .onCreate(creacionUsuarioCRMController);
*/
