import { FilterOutlined, ReloadOutlined } from "@ant-design/icons";
import { ProductsQueryFilters, SortSegmentOptionKey } from "@entities";
import { DebounceSearchBar } from "@shared";
import { Badge, Button, Segmented } from "antd";
import { FC } from "react";
import { sortSegmentOptions } from "../consts";

type SearchBarProps = {
  onChange: (value: string) => void;
  onClickFilters: () => void;
  filterCount: number;
  initialData?: ProductsQueryFilters;
  onChangeSort: (sort: SortSegmentOptionKey) => void;
  onResetAllFilters?: () => void;
};

const SearchBar: FC<SearchBarProps> = ({
  onChange,
  onClickFilters,
  filterCount,
  initialData,
  onChangeSort,
  onResetAllFilters,
}) => {
  return (
    <div className="grid grid-cols-2 align-middle gap-4 mb-4">
      <div className="flex justify-start gap-4">
        <DebounceSearchBar
          onChange={onChange}
          initialValue={initialData?.name}
          allowClear
        />
        <Segmented
          options={sortSegmentOptions}
          onChange={onChangeSort}
          defaultValue={initialData?.sort ?? SortSegmentOptionKey.New}
        />
      </div>
      <div className="flex justify-end gap-4">
        <Badge count={filterCount}>
          <Button
            type="default"
            icon={<FilterOutlined />}
            onClick={onClickFilters}
          >
            Фильтры
          </Button>
        </Badge>
        <Button
          type="default"
          icon={<ReloadOutlined />}
          onClick={onResetAllFilters}
        >
          Сбросить фильтры
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
