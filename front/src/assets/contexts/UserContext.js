import React from "react";

const UserContext = React.createContext({
    user: null,
    setUser : value => {}
});

export {UserContext}