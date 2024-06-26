import { type ChangeEvent, type FocusEvent, useState } from "react";
import { Input } from "../ui/input";
import { FormControl, FormLabel, FormItem, FormDescription, FormMessage } from "../ui/form";
import styles from "./price-input.module.css";
import type { AgeGroupPriceType } from "../../types/form";
import { removeComma, addComma, parseNumStr } from "../../utils/numberUtils";

interface Props {
  value: AgeGroupPriceType["price"];
  onChange: (value: AgeGroupPriceType["price"]) => void;
  error?: string;
}

export default function PriceInput({ value, error, onChange }: Props) {
  const [displayValue, setDisplayValue] = useState(() => addComma(value));

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const raw = removeComma(e.target.value);
    const parsed = parseNumStr(raw);

    if (Number.isNaN(Number(parsed))) return;
    setDisplayValue(addComma(parsed));
    onChange(Number(parsed));
  }

  function handleBlur(e: FocusEvent<HTMLInputElement>) {
    const [integer, decimal] = e.target.value.split(".");
    if (!decimal) setDisplayValue(integer);
  }

  return (
    <FormItem hasError={!!error}>
      <FormLabel>入住費用 (每人每晚)</FormLabel>
      <FormControl>
        <div className={styles["currency"]}>TWD</div>
        <Input
          type="text"
          inputMode="numeric"
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FormControl>
      <FormMessage className={error ? "" : "hide"}>{error}</FormMessage>
      <FormDescription>輸入 0 表示免費</FormDescription>
    </FormItem>
  );
}
