import { useMemo } from "react";
import {
  LANDSCAPE_SIZE_IMAGE,
  PORTRAIT_SIZE_IMAGE,
  STANDARD_SIZE_IMAGE,
} from "src/marvel/adapters/primary/types/enums";
import { REPLACE_SIZE_IMAGE } from "src/marvel/adapters/primary/types/constants";

export const useGetUrlImage = (
  image: string = "",
  size: PORTRAIT_SIZE_IMAGE | LANDSCAPE_SIZE_IMAGE | STANDARD_SIZE_IMAGE,
) => {
  const imageUrl = useMemo(() => {
    return image?.replace(REPLACE_SIZE_IMAGE, size);
  }, [image, size]);

  return imageUrl;
};
