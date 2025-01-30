import { ProductUpsertDto } from "@entities";
import { getZodErrorMessage, typography } from "@shared";
import { FormInstance } from "antd";
import _ from "lodash";
import { z } from "zod";

export const getProductUpsertForm = (form: FormInstance): ProductUpsertDto => {
  return {
    name: form.getFieldValue("name"),
    description: form.getFieldValue("description"),
    article: form.getFieldValue("article"),
    price: form.getFieldValue("price"),
    discountedPrice: form.getFieldValue("discountedPrice"),
    file: form.getFieldValue("file"),
  };
};

export const validateProductUpsertValues = (
  values: ProductUpsertDto,
  options?: {
    alwaysReturnValidValues?: boolean;
    setErrors?: (errors: Record<string, string> | undefined) => void;
  },
): ProductUpsertDto | undefined => {
  const ProductFilter = z
    .object({
      name: z
        .string({ message: typography.form.required })
        .min(1, { message: typography.form.required }),
      description: z.string().nullable().optional(),
      article: z.preprocess(
        (v) => (v && typeof v === "string" ? Number(v) : v),
        z
          .number({ message: typography.form.required })
          .refine(
            (val) => val === undefined || (val > 0 && Number.isInteger(val)),
            {
              path: ["article"],
              message: "Артикул должен быть положительным целым числом",
            },
          ),
      ),
      price: z.preprocess(
        (v) => (v && typeof v === "string" ? Number(v) : v),
        z.number({ message: typography.form.required }),
      ),
      discountedPrice: z.preprocess(
        (v) => (v && typeof v === "string" ? Number(v) : v),
        z
          .number()
          .optional()
          .transform((val) =>
            val !== undefined ? Math.max(val, 0) : undefined,
          ),
      ),
    })
    .refine(
      (data) => {
        if (data.price !== undefined && data.discountedPrice !== undefined) {
          return data.discountedPrice < data.price;
        }
        return true;
      },
      {
        path: ["price", "discountedPrice"],
        message: "Цена с учетом скидки должна быть меньше цены",
      },
    );

  const res = ProductFilter.safeParse(values);

  const validFields: Record<string, unknown> = {};

  if (res.success) {
    options?.setErrors?.(undefined);
    return _.omitBy(res.data, _.isUndefined) as ProductUpsertDto;
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
