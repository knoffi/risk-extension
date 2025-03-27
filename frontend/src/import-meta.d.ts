interface ImportMeta {
    env: {
        MODE:
            | "PROD"
            | "STG"
            | "LOCAL"
            | "LOCAL_PREVIEW"
            | "LOCAL_PREVIEW_AGAINST_DOCKER";
        VITE_NUMBER_OF_TURTLES: string;
    };
}
