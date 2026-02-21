"use client";
import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCurrentLocale } from '@/hooks/useCurrentLocale';
import { href, ROUTES } from '@/lib/routes';
import styles from '../HeatLossCalculator.module.scss';
import modalStyles from '../Modal.module.scss';
import { SHEET_MATERIALS } from '@/utils/constants';
import { computeSheetHeatLoss } from '@/utils/sheets';
import { computeH } from '@/hooks/useHeatTransferCoefficient';
import CalculateHModal from './CalculateHModal';
import LabeledField from '@/components/calculator/shared/LabeledField';
import LabeledSelect from '@/components/calculator/shared/LabeledSelect';
import CalculatorControls from '@/components/calculator/shared/CalculatorControls';
import { Dictionary } from '@/lib/i18n';

type CalculatorDict = NonNullable<Dictionary['calculator']>['calc'];

interface HeatLossCalculatorProps {
  dict?: CalculatorDict;
}

const SheetsHeatLossCalculator: React.FC<HeatLossCalculatorProps> = ({ dict }) => {
  const router = useRouter();
  const locale = useCurrentLocale();
  const [ambientTemp, setAmbientTemp] = useState<number>(25);
  const [mediumTemp, setMediumTemp] = useState<number>(-5);
  const [thickness, setThickness] = useState<number>(10);
  const [area, setArea] = useState<number>(1);
  const [material, setMaterial] = useState<string>('ROKAFLEX ST');
  const [h, setH] = useState<number>(9);
  const [cost, setCost] = useState<number>(0.5);

  // Параметр для отключения коэффициента безопасности 0.75
  const [applySafetyFactor] = useState<boolean>(false);
  // Использовать продвинутый алгоритм
  const [useAdvancedAlgorithm] = useState<boolean>(true);

  const [isHModalOpen, setHModalOpen] = useState<boolean>(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);
  const [modalParams, setModalParams] = useState<{ calculationType: 'inside' | 'outside'; orientation: 'horizontal' | 'vertical'; emissivity: number; sheetHeightM: number; cladding?: string; }>({
    calculationType: 'inside' as 'inside' | 'outside',
    orientation: 'horizontal' as 'horizontal' | 'vertical',
    emissivity: 0.93,
    sheetHeightM: 1.0,
    cladding: '',
  });

  const materialsList = useMemo(() => Object.keys(SHEET_MATERIALS), []);

  type SheetResults = {
    meanLambda: number;
    U: number;
    Q: number;
    decrease: number;
    costPerHour: number;
  };

  const [results, setResults] = useState<SheetResults | null>(null);

  type FieldStyles = {
    heatLossCalculator__field: string;
    heatLossCalculator__field_label: string;
    heatLossCalculator__field_input: string;
    heatLossCalculator__field_unit: string;
    helpTextTall?: string;
  };
  const fieldStyles = styles as unknown as FieldStyles;

  const calculateH = () => {
    const computed = computeH({
      ambientTemp,
      mediumTemp,
      tubeDiameter: modalParams.sheetHeightM * 1000, // using height as characteristic dimension
      orientation: modalParams.orientation,
      emissivity: modalParams.emissivity,
      calculationType: modalParams.calculationType,
      useSimplifiedFormula: false, // Не используем упрощённую формулу, используем продвинутый алгоритм для листов
      applySafetyFactor, // Применять ли коэффициент безопасности 0.75
      useAdvancedAlgorithm: false, // Не используем продвинутый алгоритм для труб
      useAdvancedSheetsAlgorithm: true, // Используем продвинутый алгоритм для листов с упрощённой формулой радиации
    });
    setH(Number(computed.toFixed(3)));
    setHModalOpen(false);
  };

  const handleCalculate = () => {
    const r = computeSheetHeatLoss(
      ambientTemp,
      mediumTemp,
      thickness,
      area,
      material,
      h,
      cost
    );
    setResults(r);
  };

  const handleBack = () => {
    // Reset all input parameters
    setAmbientTemp(25);
    setMediumTemp(-5);
    setThickness(10);
    setArea(1);
    setMaterial('ROKAFLEX ST');
    setH(9);
    setCost(0.5);

    // Reset results
    setResults(null);

    // Reset modal states
    setHModalOpen(false);
    setIsHelpModalOpen(false);
    setModalParams({
      calculationType: 'inside',
      orientation: 'horizontal',
      emissivity: 0.93,
      sheetHeightM: 1.0,
      cladding: '',
    });

    router.push(href(locale, ROUTES.CALCULATOR));
  };

  return (
    <div className={styles.heatLossCalculator}>
      <div className={styles.heatLossCalculator__container}>
        <div className={styles.heatLossCalculator__header}>
          <h1 className={styles.heatLossCalculator__header_title}>{dict?.sheetsHeatLossTitle || "Heat Loss Calculation for Sheets"}</h1>
        </div>

        <div className={styles.heatLossCalculator__content}>
          <div className={styles.heatLossCalculator__section}>
            <h2 className={styles.heatLossCalculator__section_title}>{dict?.parameters || "Parameters"}</h2>

            <div className={styles.heatLossCalculator__fields}>
              <LabeledField label={dict?.ambientTemp || "ambient temperature"} helpText={dict?.ambientTempDesc || "air around insulation"} unit="°C" value={ambientTemp} onChange={setAmbientTemp} styles={fieldStyles} />
              <LabeledField label={dict?.mediumTemp || "medium temperature"} helpText={dict?.mediumTempSheetDesc || "surface/medium temperature"} unit="°C" value={mediumTemp} onChange={setMediumTemp} styles={fieldStyles} />
              <LabeledField label={dict?.insulationThickness || "insulation thickness"} helpText={dict?.insulationThicknessDesc || "thermal insulation layer thickness"} unit="mm" value={thickness} onChange={setThickness} styles={fieldStyles} inputProps={{ min: 1, step: 1 }} />
              <LabeledField label={dict?.surfaceArea || "surface area"} helpText={dict?.surfaceAreaDesc || "calculated heat exchange area"} unit="m²" value={area} onChange={setArea} styles={fieldStyles} inputProps={{ min: 0.01, step: 0.01 }} />
              <LabeledSelect label={dict?.insulationMaterial || "insulation material"} helpText={dict?.insulationMaterialDesc || "sets thermal conductivity λ(T)"} value={material} onChange={(v) => setMaterial(String(v))} options={materialsList.map(m => ({ value: m, label: m }))} styles={fieldStyles} />
              <div className={styles.heatLossCalculator__field}>
                <label className={styles.heatLossCalculator__field_label}>{dict?.hCoefficient || "heat transfer coefficient h"}</label>
                <span className={styles.helpText} style={{ height: 'auto' }}>{dict?.hCoefficientDesc || "convection + surface radiation; can be calculated"}</span>
                <div className={styles.heatLossCalculator__field_group}>
                  <input
                    type="number"
                    value={h}
                    readOnly
                    className={`${styles.heatLossCalculator__field_input} ${styles['heatLossCalculator__field_input_readonly']}`}
                    step="0.001"
                  />
                  <button
                    onClick={() => setHModalOpen(true)}
                    className={`${styles.heatLossCalculator__button} ${styles['heatLossCalculator__button_success']}`}
                  >
                    {dict?.calcHBtn || "calculate h"}
                  </button>
                </div>
                <span className={styles.heatLossCalculator__field_unit} style={{ height: 'auto' }}>W/m²K</span>
              </div>
              <LabeledField label={dict?.energyCost || "cost per kWh"} helpText={dict?.energyCostDesc || "tariff, currency/kWh"} unit="currency/kWh" value={cost} onChange={setCost} styles={fieldStyles} inputProps={{ min: 0, step: 0.01 }} />
            </div>

          </div>

          {results && (
            <div className={styles.heatLossCalculator__section}>
              <h2 className={styles.heatLossCalculator__section_title}>{dict?.results || "Calculation Results"}</h2>
              <div className={styles.heatLossCalculator__grid}>
                <div className={styles.heatLossCalculator__field}>
                  <label className={styles.heatLossCalculator__field_label}>{dict?.meanLambda || "mean thermal conductivity λ"}</label>
                  <span className={styles.helpText} style={{ height: 'auto' }}>{dict?.meanLambdaDesc || "thermal conductivity of insulation material at mean temperature"}</span>
                  <input
                    type="text"
                    value={results.meanLambda.toFixed(4)}
                    readOnly
                    className={`${styles.heatLossCalculator__fieldInput} ${styles.heatLossCalculator__fieldInput}--readonly`}
                  />
                  <span className={styles.heatLossCalculator__field_unit} style={{ height: 'auto' }}>W/m·K</span>
                </div>
                <div className={styles.heatLossCalculator__field}>
                  <label className={styles.heatLossCalculator__field_label}>{dict?.thermalTransmittance || "insulation thermal transmittance"}</label>
                  <span className={styles.helpText} style={{ height: 'auto' }}>{dict?.thermalTransmittanceDesc || "overall heat transfer coefficient through insulation"}</span>
                  <input
                    type="text"
                    value={results.U.toFixed(4)}
                    readOnly
                    className={`${styles.heatLossCalculator__fieldInput} ${styles.heatLossCalculator__fieldInput}--readonly`}
                  />
                  <span className={styles.heatLossCalculator__field_unit} style={{ height: 'auto' }}>W/m²K</span>
                </div>
                <div className={styles.heatLossCalculator__field}>
                  <label className={styles.heatLossCalculator__field_label}>{dict?.heatLoss || "heat loss"}</label>
                  <span className={styles.helpText} style={{ height: 'auto' }}>{dict?.heatLossSheetDesc || "heat loss through sheet surface"}</span>
                  <input
                    type="text"
                    value={results.Q.toFixed(2)}
                    readOnly
                    className={`${styles.heatLossCalculator__fieldInput} ${styles.heatLossCalculator__fieldInput}--readonly`}
                  />
                  <span className={styles.heatLossCalculator__field_unit} style={{ height: 'auto' }}>W</span>
                </div>
                <div className={styles.heatLossCalculator__field}>
                  <label className={styles.heatLossCalculator__field_label}>{dict?.heatLossReduction || "heat loss reduction"}</label>
                  <span className={styles.helpText} style={{ height: 'auto' }}>{dict?.heatLossReductionSheetDesc || "efficiency relative to uninsulated surface"}</span>
                  <input
                    type="text"
                    value={results.decrease.toFixed(1)}
                    readOnly
                    className={`${styles.heatLossCalculator__fieldInput} ${styles.heatLossCalculator__fieldInput}--readonly`}
                  />
                  <span className={styles.heatLossCalculator__field_unit} style={{ height: 'auto' }}>%</span>
                </div>
                <div className={styles.heatLossCalculator__field}>
                  <label className={styles.heatLossCalculator__field_label}>{dict?.costPerHour || "cost per hour"}</label>
                  <span className={styles.helpText} style={{ height: 'auto' }}>{dict?.costPerHourDesc || "costs to compensate for losses at given tariff"}</span>
                  <input
                    type="text"
                    value={results.costPerHour.toFixed(3)}
                    readOnly
                    className={`${styles.heatLossCalculator__fieldInput} ${styles.heatLossCalculator__fieldInput}--readonly`}
                  />
                  <span className={styles.heatLossCalculator__field_unit} style={{ height: 'auto' }}>J</span>
                </div>
              </div>
            </div>
          )}

          <CalculatorControls
            onCalculate={handleCalculate}
            onHelp={() => setIsHelpModalOpen(true)}
            onBack={handleBack}
            styles={styles}
            calculateLabel={dict?.calculateBtn || "Calculate"}
            helpLabel={dict?.helpBtn || "Help"}
            backLabel={dict?.backBtn || "← Back to Calculators"}
          />
        </div>
      </div>

      <CalculateHModal
        isOpen={isHModalOpen}
        onClose={() => setHModalOpen(false)}
        ambientTemp={ambientTemp}
        mediumTemp={mediumTemp}
        material={material}
        modalParams={modalParams}
        setModalParams={setModalParams}
        onCalculate={calculateH}
        applySafetyFactor={applySafetyFactor}
        setApplySafetyFactor={undefined}
        useAdvancedAlgorithm={useAdvancedAlgorithm}
        setUseAdvancedAlgorithm={undefined}
        dict={dict}
      />

      {isHelpModalOpen && (
        <div className={modalStyles.modal}>
          <div className={modalStyles.modal__container}>
            <div className={modalStyles.modal__header}>
              <h1 className={modalStyles.modal__header_title}>{dict?.helpModalHeatLoss?.title || "Help"}</h1>
            </div>

            <div className={modalStyles.modal__content}>
              <div className={modalStyles.modal__section}>
                <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
                  {dict?.helpModalHeatLoss?.p1 || "The calculator calculates heat losses of insulated sheets based on physical laws of heat transfer."}
                </p>
                <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
                  {dict?.helpModalHeatLoss?.p2 || "Enter system parameters: temperatures, sheet dimensions, insulation thickness and material."}
                </p>
                <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
                  {dict?.helpModalHeatLoss?.p3 || "The heat transfer coefficient h is calculated automatically taking into account convective and radiative heat transfer. All calculations are performed according to ISO 12241 standard for thermal insulation."}
                </p>
                <p style={{ lineHeight: '1.6' }}>
                  {dict?.helpModalHeatLoss?.p4 || "The result shows heat losses, their reduction compared to an uninsulated surface, and economic effect."}
                </p>
                <div style={{ marginTop: '20px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>{dict?.helpModalHeatLoss?.fieldsTitle || "Field Explanations"}</h3>
                  <ul style={{ paddingLeft: '18px', lineHeight: 1.6, margin: 0 }}>
                    <li><strong dangerouslySetInnerHTML={{ __html: dict?.helpModalHeatLoss?.fAmbient || "Ambient temperature — air outside the insulation, °C." }} /></li>
                    <li><strong dangerouslySetInnerHTML={{ __html: dict?.helpModalHeatLoss?.fMedium || "Medium temperature — surface/medium temperature, °C." }} /></li>
                    <li><strong dangerouslySetInnerHTML={{ __html: dict?.helpModalHeatLoss?.fThickness || "Insulation thickness — selected thermal insulation layer thickness, mm; calculation is performed with this value." }} /></li>
                    <li><strong dangerouslySetInnerHTML={{ __html: dict?.surfaceArea ? `<strong>${dict?.surfaceArea}</strong> — ${dict?.surfaceAreaDesc}, m².` : "<strong>Surface area</strong> — calculated heat exchange area, m²." }} /></li>
                    <li><strong dangerouslySetInnerHTML={{ __html: dict?.helpModalHeatLoss?.fMaterial || "Thermal insulation material — sets thermal conductivity λ(T) for calculation." }} /></li>
                    <li><strong dangerouslySetInnerHTML={{ __html: dict?.helpModalHeatLoss?.fHeatTransfer || "Heat transfer coefficient h — takes into account convection and radiation from the surface; can be calculated using the \"calculate h\" button. Calculations are performed according to ISO 12241 standard." }} /></li>
                    <li><strong dangerouslySetInnerHTML={{ __html: dict?.helpModalHeatLoss?.fEnergyCost || "Energy cost — tariff, J/kWh, for cost estimation." }} /></li>
                    <li><strong dangerouslySetInnerHTML={{ __html: dict?.helpModalHeatLoss?.fCalcType || "Calculation Type — select \"inside\" to calculate heat released outward, or \"outside\" to calculate heat released inward." }} /></li>
                    <li><strong dangerouslySetInnerHTML={{ __html: dict?.helpModalHeatLoss?.fOrientation || "Orientation — sheet orientation: \"vertical\" for vertical sheets, \"horizontal\" for horizontal sheets. Affects convective heat transfer." }} /></li>
                    <li><strong dangerouslySetInnerHTML={{ __html: dict?.helpModalHeatLoss?.fEmissivity || "Emissivity coefficient — surface emissivity (0…1), typically 0.93 for most insulation materials. Affects radiative heat transfer." }} /></li>
                  </ul>
                  <p style={{ marginTop: '12px', lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: dict?.helpModalHeatLoss?.results || "<strong>Results:</strong> heat losses (W), reduction (%), cost per hour (J), insulation thermal transmittance (W/(m²·K))." }} />
                  <p style={{ marginTop: '8px', lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: dict?.helpModalHeatLoss?.units || "<strong>Units:</strong> mm — millimeters, m — meters, m² — square meters, W — watts, W/(m²·K) — watts per m²·K, J — joules." }} />
                </div>
              </div>

              <div className={modalStyles.modal__controls}>
                <button
                  onClick={() => setIsHelpModalOpen(false)}
                  className={`${modalStyles.modal__button} ${modalStyles['modal__button_primary']}`}
                >
                  {dict?.helpModalHeatLoss?.closeBtn || "Close"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SheetsHeatLossCalculator;
