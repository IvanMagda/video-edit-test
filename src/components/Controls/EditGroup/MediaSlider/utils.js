import { FILM } from "./types";

export const createBackgroundStyle = (type, generatedFrames) =>
  (type === FILM && {
    backgroundSize: "contain",
    backgroundRepeat: "round",
    backgroundImage: `url('${generatedFrames}')`,
  }) ||
  {};
