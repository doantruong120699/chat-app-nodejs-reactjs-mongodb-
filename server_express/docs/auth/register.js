
module.exports = {
    "/auth/register": {
        "post": {
          "tags": [
            "auth"
          ],
        //   "summary": "Updates a pet in the store with form data",
        //   "description": "",
        //   "operationId": "updatePetWithForm",
          "consumes": [
            "application/x-www-form-urlencoded"
          ],
          "produces": [
            "application/json",
            "application/xml"
          ],
          "parameters": [
            {
              "name": "username",
              "in": "formData",
              "required": true,
              "type": "string"
            },
            {
              "name": "email",
              "in": "formData",
              "required": true,
              "type": "string"
            },
            {
              "name": "password",
              "in": "formData",
              "required": true,
              "type": "string"
            }
          ],
          "responses": {
            "400": {
              "description": "Invalid input"
            }
          },
        },
    },
}