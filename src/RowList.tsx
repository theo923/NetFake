import * as React from "react";
import { CardScene, CardPoster } from "./ApiUtilities/apiImage";
import { fetchTV, fetchMovie } from "./ApiUtilities/apiFunction";
import axios, { AxiosResponse } from "axios";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";
import youtubeSearch from "youtube-search";
import { Igenre, Iseries, Itrailer } from "./interface/interface";

type Props = {
    name: string;
    fetchFunction: string;
    fetchGenre?: string;
};

export const RowList = ({
    name,
    fetchFunction,
    fetchGenre,
}: Props): JSX.Element => {
    const [list, setList] = React.useState<string[]>([]);
    const [genreName, setGenreName] = React.useState<string>("");
    const [showContext, setShowContext] = React.useState<boolean>(false);
    const [serieTrailer, setSerieTrailer] = React.useState<Itrailer>({
        name: "",
        link: "",
    });
    const [selectSerie, setSelectSerie] = React.useState<string>("");
    const [selectDetail, setSelectDetail] = React.useState<any>({});

    React.useEffect(() => {
        if (name === "genre") {
            axios
                .get(fetchGenre || "")
                .then((res: AxiosResponse) => {
                    const data = res.data;
                    const selectGenre =
                        Math.floor(Math.random() * data.genres.length) + 1;
                    setGenreName(data.genres[selectGenre]?.name);
                    return `&sort_by=popularity.desc&with_genres=${data.genres[selectGenre]?.id}&with_watch_monetization_types=flatrate`;
                })
                .then((genreString: string) =>
                    axios
                        .get(
                            name !== "genre"
                                ? fetchFunction
                                : fetchFunction + genreString
                        )
                        .then((res: AxiosResponse) => setList(res.data.results))
                );
        } else {
            axios
                .get(fetchFunction)
                .then((res: AxiosResponse) => setList(res.data.results));
        }
    }, []);

    const handleClick = (serie: Iseries): void => {
        serie.title
            ? axios
                  .get(fetchMovie(serie.id as string))
                  .then((res: AxiosResponse) => setSelectDetail(res.data))
            : axios
                  .get(fetchTV(serie.id as string))
                  .then((res: AxiosResponse) => setSelectDetail(res.data));
        movieTrailer(serie.name || serie.title, { id: true }).then(
            (res: string) => {
                selectSerie === serie.id
                    ? setSelectSerie("undo")
                    : setSelectSerie(serie.id as string);
                res
                    ? setSerieTrailer({
                          name: serie.name || serie.title,
                          link: res,
                      })
                    : selectSerie !== serie.id
                    ? youtubeSearch(
                          (serie.name || serie.title) + " official trailer",
                          ytSearchOpts,
                          (err: any, results: any) =>
                              setSerieTrailer({
                                  name: serie.name || serie.title,
                                  link: results ? results[0].id : "",
                              })
                      )
                    : setSerieTrailer({ name: "", link: "" });
                setShowContext((prevState: boolean) => {
                    return selectSerie === "undo" ||
                        serieTrailer.name === serie.name ||
                        serieTrailer.name === serie.title ||
                        prevState === false
                        ? !prevState
                        : prevState;
                });
            }
        );
    };

    const ytSearchOpts: youtubeSearch.YouTubeSearchOptions = {
        maxResults: 1,
        key: process.env.REACT_APP_YT_API,
    };

    const ytOpts: object = {
        height: "390",
        width: "100%",
    };

    return (
        <>
            <div data-test="component-app-showHeader" className="rowHeader">
                {name !== "genre" ? name : genreName}
            </div>
            <div data-test="component-app-showList" className="rowList">
                {list?.map((series: any, idx: number) => {
                    if (name === "Netflix Original")
                        return (
                            <CardPoster
                                key={idx}
                                series={series}
                                handleClick={handleClick}
                                selectSerie={selectSerie}
                            />
                        );
                    else
                        return (
                            <CardScene
                                key={idx}
                                series={series}
                                handleClick={handleClick}
                                selectSerie={selectSerie}
                            />
                        );
                })}
            </div>
            {showContext ? (
                <div
                    data-test="component-app-showContext"
                    className="showContextGrid"
                >
                    <div className="showContextBar" />
                    <div className="showContextInfo">
                        <div className="flex-grow" />
                        <h1 className="showContextTitle">
                            {selectDetail.title || selectDetail.name}
                        </h1>
                        <div>{`100% Match ${
                            selectDetail.release_date ||
                            selectDetail.first_air_date +
                                " - " +
                                selectDetail?.last_air_date
                        } ${
                            selectDetail.name
                                ? " TV-MA " +
                                  selectDetail.seasons.length +
                                  " Season"
                                : ""
                        }`}</div>

                        <h1 className="showContextOverview">
                            {selectDetail.overview}
                        </h1>
                        <div className="Btn">
                            <button className="button playButton">
                                <img alt="play" src="/image/play.png" />
                                PLAY
                            </button>
                            <button className="button addButton">
                                <img alt="add-list" src="/image/plus.png" />
                                MY LIST
                            </button>
                        </div>
                        <div>{`Genres: ${selectDetail.genres?.map(
                            (genre: Igenre) => " " + genre.name
                        )}`}</div>
                        <div>This show is: Exciting</div>
                    </div>
                    <div className="youtube">
                        <Youtube videoId={serieTrailer.link} opts={ytOpts} />
                    </div>
                    <div className="showContextBottom" />
                </div>
            ) : null}
            <div className={`${showContext ? "p-12" : "p-6"}`} />
        </>
    );
};
