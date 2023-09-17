import React from "react";

const userContext = React.createContext({
    reqName : "",
    reqEmail: "",
    reqNumber : "",
    reqLevel : "easy",
    changeUserDetails : () => {}
})

export default userContext