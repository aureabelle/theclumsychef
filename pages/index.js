import { Fragment, useEffect, useState } from "react";
import Link from "next/link";

import { Card, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Meta } = Card;

import Layout from "../components/common/layout";
import Loader from "../components/common/loader";

const Home = ({ allRecipesApi }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [filterName, setFilterName] = useState("");
  const [recipeList, setRecipeList] = useState([]);

  const handleFilterName = (event) => {
    setFilterName(event.target.value);
  };

  const getAllRecipes = async () => {
    try {
      await fetch(allRecipesApi)
        .then((res) => res.json())
        .then((data) => {
          if (data.length !== 0) {
            setRecipeList(data);
          } else {
            setRecipeList([]);
          }
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllRecipes();
  }, []);

  const filteredRecipes = recipeList.filter((recipe) => {
    const name = recipe.name.toLowerCase();
    const altName = recipe.altName.toLowerCase();

    if (name.includes(filterName.toLowerCase())) {
      return name.includes(filterName.toLowerCase());
    } else if (altName.includes(filterName.toLowerCase())) {
      return altName.includes(filterName.toLowerCase());
    }
  });

  return (
    <Fragment>
      <Layout>
        <div className="home">
          <div className="filter">
            <Input
              placeholder="Recipe, ingredient"
              addonAfter={<SearchOutlined />}
              value={filterName}
              onChange={handleFilterName}
              size="large"
            />
          </div>
          {!isLoading ? (
            <Fragment>
              <div className="recipes-list">
                {filteredRecipes.map((recipeItem, index) => {
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
                              src={recipeItem.photos[0]["cover"]}
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

        .home .filter {
          margin-bottom: 20px;
          padding: 0 20px;
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

Home.getInitialProps = async ({ req }) => {
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

  const allRecipesApi = process.browser
    ? `${protocol}://${window.location.host}/api/recipes`
    : `${protocol}://${req.headers.host}/api/recipes`;

  return {
    allRecipesApi,
  };
};

export default Home;
