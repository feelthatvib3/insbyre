import {
  BaseballCapIcon,
  type Icon,
  PantsIcon,
  SparkleIcon,
  TShirtIcon
} from '@phosphor-icons/react';

export const categoryIconMap: Record<string, Icon> = {
  new: SparkleIcon,
  top: TShirtIcon,
  bottom: PantsIcon,
  accessories: BaseballCapIcon
};
