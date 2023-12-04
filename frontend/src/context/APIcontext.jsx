// apiContext.js
import React, { createContext, useContext } from "react";
import axios from "axios";

const URL = "http://localhost:8800/";

const ApiContext = createContext();

const ApiProvider = ({ children }) => {
  const getTurmas = () => {
    axios
      .get(`${URL}getTurmas`)
      .then((response) => {
        console.log(response.data); // Aqui você terá acesso aos dados das turmas
      })
      .catch((error) => alert("Usuário não existe"));
  };

  return (
    <ApiContext.Provider
      value={{
        getTurmas,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi deve ser usado dentro de um ApiProvider");
  }
  return context;
};

export { ApiProvider, useApi };
