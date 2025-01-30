import {
  ProductsFormFilters,
  ProductsQueryFilters,
  SortSegmentOptionKey,
} from "@entities";
import { getZodErrorMessage } from "@shared";
import { FormInstance } from "antd";
import _ from "lodash";
import { z } from "zod";

export const getProductFormFilters = (
  form: FormInstance,
): ProductsFormFilters => {
  return {
    article: form.getFieldValue("article"),
    minPrice: form.getFieldValue("minPrice"),
    maxPrice: form.getFieldValue("maxPrice"),
  };
};

export const validateProductFilterValues = (
  values: ProductsFormFilters,
  options?: {
    alwaysReturnValidValues?: boolean;
    setErrors?: (errors: Record<string, string> | undefined) => void;
  },
): ProductsQueryFilters | undefined => {
  const ProductFilter = z
    .object({
      sort: z
        .string()
        .optional()
        .refine((value) => {
          return (
            value === undefined ||
            (typeof value === "string" &&
              Object.values(SortSegmentOptionKey).includes(
                value as SortSegmentOptionKey,
              ))
          );
        }),
      name: z.string().optional(),
      page: z.preprocess(
        (v) => (v && typeof v === "string" ? Number(v) : v),
        z.number().optional(),
      ),
      pageSize: z.preprocess(
        (v) => (v && typeof v === "string" ? Number(v) : v),
        z.number().optional(),
      ),
      minPrice: z.preprocess(
        (v) => (v && typeof v === "string" ? Number(v) : v),
        z
          .number()
          .optional()
          .transform((val) =>
            val !== undefined ? Math.max(val, 0) : undefined,
          ),
      ),
      maxPrice: z.preprocess(
        (v) => (v && typeof v === "string" ? Number(v) : v),
        z
          .number()
          .optional()
          .transform((val) =>
            val !== undefined ? Math.max(val, 0) : undefined,
          ),
      ),
      article: z.preprocess(
        (v) => (v && typeof v === "string" ? Number(v) : undefined),
        z
          .number()
          .optional()
          .refine(
            (val) => val === undefined || (val > 0 && Number.isInteger(val)),
            {
              path: ["article"],
              message: "Артикул должен быть положительным целым числом",
            },
          ),
      ),
    })
    .refine(
      (data) => {
        if (data.minPrice !== undefined && data.maxPrice !== undefined) {
          return data.minPrice <= data.maxPrice;
        }
        return true;
      },
      {
        path: ["minPrice", "maxPrice"],
        message: "Минимальная цена должна быть меньше (равна) Максимальной",
      },
    );

  const res = ProductFilter.safeParse(values);

  const validFields: Record<string, unknown> = {};

  if (res.success) {
    options?.setErrors?.(undefined);
    return _.omitBy(res.data, _.isUndefined) as ProductsQueryFilters;
  }

  for (const key in values) {
    if (!res.error.errors.some((error) => error.path[0] === key)) {
      validFields[key] = values[key];
    }
  }

  options?.setErrors?.(getZodErrorMessage(res.error.errors));

  if (options?.alwaysReturnValidValues) {
    return validFields;
  }
};
