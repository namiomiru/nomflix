import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;
const Link = styled.a``;

const Images = styled.img`
  height: 100px;
  background-image: url(${props => props.productionCompaniesImage});
  border: 1px solid #ffffff75;
  padding: 10px;
  background-color: #ffffff75;
  margin: 10px 10px 10px 0;
`;
const SubTitle = styled.div`
  font-size: 16px;
  color: #000;
  font-weight: bold;
  margin: 10px 0;
  text-shadow: -0.5px 0 #fff, 0 1px #fff, 1px 0 #fff, 0 -1px #fff;
`;
const ProductionCountriesName = styled.div`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  margin-top: 10px;
`;
const Videos = styled.iframe`
  margin: 10px 0;
`;
const Companies = styled.div`
  margin: 10px 0;
`;
const Countries = styled.div`
  margin: 10px 0;
`;
const Production = styled.div`
  margin: 10px 0;
`;
const ProductionButton = styled.button`
  :first-child {
    background-color: ${props =>
      props.production === "companies" ? "red" : "#fff"};
    border-radius: 5px;
  }
  :last-child {
    background-color: ${props =>
      props.production !== "companies" ? "red" : "#fff"};
    border-radius: 5px;
  }
  margin: 10px 5px 10px 0;
`;
const DetailPresenter = ({
  result,
  loading,
  error,
  isMovie,
  videos,
  production,
  tabChange
}) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Nomflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time[0]} min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
            {result.imdb_id && <Divider>•</Divider>}
            {result.imdb_id && (
              <Link
                target="_blank"
                href={`https://www.imdb.com/title/${result.imdb_id}`}
              >
                <span role="img" aria-label="play">
                  🎬IMDB
                </span>
              </Link>
            )}
          </ItemContainer>
          <ItemContainer>
            <Production>
              <ProductionButton
                production={production}
                onClick={() => tabChange("companies")}
              >
                Production Companies
              </ProductionButton>
              <ProductionButton
                production={production}
                onClick={() => tabChange("countries")}
              >
                Production Countries
              </ProductionButton>
            </Production>
            <Companies>
              {production === "companies"
                ? result.production_companies.map(
                    (production_companie, index) =>
                      production_companie.logo_path ? (
                        <Images
                          key={production_companie.id}
                          src={`https://image.tmdb.org/t/p/original/${production_companie.logo_path}`}
                        />
                      ) : (
                        ""
                      )
                  )
                : ""}
            </Companies>
            <Countries>
              {production === "countries"
                ? result.production_countries
                  ? result.production_countries.map(
                      (production_countrie, index) =>
                        production_countrie ? (
                          <ProductionCountriesName key={index}>
                            {production_countrie.name}
                          </ProductionCountriesName>
                        ) : (
                          ""
                        )
                    )
                  : ""
                : ""}
            </Countries>
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <ItemContainer>
            {!isMovie ? <SubTitle>Seasons</SubTitle> : ""}
            {!isMovie
              ? result.seasons.map((season, index) =>
                  season.poster_path ? (
                    <Images
                      key={index}
                      src={`https://image.tmdb.org/t/p/original/${season.poster_path}`}
                    />
                  ) : (
                    ""
                  )
                )
              : ""}
          </ItemContainer>
          <ItemContainer>
            <SubTitle>YouTube</SubTitle>
            {videos &&
              videos
                .slice(0, 2)
                .map((video, index) => (
                  <Videos
                    width="560"
                    height="315"
                    key={index}
                    src={`https://www.youtube.com/embed/${video.key}`}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    title="a"
                  ></Videos>
                ))}
          </ItemContainer>
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  isMovie: PropTypes.bool.isRequired,
  videos: PropTypes.array,
  production: PropTypes.string.isRequired,
  tabChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default DetailPresenter;
