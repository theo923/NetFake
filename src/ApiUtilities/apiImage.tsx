import * as React from "react";
import { Iseries } from "../interface/interface";

type cardProps = {
    series: any;
    handleClick: (serie: Iseries) => void;
    selectSerie: string;
};

export const CardScene = ({
    series,
    handleClick,
    selectSerie,
}: cardProps): JSX.Element => {
    return series.backdrop_path ? (
        <img
            data-test="img"
            key={series?.id}
            onClick={() => handleClick(series)}
            className={`${
                selectSerie === series?.id ? "border-white border-4" : null
            } card`}
            src={`https://image.tmdb.org/t/p/w300/${series?.backdrop_path}`}
            alt="scene"
        ></img>
    ) : (
        <div />
    );
};
export const CardPoster = ({
    series,
    handleClick,
    selectSerie,
}: cardProps): JSX.Element => {
    return series?.poster_path ? (
        <img
            data-test="img"
            key={series?.id}
            onClick={() => handleClick(series)}
            className={`${
                selectSerie === series?.id ? "border-white border-4 " : null
            } card`}
            src={`https://image.tmdb.org/t/p/w185/${series?.poster_path}`}
            alt="poster"
        ></img>
    ) : (
        <div />
    );
};
