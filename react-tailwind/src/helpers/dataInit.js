const data= {
    step: 1,
    isLoading: false,
    errors: [],
    errorsValidator: {},

    //step 1
    startDate: new Date(),
    endDate: new Date(),
    adults: 1,
    kids: 0,
    night: 0,
    discountCodeExmaple: [],

    //step 2
    rooms: [],
    roomQuantity: 0,
    roomSelected: {},

    //step 3
    complements: [],

    complementsIds: [],
    pricePorReservation: 0,
    subTotalPrice: 0,
    totalPrice: 0,
    complementsSelect: [],
    //step 4

    client: {
        name: "",
        phone: "",
        email: "",
        email_confirmation: "",
        country: "",
        city: "",
        check_in: "",
        special_request: "",
    },
    discount: {
        code: "",
        amount: 0,
        percent: 0,
    },
    order: "",
    createOrder: "",

    //helpers
}
export default data
