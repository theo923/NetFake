import React from "react";
import axios, { AxiosResponse } from "axios";
import { Iseries } from "./interface/interface";

type BannerProps = {
    fetchFunction: string;
};

export const Banner = ({ fetchFunction }: BannerProps): JSX.Element => {
    const [serie, setSerie] = React.useState<Iseries>();

    React.useEffect(() => {
        axios.get(fetchFunction).then((res: AxiosResponse) => {
            const data = res.data.results;
            const setdata = Math.floor(Math.random() * data.length) + 1;
            setSerie({ ...data[setdata] });
        });
    }, [fetchFunction]);

    return (
        <header data-test="component-banner">
            <div
                className="banner"
                style={{
                    backgroundImage: `${
                        serie?.backdrop_path
                            ? `url("https://image.tmdb.org/t/p/original/${serie.backdrop_path}")`
                            : ""
                    }`,
                }}
            >
                <div className="flex-grow"></div>
                <div className="bannerTitle">{serie?.title}</div>
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
                <div className="bannerOverview">{serie?.overview}</div>
                <div className="bannerTransitionBar"></div>
            </div>
        </header>
    );
};
