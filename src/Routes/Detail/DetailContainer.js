import React from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi } from "../../api";

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname }
    } = props;
    this.state = {
      result: null,
      error: null,
      loading: true,
      videos: null,
      tabs: "videos",
      isMovie: pathname.includes("/movie/")
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id }
      },
      history: { push }
    } = this.props;
    const { isMovie } = this.state;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/");
    }
    let result = null;
    let videos = null;
    try {
      if (isMovie) {
        ({ data: result } = await moviesApi.movieDetail(parsedId));
        ({
          data: { results: videos }
        } = await moviesApi.videos(parsedId));
      } else {
        ({ data: result } = await tvApi.showDetail(parsedId));
        ({
          data: { results: videos }
        } = await tvApi.videos(parsedId));
      }
    } catch {
      this.setState({ error: "Can't find anything." });
    } finally {
      this.setState({ loading: false, result, videos });
    }
  }

  tabChange = tap => {
    this.setState({ tabs: tap });
  };

  render() {
    const { result, error, loading, isMovie, videos, tabs } = this.state;
    return (
      <DetailPresenter
        result={result}
        error={error}
        loading={loading}
        isMovie={isMovie}
        videos={videos}
        tabs={tabs}
        tabChange={this.tabChange}
      />
    );
  }
}
