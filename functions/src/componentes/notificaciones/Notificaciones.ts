/* eslint-disable @typescript-eslint/no-explicit-any */
import admin from "firebase-admin";

/** Clase con los métodos para gestionar las Notificaciones */
export class Notificaciones {
  /**
 * Registramos el token a un tópico
 * @param {string} token generado por los workers en el frontend
 * @return {Promise<MessagingTopicManagementResponse>}
 */
  registrarTokenAlTopico(token: string) {
    const registrationTokens = [token];

    return admin.messaging()
        .subscribeToTopic(registrationTokens, "NuevoPlaylist")
        .then(() => {
          return console.log("Se adiciona correctamente al topico el token");
        })
        .catch((error) => {
          console.error(`Error registrando al topico el token => ${error}`);
        });
  }

  /**
   * Ya documentaremos
   * @param {string} titulo
   * @param {string} descripcion
   * @param {string | null} topico
   * @param {any} tipo
   * @return {Promise<string>}
   */
  enviarNotificacion(
      titulo: string,
      descripcion: string,
      topico: string | null,
      tipo: any
  ) {
    const topicoEnviar = topico === null ? "NuevoPlaylist" : topico;

    const mensaje = {
      data: {
        titulo: titulo,
        descripcion: descripcion,
        tipo: tipo,
      },
      topic: topicoEnviar,
    };

    return admin.messaging()
        .send(mensaje)
        .then(() => {
          return console.log(
              "Mensaje enviado correctamente al topico NuevoPlaylist"
          );
        })
        .catch((error) => {
          console.error(
              `Error enviando mensaje al topico NuevoPlaylist => ${error}`
          );
        });
  }

  /**
   * Luego
   * @param {any} titulo
   * @param {any} descripcion
   * @param {any} tipo
   * @param {any} token
   * @return {Promise<string>}
   */
  enviarNotificacionAToken(
      titulo: any,
      descripcion: any,
      tipo: any,
      token: any
  ) {
    console.log("token");
    console.log(token);
    const mensaje = {
      data: {
        titulo: titulo,
        descripcion: descripcion,
        tipo: tipo,
      },
      token: token,
    };

    return admin.messaging()
        .send(mensaje)
        .then(() => {
          return console.log("Mensaje enviado correctamente al token");
        })
        .catch((error) => {
          console.error(`Error enviando mensaje al token => ${error}`);
        });
  }
}
