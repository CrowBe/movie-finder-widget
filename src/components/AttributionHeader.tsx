const AttributionHeader = () => {
    const showCredits = () => {
        document
            .getElementById("about-dropdown-content")
            ?.classList.toggle("show");
    };

    return (
        <div id="attribution-header">
            <p id="disclaimer">
                Disclaimer: This product uses the TMDb API but is not endorsed
                or certified by TMDb.
            </p>
            <button id="about-dropdown-button" onClick={showCredits}>
                About <div></div>
            </button>
            <div id="about-dropdown-content">
                <p>
                    This Widget was built with create-react-app and functions as
                    a user interface for the API built by the developers of The
                    Movie Database. You can check out their website here:{" "}
                    <a
                        href="https://www.themoviedb.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        The Movie Database
                    </a>
                    . You can also learn more about the API here:{" "}
                    <a
                        href="https://developers.themoviedb.org/3/getting-started/introduction"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        API Introduction
                    </a>
                    . All media information, images, trailers etc. are retrieved
                    through their api and are subject to licensing/copyright
                    laws detailed in their documentation
                    <a
                        href="https://www.themoviedb.org/documentation/api"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {" "}
                        here
                    </a>
                    .
                </p>
            </div>
        </div>
    );
};

export default AttributionHeader;
