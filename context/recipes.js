import { useState, createContext } from "react";
import PropTypes from "prop-types";

export const RecipesContext = createContext();

export const RecipesProvider = (props) => {
  const [recipes, setRecipes] = useState([]);

  const recipesContext = {
    recipes,
    setRecipes,
  };

  return (
    <RecipesContext.Provider value={recipesContext}>
      {props.children}
    </RecipesContext.Provider>
  );
};

RecipesProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
