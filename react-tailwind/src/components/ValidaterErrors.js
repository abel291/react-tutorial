export default function ValidaterErrors(error) {
    let errorsArray = []

    let defaultMsg = "Al parecer hubo un error!"

    if (!error.response) {
        return defaultMsg
    }

    let response = error.response
    if ("data" in response) {
        
        if (response.status === 422) {

            if ("errors" in response.data) {

                let errorMsg = response.data.errors

                errorsArray = Object.values(errorMsg).map((el) => el[0])

            } else if ("error" in response.data) {

                errorsArray = response.data.error

            }
        } else if ("message" in response.data) {

            errorsArray = response.data.message
        }
    }

    return errorsArray
}
export function errorsInputValidation(response) {
    let errorsInputValidation = {}

    if (response.status === 422) {
        if ("errors" in response.data) {
            let errorMsg = response.data.errors
            for (const [key, value] of Object.entries(errorMsg)) {
                errorsInputValidation[key] = value[0]
            }
        }
    }

    return errorsInputValidation
}
