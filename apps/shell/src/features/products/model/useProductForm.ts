import { useMemo, useState } from "react";
import { productSchema, type ProductFormValues } from "./productSchema";
import type { FormErrors } from "../../../shared/types/form";

type ProductFormField =
  | "title"
  | "price"
  | "category"
  | "description"
  | "image";

interface UseProductFormOptions {
  initialValues: ProductFormValues;
  onSubmit: (values: ProductFormValues) => void;
}

export function useProductForm({
  initialValues,
  onSubmit,
}: UseProductFormOptions) {
  const [values, setValues] = useState<ProductFormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors<ProductFormField>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isDirty = useMemo(() => {
    return JSON.stringify(values) !== JSON.stringify(initialValues);
  }, [values, initialValues]);

  const setFieldValue = <K extends keyof ProductFormValues>(
    field: K,
    value: ProductFormValues[K],
  ) => {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));
  };

  const validate = () => {
    const result = productSchema.safeParse(values);

    if (result.success) {
      setErrors({});
      return true;
    }

    const nextErrors: FormErrors<ProductFormField> = {};

    for (const issue of result.error.issues) {
      const field = issue.path[0] as ProductFormField | undefined;
      if (field && !nextErrors[field]) {
        nextErrors[field] = issue.message;
      }
    }

    setErrors(nextErrors);
    return false;
  };

  const handleSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    const isValid = validate();
    if (!isValid) return;

    setIsSubmitting(true);

    try {
      onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = (nextValues: ProductFormValues = initialValues) => {
    setValues(nextValues);
    setErrors({});
  };

  return {
    values,
    errors,
    isDirty,
    isSubmitting,
    setFieldValue,
    handleSubmit,
    resetForm,
  };
}
