import React from "react";

const PublicationContext = React.createContext({
    publication: null,
    setPublication : value => {}
});

export {PublicationContext};