import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Characters from "./marvel/adapters/primary/ui/pages/Characters";
import { ROUTES_PATH } from "./marvel/config/routes/routes";
import CharacterDetails from "./marvel/adapters/primary/ui/pages/CharacterDetails";

export const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES_PATH.CHARACTERS} Component={Characters} />
        <Route path={ROUTES_PATH.CHARACTERS_DETAIL} Component={CharacterDetails} />
      </Routes>
    </Router>
  );
};
