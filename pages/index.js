import { Fragment, useEffect, useState } from "react";
import Link from "next/link";

import { Card } from "antd";
const { Meta } = Card;

import { recipes } from "../data/recipes";

import Layout from "../components/common/layout";
import Loader from "../components/common/loader";

const Home = () => {
  console.log(recipes);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (recipes.length !== 0) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }

    return () => {
      setIsLoading(true);
    };
  }, []);

  return (
    <Fragment>
      <Layout>
        <div className="home">
          {!isLoading ? (
            <Fragment>
              <h1>Nam Nam's Recipes</h1>
              <div className="recipes-list">
                {recipes.map((recipeItem, index) => {
                  return (
                    <Link
                      href={`/recipes/${recipeItem.url}`}
                      key={`recipe-item-${index}`}
                    >
                      <a className="recipe-card">
                        <Card
                          hoverable
                          bordered={false}
                          cover={
                            <img
                              alt={`${recipeItem.name} - ${recipeItem.altName}`}
                              src={recipeItem.photos["cover"]}
                            />
                          }
                        >
                          <Meta title={`${recipeItem.name} `} />
                          <p className="alt-name">{recipeItem.altName}</p>
                        </Card>
                      </a>
                    </Link>
                  );
                })}
              </div>
            </Fragment>
          ) : (
            <Loader tipText="Loading recipes ..." />
          )}
        </div>
      </Layout>
      <style jsx global>{`
        .home {
          margin: 0 auto;
          max-width: 1400px;
          padding: 20px;
        }

        .home h1 {
          font-family: "Delius Unicase", cursive;
          text-align: center;
        }

        .home .recipes-list {
          display: flex;
          flex-direction: column;
        }

        .home .recipes-list .recipe-card {
          margin-bottom: 20px;
          width: 100%;
        }

        .home .recipes-list .recipe-card img {
          width: 100%;
        }

        .home .recipes-list .recipe-card .alt-name {
          margin: 0;
          margin-top: 5px;
        }

        @media screen and (min-width: 640px) {
          .home {
            min-height: 100vh;
            padding: 20px 10px;
          }

          .home h1 {
            font-size: 34px;
          }

          .home .recipes-list {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
          }

          .home .recipes-list .recipe-card {
            margin: 0 10px;
            margin-bottom: 20px;
            width: 46%;
          }
        }

        @media screen and (min-width: 1024px) {
          .home .recipes-list .recipe-card {
            margin: 0 10px;
            margin-bottom: 20px;
            width: 30%;
          }
        }

        @media screen and (min-width: 1200px) {
          .home h1 {
            font-size: 45px;
          }

          .home .recipes-list .recipe-card {
            flex: 1 0 auto;
            margin: 0 10px;
            margin-bottom: 20px;
            width: 33.3%;
          }
        }
      `}</style>
    </Fragment>
  );
};

export default Home;
