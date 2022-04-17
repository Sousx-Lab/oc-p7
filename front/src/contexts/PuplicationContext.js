import React from "react";

const PublicationContext = React.createContext({
    publicationId: null,
    setPublicationId : value => {}
});

export {PublicationContext};