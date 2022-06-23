/* eslint-disable require-jsdoc */
import fetch from "node-fetch";
import {config} from "firebase-functions";

const claveapihubspot = config().configuration.claveapihubspot;

export class HubSpotHelper {
  crearUsuario(
      nombres: string | undefined,
      apellidos: string | undefined,
      email: string | undefined
  ) {
    const fetchOptions = {
      method: "POST",
      body: JSON.stringify({
        properties: [
          {
            property: "email",
            value: email,
          },
          {
            property: "firstname",
            value: nombres,
          },
          {
            property: "lastname",
            value: apellidos,
          },
        ],
      }),
      headers: {
        "content-type": "application/json",
      },
    };
    return fetch(`https://api.hubapi.com/contacts/v1/contact/?hapikey=${claveapihubspot}`, fetchOptions)
        .then((response) => {
          console.log(response);
        })
        .catch((err)=>{
          console.error(err);
        });
  }
}
