/* eslint-disable require-jsdoc */
import {Email} from "../utilidad/EmailHelper";
import {HubSpotHelper} from "../utilidad/HubSpotHelper";
import {
  plantillaEmailBienvenida,
  plantillaEmailDespedida,
} from "../utilidad/PlantillasEmail";
import admin from "firebase-admin";

export class UsuarioAdmin {
  registrarEmailsUsuario(
      nombres: string | undefined,
      email: string | undefined
  ) {
    console.log("se registra email");
    return admin.firestore()
        .collection("emailsusuarios")
        .add({
          nombres: nombres,
          email: email,
        });
  }

  enviarEmailBienvenida(
      nombres: string | undefined,
      email: string | undefined
  ) {
    const to = email || "";
    const from = "info@blogeek.com";

    const textHtml = plantillaEmailBienvenida(nombres);

    const objEmail = new Email();

    return objEmail.sendEmail(
        from,
        to,
        "",
        "Video Blogeek - Bienvenido a la Comunidad de Videos Geek",
        textHtml
    );
  }

  enviarEmailDespedida(nombres: string | undefined, email: string | undefined) {
    const to = email || "";
    const from = "info@blogeek.com";

    const textHtml = plantillaEmailDespedida(nombres);

    const objEmail = new Email();

    return objEmail.sendEmail(
        from,
        to,
        "",
        "Video Blogeek - Espera!! no te vayas de la Comunidad de Videos Geek",
        textHtml
    );
  }

  sincronizarCRM(
      nombres: string | undefined,
      apellidos: string | undefined,
      email: string | undefined
  ) {
    const hubSpot = new HubSpotHelper();
    return hubSpot.crearUsuario(nombres, apellidos, email);
  }
}
