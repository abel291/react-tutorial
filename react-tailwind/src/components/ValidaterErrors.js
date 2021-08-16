export default function ValidaterErrors(response, updateData) {
    
    
    let errorsArray = []
    
    if (response===undefined || response.data===undefined) {
        errorsArray = "Al parecer hubo un error!"
        updateData("errors", errorsArray)
        return
    }

    let data = response.data
    
    //input laravel validator
    if ("errors" in data) {
        let errorMsg = data.errors
        errorsArray = Object.values(errorMsg).map((el) => el[0])
    } else if ("error" in data) {
        errorsArray = data.error
    } else if ("message" in data) {
        errorsArray = data.message
    } else {
        errorsArray = "Al parecer hubo un error!"
    }
    updateData("errors", errorsArray)
}
