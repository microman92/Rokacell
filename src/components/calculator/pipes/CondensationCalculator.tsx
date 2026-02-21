"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCurrentLocale } from '@/hooks/useCurrentLocale';
import { href, ROUTES } from '@/lib/routes';
import styles from '../HeatLossCalculator.module.scss';
// modal styles are now imported in child modals
import CalculateHModal from './CalculateHModal';
import HelpModal from './HelpModal';
import type { CondensationResults, CondensationModalParams } from '@/types/calculator';
import CalculatorControls from '@/components/calculator/shared/CalculatorControls';
import LabeledField from '@/components/calculator/shared/LabeledField';
import LabeledSelect from '@/components/calculator/shared/LabeledSelect';
import { useCalculatorStore } from '@/stores/calculatorStore';
import { ALL_TUBE_SIZES, MATERIALS, formatTubeName, type AnyMaterialKey } from '@/utils/constants';
import { calculateDewPoint, calculateMinimumThickness } from '@/utils/condensation';
import { computeH } from '@/hooks/useHeatTransferCoefficient';
import { Dictionary } from '@/lib/i18n';

type CalculatorDict = NonNullable<Dictionary['calculator']>['calc'];

interface CondensationCalculatorProps {
  dict?: CalculatorDict;
}

const CondensationCalculator: React.FC<CondensationCalculatorProps> = ({ dict }) => {
  const router = useRouter();
  const locale = useCurrentLocale();
  // Using shared store for common parameters
  const {
    ambientTemp,
    mediumTemp,
    tubeDiameter,
    material,
    h,
    orientation,
    emissivity,
    setAmbientTemp,
    setMediumTemp,
    setTubeDiameter,
    setMaterial,
    setH,
    setOrientation,
    setEmissivity,
  } = useCalculatorStore();

  // Local parameter for relative humidity
  const [relativeHumidity, setRelativeHumidity] = useState<number>(60.0);

  // Параметр для отключения коэффициента безопасности 0.75
  const [applySafetyFactor, setApplySafetyFactor] = useState<boolean>(false);
  // Использовать продвинутый алгоритм
  const [useAdvancedAlgorithm, setUseAdvancedAlgorithm] = useState<boolean>(true);

  // Calculation results state
  const [results, setResults] = useState<CondensationResults>({
    dewpointTemperature: 0,
    minimumThickness: 0,
    nominalThickness: '',
  });

  // State to track if at least one calculation was performed
  const [, setHasCalculated] = useState<boolean>(false);

  // Modal window state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalParams, setModalParams] = useState<CondensationModalParams>({
    calculationType: 'inside',
    orientation,
    emissivity,
  });

  // Help modal window state
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);

  // Main condensation calculation function
  const calculateCondensation = (): void => {
    // Input data validation
    if (relativeHumidity <= 0 || relativeHumidity > 100 || h <= 0) {
      return;
    }

    try {
      // Dew point calculation
      const dewPoint = calculateDewPoint(ambientTemp, relativeHumidity);

      // Minimum insulation thickness calculation
      const minThickness = calculateMinimumThickness(
        tubeDiameter,
        ambientTemp,
        mediumTemp,
        dewPoint,
        material,
        h
      );

      // Recommended thickness with 20% margin
      const nominalThickness = Math.ceil(minThickness * 1.2);

      // Find available thicknesses for selected pipe diameter
      const selectedTube = ALL_TUBE_SIZES.find(tube => tube.mm === tubeDiameter);
      const availableThicknesses = selectedTube && selectedTube.wallThicknesses
        ? Object.keys(selectedTube.wallThicknesses).map(Number).sort((a, b) => a - b)
        : [6, 9, 13, 19, 25, 32];

      // Select nearest available thickness that is greater than or equal to nominal
      const recommendedThickness = availableThicknesses.find(t => t >= nominalThickness) || availableThicknesses[availableThicknesses.length - 1];

      // Form recommendation with stock information
      let recommendation = '';
      if (selectedTube) {
        recommendation = `${formatTubeName(selectedTube)} - ${recommendedThickness}mm`;
      } else {
        recommendation = `${recommendedThickness}x25mm`;
      }

      setResults({
        dewpointTemperature: dewPoint,
        minimumThickness: minThickness,
        nominalThickness: recommendation
      });

      setHasCalculated(true);
    } catch (error) {
      // Показываем ошибку пользователю
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Произошла ошибка при расчёте. Проверьте входные параметры.');
      }
    }
  };

  // Handler for opening modal window for h coefficient calculation
  const handleCalculateH = (): void => {
    setModalParams({ calculationType: 'inside', orientation, emissivity });
    setIsModalOpen(true);
  };

  // Handler for opening help modal window
  const handleOpenHelp = (): void => {
    setIsHelpModalOpen(true);
  };

  // Heat transfer coefficient calculation function
  const calculateH = (): void => {
    const { calculationType, orientation: modalOrientation, emissivity: modalEmissivity } = modalParams;

    // Для расчёта H используем типичную толщину изоляции 9 мм для оценки наружного диаметра
    // Это необходимо, так как H зависит от наружного диаметра изоляции
    const typicalInsulationThickness = 9; // мм

    const h_total = computeH({
      ambientTemp,
      mediumTemp,
      tubeDiameter,
      orientation: modalOrientation,
      emissivity: modalEmissivity,
      calculationType,
      insulationThickness: typicalInsulationThickness, // Используем типичную толщину для оценки H
      useSimplifiedFormula: false,
      applySafetyFactor, // Применять ли коэффициент безопасности 0.75
      useAdvancedAlgorithm: false,
      useAdvancedSheetsAlgorithm: false,
      useKFlexAlgorithm: true, // использовать алгоритм, согласованный с K‑FLEX
      forCondensation: true, // специальный режим для конденсации
    });

    setH(h_total);
    setOrientation(modalOrientation);
    setEmissivity(modalEmissivity);
    setIsModalOpen(false);
  };

  // Reset default values and go back
  const handleBack = (): void => {
    // Reset common parameters from store
    useCalculatorStore.getState().reset();

    // Reset local parameters and results
    setRelativeHumidity(60.0);
    setResults({ dewpointTemperature: 0, minimumThickness: 0, nominalThickness: '' });
    setHasCalculated(false);
    setIsModalOpen(false);
    setIsHelpModalOpen(false);
    setModalParams({ calculationType: 'inside', orientation: 'horizontal', emissivity: 0.93 });

    router.push(href(locale, ROUTES.CALCULATOR));
  };

  // Style adapter for common field
  const fieldStyles = {
    heatLossCalculator__field: styles.heatLossCalculator__field as string,
    heatLossCalculator__field_label: styles.heatLossCalculator__field_label as string,
    heatLossCalculator__field_input: styles.heatLossCalculator__field_input as string,
    heatLossCalculator__field_unit: styles.heatLossCalculator__field_unit as string,
    helpTextTall: styles.helpTextTall as string,
  };

  return (
    <div className={styles.heatLossCalculator}>
      <div className={styles.heatLossCalculator__container}>
        <div className={styles.heatLossCalculator__header}>
          <h1 className={styles.heatLossCalculator__header_title}>{dict?.pipesCondensationTitle || "Condensation Prevention for Pipes"}</h1>
        </div>

        <div className={styles.heatLossCalculator__content}>
          {/* Parameters Section */}
          <div className={styles.heatLossCalculator__section}>
            <h2 className={styles.heatLossCalculator__section_title}>{dict?.parameters || "Parameters"}</h2>
            <div className={styles.heatLossCalculator__grid}>

              <LabeledField
                label={dict?.ambientTemp || "ambient temperature"}
                helpText={dict?.ambientTempDesc || "air around insulation, °C"}
                unit="°C"
                value={ambientTemp}
                onChange={setAmbientTemp}
                styles={fieldStyles}
              />

              <LabeledField
                label={dict?.mediumTemp || "medium temperature"}
                helpText={dict?.mediumTempDesc || "heat carrier inside pipe, °C"}
                unit="°C"
                value={mediumTemp}
                onChange={setMediumTemp}
                styles={fieldStyles}
              />
              <LabeledSelect
                label={dict?.pipeDiameter || "pipe diameter"}
                helpText={dict?.pipeDiameterDesc || "outer diameter, mm (Cu/St equivalents shown)"}
                unit="mm"
                value={tubeDiameter}
                onChange={(v) => setTubeDiameter(+v)}
                styles={fieldStyles}
                options={ALL_TUBE_SIZES.map((size) => ({
                  value: size.mm,
                  label: formatTubeName(size),
                }))}
              />
              <LabeledSelect
                label={dict?.insulationMaterial || "thermal insulation material"}
                helpText={dict?.insulationMaterialDesc || "sets thermal conductivity λ(T)"}
                value={material}
                onChange={(v) => setMaterial(String(v) as AnyMaterialKey)}
                styles={fieldStyles}
                options={Object.keys(MATERIALS).map((mat) => ({ value: mat, label: mat }))}
              />
              <div className={styles.heatLossCalculator__field}>
                <label className={styles.heatLossCalculator__field_label}>{dict?.heatTransferCoefficient || "heat transfer coefficient h"}</label>
                <span className={styles.helpTextTall}>{dict?.heatTransferCoefficientDesc || "convection + surface radiation; can be calculated"}</span>
                <div className={styles.heatLossCalculator__field_group}>
                  <input
                    type="number"
                    value={h}
                    readOnly
                    className={`${styles.heatLossCalculator__field_input} ${styles['heatLossCalculator__field_input_readonly']}`}
                    step="0.001"
                  />
                  <button
                    onClick={handleCalculateH}
                    className={`${styles.heatLossCalculator__button} ${styles['heatLossCalculator__button_success']}`}
                  >
                    {dict?.calculateHBtn || "calculate h"}
                  </button>
                </div>
                <span className={styles.heatLossCalculator__field_unit}>W/m²K</span>
              </div>
              <LabeledField
                label={dict?.relativeHumidity || "relative humidity (30%-95%)"}
                helpText={dict?.relativeHumidityDesc || "for dew point calculation, %"}
                unit="%"
                value={relativeHumidity}
                onChange={setRelativeHumidity}
                styles={fieldStyles}
                inputProps={{ min: 30, max: 95, step: 0.1 }}
              />
            </div>
          </div>

          {/* Results Section */}
          <div className={styles.heatLossCalculator__section}>
            <h2 className={styles.heatLossCalculator__section_title}>{dict?.results || "Results"}</h2>
            <div className={styles.heatLossCalculator__grid}>
              <div className={styles.heatLossCalculator__field}>
                <label className={styles.heatLossCalculator__field_label}>{dict?.dewPoint || "dew point"}</label>
                <span className={styles.helpTextTall}>{dict?.dewPointDesc || "temperature at which condensation begins at current humidity"}</span>
                <input
                  type="text"
                  value={results.dewpointTemperature.toFixed(2)}
                  readOnly
                  className={`${styles.heatLossCalculator__fieldInput} ${styles.heatLossCalculator__fieldInput}--readonly`}
                />
                <span className={styles.heatLossCalculator__field_unit}>°C</span>
              </div>
              <div className={styles.heatLossCalculator__field}>
                <label className={styles.heatLossCalculator__field_label}>{dict?.minInsThickness || "minimum insulation thickness"}</label>
                <span className={styles.helpTextTall}>{dict?.minInsThicknessDesc || "calculated minimum thickness to prevent condensation"}</span>
                <input
                  type="text"
                  value={results.minimumThickness.toFixed(3)}
                  readOnly
                  className={`${styles.heatLossCalculator__fieldInput} ${styles.heatLossCalculator__fieldInput}--readonly`}
                />
                <span className={styles.heatLossCalculator__field_unit}>mm</span>
              </div>
            </div>
          </div>

          {/* Control Section */}
          <CalculatorControls
            onCalculate={calculateCondensation}
            onHelp={handleOpenHelp}
            onBack={handleBack}
            styles={styles}
            calculateLabel={dict?.calculateBtn || "Calculate"}
            helpLabel={dict?.helpBtn || "Help"}
            backLabel={dict?.backBtn || "← Back to Calculators"}
          />
        </div>
      </div>

      <CalculateHModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        ambientTemp={ambientTemp}
        mediumTemp={mediumTemp}
        tubeDiameter={tubeDiameter}
        material={material}
        modalParams={modalParams}
        setModalParams={setModalParams}
        onCalculate={calculateH}
        applySafetyFactor={applySafetyFactor}
        setApplySafetyFactor={setApplySafetyFactor}
        useAdvancedAlgorithm={useAdvancedAlgorithm}
        setUseAdvancedAlgorithm={setUseAdvancedAlgorithm}
        dict={dict}
      />

      <HelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
        dict={dict}
      />
    </div>
  );
};

export default CondensationCalculator;
