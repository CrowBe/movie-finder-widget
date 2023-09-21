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
    const [imageUrl, setImageUrl] = useState<string>("");
    const [youtubeId, setYoutubeId] = useState<string>("");
    return (
        <ConfigContext.Provider
            value={{
                imageUrl: imageUrl,
                youtubeId: youtubeId,
                setImageUrl: setImageUrl,
                setYoutubeId: setYoutubeId
            }}
        >
            {children}
        </ConfigContext.Provider>
    );
};
