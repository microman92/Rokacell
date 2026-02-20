import React from "react";

interface Props {
  onCalculate: () => void;
  onHelp: () => void;
  onBack: () => void;
  styles: any;
  calculateLabel?: string;
  helpLabel?: string;
  backLabel?: string;
}

const CalculatorControls: React.FC<Props> = ({
  onCalculate,
  onHelp,
  onBack,
  styles,
  calculateLabel = "Calculate",
  helpLabel = "Help",
  backLabel = "← Back to Calculators",
}) => {
  return (
    <div className={styles.heatLossCalculator__controls}>
      <button
        onClick={onCalculate}
        className={`${styles.heatLossCalculator__button} ${styles["heatLossCalculator__button_primary"]}`}
      >
        {calculateLabel}
      </button>
      <button
        onClick={onHelp}
        className={`${styles.heatLossCalculator__button} ${styles["heatLossCalculator__button_secondary"]}`}
      >
        {helpLabel}
      </button>
      <button
        onClick={onBack}
        className={`${styles.heatLossCalculator__button} ${styles["heatLossCalculator__button_secondary"]}`}
      >
        {backLabel}
      </button>
    </div>
  );
};

export default CalculatorControls;
