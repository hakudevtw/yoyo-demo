import AgeGroupSelect from "./age-group-select";
import PriceInput from "./price-input";
import styles from "./age-group-price.module.css";
import type { AgeGroupPriceType } from "../../types/form";

interface Props {
  index: number;
  required?: boolean;
  value: AgeGroupPriceType;
  error?: Partial<Record<keyof AgeGroupPriceType, string>>;
  onRemove: () => void;
  onChange: (result: AgeGroupPriceType) => void;
}

export default function AgeGroupPrice({
  index,
  required,
  value,
  error,
  onChange,
  onRemove,
}: Props) {
  function handleChange<T extends AgeGroupPriceType>(type: keyof T, val: T[keyof T]) {
    const updated = { ...value, [type]: val };
    onChange(updated);
  }

  return (
    <div className={styles["container"]}>
      <header className={styles["header"]}>
        <h3>價格設定 - {index + 1}</h3>
        {!required && (
          <button className={styles["remove-btn"]} onClick={onRemove}>
            <span>X</span>
            移除
          </button>
        )}
      </header>
      <div className={styles["form"]}>
        <AgeGroupSelect
          range={value.ageGroup}
          onChange={(value) => handleChange("ageGroup", value)}
          error={error?.ageGroup}
        />
        <PriceInput
          value={value.price}
          onChange={(value) => handleChange("price", value)}
          error={error?.price}
        />
      </div>
    </div>
  );
}
