/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable require-jsdoc */
import {messaging} from "firebase-admin";

export class Notificaciones {
  registrarTokenAlTopico(token: string) {
    const registrationTokens = [token];

    return messaging()
        .subscribeToTopic(registrationTokens, "NuevosPosts")
        .then(() => {
          return console.log("Se adiciona correctamente al topico el token");
        })
        .catch((error) => {
          console.error(`Error registrando al topico el token => ${error}`);
        });
  }

  enviarNotificacion(titulo: any, descripcion: any, topico: any, tipo: any) {
    const topicoEnviar = topico === null ? "NuevosPosts" : topico;

    const mensaje = {
      data: {
        titulo: titulo,
        descripcion: descripcion,
        tipo: tipo,
      },
      topic: topicoEnviar,
    };

    return messaging()
        .send(mensaje)
        .then(() => {
          return console.log(
              "Mensaje enviado correctamente al topico NuevosPosts"
          );
        })
        .catch((error) => {
          console.error(
              `Error enviando mensaje al topico NuevosPosts => ${error}`
          );
        });
  }

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

    return messaging()
        .send(mensaje)
        .then(() => {
          return console.log("Mensaje enviado correctamente al token");
        })
        .catch((error) => {
          console.error(`Error enviando mensaje al token => ${error}`);
        });
  }
}

exports.Notificaciones = Notificaciones;
