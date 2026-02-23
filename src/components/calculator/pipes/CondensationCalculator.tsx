"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCurrentLocale } from '@/hooks/useCurrentLocale';
import { href, ROUTES } from '@/lib/routes';
import styles from '../HeatLossCalculator.module.scss';

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

  
  const [relativeHumidity, setRelativeHumidity] = useState<number>(60.0);

  
  const [applySafetyFactor, setApplySafetyFactor] = useState<boolean>(false);
  
  const [useAdvancedAlgorithm, setUseAdvancedAlgorithm] = useState<boolean>(true);

  
  const [results, setResults] = useState<CondensationResults>({
    dewpointTemperature: 0,
    minimumThickness: 0,
    nominalThickness: '',
  });

  
  const [, setHasCalculated] = useState<boolean>(false);

  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalParams, setModalParams] = useState<CondensationModalParams>({
    calculationType: 'inside',
    orientation,
    emissivity,
  });

  
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);

  
  const calculateCondensation = (): void => {
    
    if (relativeHumidity <= 0 || relativeHumidity > 100 || h <= 0) {
      return;
    }

    try {
      
      const dewPoint = calculateDewPoint(ambientTemp, relativeHumidity);

      
      const minThickness = calculateMinimumThickness(
        tubeDiameter,
        ambientTemp,
        mediumTemp,
        dewPoint,
        material,
        h
      );

      
      const nominalThickness = Math.ceil(minThickness * 1.2);

      
      const selectedTube = ALL_TUBE_SIZES.find(tube => tube.mm === tubeDiameter);
      const availableThicknesses = selectedTube && selectedTube.wallThicknesses
        ? Object.keys(selectedTube.wallThicknesses).map(Number).sort((a, b) => a - b)
        : [6, 9, 13, 19, 25, 32];

      
      const recommendedThickness = availableThicknesses.find(t => t >= nominalThickness) || availableThicknesses[availableThicknesses.length - 1];

      
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
      
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Произошла ошибка при расчёте. Проверьте входные параметры.');
      }
    }
  };

  
  const handleCalculateH = (): void => {
    setModalParams({ calculationType: 'inside', orientation, emissivity });
    setIsModalOpen(true);
  };

  
  const handleOpenHelp = (): void => {
    setIsHelpModalOpen(true);
  };

  
  const calculateH = (): void => {
    const { calculationType, orientation: modalOrientation, emissivity: modalEmissivity } = modalParams;

    
    
    const typicalInsulationThickness = 9; 

    const h_total = computeH({
      ambientTemp,
      mediumTemp,
      tubeDiameter,
      orientation: modalOrientation,
      emissivity: modalEmissivity,
      calculationType,
      insulationThickness: typicalInsulationThickness, 
      useSimplifiedFormula: false,
      applySafetyFactor, 
      useAdvancedAlgorithm: false,
      useAdvancedSheetsAlgorithm: false,
      useKFlexAlgorithm: true, 
      forCondensation: true, 
    });

    setH(h_total);
    setOrientation(modalOrientation);
    setEmissivity(modalEmissivity);
    setIsModalOpen(false);
  };

  
  const handleBack = (): void => {
    
    useCalculatorStore.getState().reset();

    
    setRelativeHumidity(60.0);
    setResults({ dewpointTemperature: 0, minimumThickness: 0, nominalThickness: '' });
    setHasCalculated(false);
    setIsModalOpen(false);
    setIsHelpModalOpen(false);
    setModalParams({ calculationType: 'inside', orientation: 'horizontal', emissivity: 0.93 });

    router.push(href(locale, ROUTES.CALCULATOR));
  };

  
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
          {}
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

          {}
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

          {}
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
