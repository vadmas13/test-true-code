import { SortSegmentOptionKey } from "@entities";
import { SegmentedOptions } from "antd/es/segmented";

export const sortSegmentOptions: SegmentedOptions<SortSegmentOptionKey> = [
  { value: SortSegmentOptionKey.New, label: "Новые" },
  { value: SortSegmentOptionKey.Cheapest, label: "Дешевле" },
  { value: SortSegmentOptionKey.Expensive, label: "Дороже" },
];
