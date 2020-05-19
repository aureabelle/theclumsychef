import { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/router";
import AdSense from "react-adsense";

import Loader from "../../components/common/loader";
import Layout from "../../components/common/layout";

import { recipes } from "../../data/recipes";

const Recipe = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [recipe, setRecipe] = useState({});

  const getAllRecipes = async () => {
    if (recipes.length !== 0) {
      const recipe = recipes.find((data) => data.url === router.query.url);

      if (recipe) {
        setRecipe(recipe);
      } else {
        setRecipe({});
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllRecipes();
  }, []);

  return (
    <Fragment>
      <Layout>
        <div className="recipe">
          {!isLoading ? (
            <Fragment>
              <div
                className="hero"
                style={{ backgroundImage: `url(${recipe.photos.cover})` }}
              />

              <div className="recipe-info">
                <div className="recipe-details">
                  <div className="details">
                    <h1>{recipe.name}</h1>
                    <h2>{recipe.altName}</h2>
                    <p>{recipe.description}</p>
                  </div>

                  <div className="in-content">
                    <AdSense.Google
                      client="ca-pub-4041154744236119"
                      slot="8037807622"
                      format="auto"
                      responsive="true"
                    />
                  </div>

                  <div className="ingredients">
                    <h3>Ingredients</h3>
                    <ul>
                      {recipe.ingredients.map((ingredient, index) => {
                        return (
                          <li
                            key={`ing-${index}`}
                          >{`${ingredient.quantity} ${ingredient.name}`}</li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="in-content">
                    <AdSense.Google
                      client="ca-pub-4041154744236119"
                      slot="5605077793"
                      format="auto"
                      responsive="true"
                    />
                  </div>

                  <div className="instructions">
                    <h3>Procedure</h3>
                    <ol>
                      {recipe.procedure.map((instruction, index) => {
                        return (
                          <li key={`inst-${index}`}>{instruction.step}</li>
                        );
                      })}
                    </ol>
                  </div>

                  <div className="in-content">
                    <AdSense.Google
                      client="ca-pub-4041154744236119"
                      slot="3486180911"
                      format="auto"
                      responsive="true"
                    />
                  </div>

                  {/* <div className="video">
                    <iframe
                      width="100%"
                      height="480"
                      src={recipe.video}
                    ></iframe>
                  </div> */}
                </div>

                <div className="misc ">
                  <AdSense.Google
                    client="ca-pub-4041154744236119"
                    slot="5013023180"
                    format="auto"
                    responsive="true"
                  />
                </div>
              </div>
            </Fragment>
          ) : (
            <Loader tipText="Loading recipe ..." />
          )}
        </div>
      </Layout>
      <style jsx>{`
        .recipe .hero {
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          height: 45vh;
          max-height: 400px;
          min-height: 320px;
          transition: min-height linear 0.2s;
          width: 100%;
        }

        .recipe .recipe-info {
          margin: 0 auto;
          max-width: 1200px;
        }

        .recipe .recipe-info .misc {
          display: none;
        }

        .recipe .recipe-info .in-content {
          display: none;
          margin: 10px 0;
          margin-bottom: 20px;
        }

        .recipe .details,
        .recipe .ingredients,
        .recipe .instructions,
        .recipe .video {
          padding: 0 20px;
          margin-bottom: 20px;
        }

        .recipe .details {
          margin-top: 20px;
        }

        .recipe .details h1 {
          font-family: "Delius Unicase", cursive;
          margin-bottom: 0;
        }

        .recipe .ingredients ul {
          list-style-type: none;
          margin: 0;
          margin-bottom: 20px;
          padding: 0;
        }

        .recipe .ingredients ul li {
          align-items: center;
          border-bottom: 1px dotted #e0e0e0;
          display: flex;
          justify-content: space-between;
          padding: 6px;
        }

        .recipe .instructions ol {
          counter-reset: section;
          list-style-type: none;
          margin: 0;
          margin-bottom: 20px;
          padding: 0;
        }

        .recipe .instructions ol li {
          align-items: flex-start;
          border-bottom: 1px dotted #e0e0e0;
          display: flex;
          justify-content: flex-start;
          padding: 6px;
        }

        .recipe .instructions ol li::before {
          counter-increment: section;
          content: counter(section) ". ";
          margin-right: 5px;
        }

        .recipe .ingredients ul li:last-child,
        .recipe .instructions ol li:last-child {
          border-bottom: none;
        }

        .recipe .video iframe {
          border: none;
        }

        @media screen and (min-width: 640px) {
          .recipe .hero {
            min-height: 480px;
          }

          .recipe p {
            font-size: 16px;
            line-height: 24px;
            margin: 24px 0;
          }

          .recipe .details h1 {
            font-size: 34px;
          }
        }

        @media screen and (min-width: 1024px) {
          .recipe .hero {
            min-height: 550px;
          }

          .recipe .recipe-info {
            display: flex;
          }

          .recipe .recipe-info .recipe-details {
            width: 70%;
          }

          .recipe .recipe-info .misc {
            background: #efefef;
            display: block;
            width: 30%;
          }
        }

        @media screen and (min-width: 1200px) {
          .recipe .hero {
            min-height: 700px;
          }

          .recipe .details h1 {
            font-size: 45px;
          }
        }
      `}</style>
    </Fragment>
  );
};

export default Recipe;
