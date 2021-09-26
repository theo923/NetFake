import React from "react";

export const Navigation = (): JSX.Element => {
    const [show, setShow] = React.useState<boolean>(false);
    const list: string[] = ["Home", "TV Shows", "Movies", "Latest", "My List"];

    React.useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 200) {
                setShow(true);
            } else setShow(false);
        });
        return () => {
            window.removeEventListener("scroll", () => {});
        };
    }, []);

    return (
        <nav
            data-test="component-navigation"
            className={`nav ${show ? "bg-black" : null}`}
        >
            <div className="p-4">
                <img src="./image/icon.png" width="100px" />
            </div>
            <div className="navList">
                {list.map((item: string, idx: number) => (
                    <div key={idx}>{item}</div>
                ))}
            </div>
        </nav>
    );
};
