import { createContext, useContext, useState } from "react";

export const ConfigContext = createContext<{
    imageUrl: string;
    youtubeId: string;
    setImageUrl: (newUrl: string) => void;
    setYoutubeId: (newId: string) => void;
}>({
    imageUrl: "",
    youtubeId: "",
    setImageUrl: () => {},
    setYoutubeId: () => {}
});

export const useConfigContext = () => useContext(ConfigContext);

export const ConfigContextProvider = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const [imageUrl, setImageUrl] = useState("");
    const [youtubeId, setYoutubeId] = useState("");

    return (
        <ConfigContext.Provider
            value={{ imageUrl, youtubeId, setImageUrl, setYoutubeId }}
        >
            {children}
        </ConfigContext.Provider>
    );
};
