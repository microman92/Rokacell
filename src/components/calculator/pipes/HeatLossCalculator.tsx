"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCurrentLocale } from '@/hooks/useCurrentLocale';
import { href, ROUTES } from '@/lib/routes';
import styles from '../HeatLossCalculator.module.scss';
import modalStyles from '../Modal.module.scss';
import type { CalculationParams, CalculationResults, ModalParams } from '@/types/calculator';
import CalculatorControls from '@/components/calculator/shared/CalculatorControls';
import { useCalculatorStore } from '@/stores/calculatorStore';
import { ALL_TUBE_SIZES, MATERIALS, formatTubeName, type AnyMaterialKey } from '@/utils/constants';
import { interpolateLambda } from '@/utils/thermal';
import {
  calculateHeatLosses,
  calculateEconomicData,
  calculateRokaflexDimension,
  getAvailableThicknesses
} from '@/utils/heatLoss';
import { computeH } from '@/hooks/useHeatTransferCoefficient';
import { getNumberValue } from '@/utils/formUtils';
import { Dictionary } from '@/lib/i18n';

type CalculatorDict = NonNullable<Dictionary['calculator']>['calc'];

interface HeatLossCalculatorProps {
  dict?: CalculatorDict;
}

const HeatLossCalculator: React.FC<HeatLossCalculatorProps> = ({ dict }) => {
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


  const [localParams, setLocalParams] = useState<Pick<CalculationParams, 'insulationThickness' | 'pipeWallThickness' | 'pipeLength' | 'costPerKWh'>>({
    insulationThickness: 9,
    pipeWallThickness: 0,
    pipeLength: 1.0,
    costPerKWh: 0.5,
  });


  const [applySafetyFactor] = useState<boolean>(false);


  const [results, setResults] = useState<CalculationResults>({
    meanLambda: 0,
    thermalTransmittance: 0,
    heatLoss: 0,
    decrease: 0,
    costPerHour: 0,
    rokaflexDimension: 0,
    recommendedThicknessMm: undefined,
  });


  const [hasCalculated, setHasCalculated] = useState<boolean>(false);


  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalParams, setModalParams] = useState<ModalParams>({
    calculationType: 'inside',
    orientation,
    emissivity,
  });


  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);


  const calculateHeatLoss = (): void => {
    const { insulationThickness, pipeLength, costPerKWh } = localParams;


    if (insulationThickness <= 0 || pipeLength <= 0 || h <= 0) {
      return;
    }


    const usedThickness = insulationThickness;


    const rOuterPipe = tubeDiameter / 2 / 1000;
    const rInnerPipe = Math.max(1e-6, rOuterPipe - (localParams.pipeWallThickness ?? 0) / 1000);
    const ro = rOuterPipe + usedThickness / 1000;




    const T_lambda = ambientTemp + 0.533 * (mediumTemp - ambientTemp) + 21;
    const lambda = interpolateLambda(T_lambda, material);




    const lambdaPipe = 50;




    const pipeWallThicknessActual = localParams.pipeWallThickness ?? 0;
    let R_pipe: number;
    if (pipeWallThicknessActual > 0 && rInnerPipe < rOuterPipe) {


      R_pipe = Math.log(rOuterPipe / rInnerPipe) / (2 * Math.PI * lambdaPipe);
    } else {

      R_pipe = 0;
    }



    const R_cond = Math.log(ro / rOuterPipe) / (2 * Math.PI * lambda);



    const R_conv = 1 / (h * 2 * Math.PI * ro);


    const R_total = R_pipe + R_cond + R_conv;




    let hUninsulated = computeH({
      ambientTemp,
      mediumTemp,
      tubeDiameter,
      orientation,
      emissivity,
      calculationType: 'inside',
      insulationThickness: 0,
      useSimplifiedFormula: false,
      applySafetyFactor,
      useAdvancedAlgorithm: false,
      useAdvancedSheetsAlgorithm: false,
      useKFlexAlgorithm: true,
    });




    if (tubeDiameter > 0) {
      const diameterRatio = 25 / tubeDiameter;
      const boostPower = 0.2;
      const boostFactor = Math.pow(diameterRatio, boostPower);
      hUninsulated *= boostFactor;
    }


    const R_total_uninsulated = R_pipe + 1 / (hUninsulated * 2 * Math.PI * rOuterPipe);




    const deltaT = mediumTemp - ambientTemp;
    const { heatLoss: heatLossPerMeter, decrease } = calculateHeatLosses(deltaT, R_total, R_total_uninsulated);



    const heatLoss = heatLossPerMeter * pipeLength;


    const costPerHour = calculateEconomicData(heatLossPerMeter, pipeLength, costPerKWh);


    const rokaflexDimension = calculateRokaflexDimension(tubeDiameter, usedThickness);








    // Prevent division by zero if deltaT is 0
    const thermalTransmittance = 1 / R_total;
    setResults({
      meanLambda: lambda,
      thermalTransmittance,
      heatLoss,
      decrease,
      costPerHour,
      rokaflexDimension,
      recommendedThicknessMm: undefined,
    });
    setHasCalculated(true);
  };


  const handleCalculateH = (): void => {
    setModalParams({ calculationType: 'inside', orientation, emissivity });
    setIsModalOpen(true);
  };


  const handleOpenHelp = (): void => {
    setIsHelpModalOpen(true);
  };


  const handleBack = (): void => {

    useCalculatorStore.getState().reset();


    setLocalParams({
      insulationThickness: 9,
      pipeWallThickness: 0,
      pipeLength: 1.0,
      costPerKWh: 0.5,
    });


    setResults({
      meanLambda: 0,
      thermalTransmittance: 0,
      heatLoss: 0,
      decrease: 0,
      costPerHour: 0,
      rokaflexDimension: 0,
      recommendedThicknessMm: undefined,
    });
    setHasCalculated(false);


    setIsModalOpen(false);
    setIsHelpModalOpen(false);
    setModalParams({
      calculationType: 'inside',
      orientation: 'horizontal',
      emissivity: 0.93,
    });

    router.push(href(locale, ROUTES.CALCULATOR));
  };


  const calculateH = (): void => {
    const { orientation: modalOrientation, emissivity: modalEmissivity, calculationType: modalCalculationType } = modalParams;

    const h_total = computeH({
      ambientTemp,
      mediumTemp,
      tubeDiameter,
      orientation: modalOrientation,
      emissivity: modalEmissivity,
      calculationType: modalCalculationType,
      insulationThickness: localParams.insulationThickness,
      useSimplifiedFormula: false,
      applySafetyFactor,
      useAdvancedAlgorithm: false,
      useAdvancedSheetsAlgorithm: false,
      useKFlexAlgorithm: true,
    });

    setH(h_total);
    setOrientation(modalOrientation);
    setEmissivity(modalEmissivity);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.heatLossCalculator}>
      <div className={styles.heatLossCalculator__container}>
        <div className={styles.heatLossCalculator__header}>
          <h1 className={styles.heatLossCalculator__header_title}>{dict?.pipesHeatLossTitle || "Heat Loss Calculation for Pipes"}</h1>
        </div>

        <div className={styles.heatLossCalculator__content}>
          { }
          <div className={styles.heatLossCalculator__section}>
            <h2 className={styles.heatLossCalculator__section_title}>{dict?.parameters || "Parameters"}</h2>
            <div className={styles.heatLossCalculator__grid}>
              <div className={styles.heatLossCalculator__field}>
                <label className={styles.heatLossCalculator__field_label}>{dict?.ambientTemp || "ambient temperature"}</label>
                <span className={styles.helpText}>{dict?.ambientTempDesc || "air around insulation, °C"}</span>
                <input
                  type="number"
                  value={ambientTemp}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmbientTemp(getNumberValue(e))}
                  className={styles.heatLossCalculator__field_input}
                />
                <span className={styles.heatLossCalculator__field_unit}>°C</span>
              </div>
              <div className={styles.heatLossCalculator__field}>
                <label className={styles.heatLossCalculator__field_label}>{dict?.mediumTemp || "medium temperature"}</label>
                <span className={styles.helpText}>{dict?.mediumTempDesc || "heat carrier inside pipe, °C"}</span>
                <input
                  type="number"
                  value={mediumTemp}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMediumTemp(getNumberValue(e))}
                  className={styles.heatLossCalculator__field_input}
                />
                <span className={styles.heatLossCalculator__field_unit}>°C</span>
              </div>
              <div className={styles.heatLossCalculator__field}>
                <label className={styles.heatLossCalculator__field_label}>{dict?.pipeDiameter || "pipe diameter"}</label>
                <span className={styles.helpText}>{dict?.pipeDiameterDesc || "outer diameter, mm (Cu/St equivalents shown)"}</span>
                <select
                  value={tubeDiameter}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTubeDiameter(+e.target.value)}
                  className={styles.heatLossCalculator__field_input}
                >
                  {ALL_TUBE_SIZES.map((size) => (
                    <option key={`${size.type}-${size.mm}`} value={size.mm}>
                      {formatTubeName(size)}
                    </option>
                  ))}
                </select>
                <span className={styles.heatLossCalculator__field_unit}>mm</span>
              </div>
              <div className={styles.heatLossCalculator__field}>
                <label className={styles.heatLossCalculator__field_label}>{dict?.insulationThickness || "insulation thickness"}</label>
                <span className={styles.helpText}>{dict?.insulationThicknessDesc || "thermal insulation layer thickness, mm"}</span>
                <select
                  value={localParams.insulationThickness}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setLocalParams({ ...localParams, insulationThickness: +e.target.value })}
                  className={styles.heatLossCalculator__field_input}
                >
                  {getAvailableThicknesses(tubeDiameter).map((thickness) => (
                    <option key={thickness} value={thickness}>{thickness}</option>
                  ))}
                </select>
                <span className={styles.heatLossCalculator__field_unit}>mm</span>
              </div>
              <div className={styles.heatLossCalculator__field}>
                <label className={styles.heatLossCalculator__field_label}>{dict?.pipeLength || "pipe length"}</label>
                <span className={styles.helpText}>{dict?.pipeLengthDesc || "calculation section, m"}</span>
                <input
                  type="number"
                  value={localParams.pipeLength}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocalParams({ ...localParams, pipeLength: getNumberValue(e) })}
                  className={styles.heatLossCalculator__field_input}
                  min="0.1"
                  step="0.1"
                />
                <span className={styles.heatLossCalculator__field_unit}>m</span>
              </div>
              <div className={styles.heatLossCalculator__field}>
                <label className={styles.heatLossCalculator__field_label}>{dict?.insulationMaterial || "thermal insulation material"}</label>
                <span className={styles.helpText}>{dict?.insulationMaterialDesc || "sets thermal conductivity λ(T)"}</span>
                <select
                  value={material}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setMaterial(e.target.value as AnyMaterialKey)}
                  className={styles.heatLossCalculator__field_input}
                >
                  {Object.keys(MATERIALS).map((mat) => (
                    <option key={mat} value={mat}>{mat}</option>
                  ))}
                </select>
              </div>
              <div className={styles.heatLossCalculator__field}>
                <label className={styles.heatLossCalculator__field_label}>{dict?.hCoefficient || "heat transfer coefficient h"}</label>
                <span className={styles.helpText}>{dict?.hCoefficientDesc || "convection + surface radiation; can be calculated"}</span>
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
                    {dict?.calcHBtn || "calculate h"}
                  </button>
                </div>
                <span className={styles.heatLossCalculator__field_unit}>W/(m²·K)</span>
              </div>
              <div className={styles.heatLossCalculator__field}>
                <label className={styles.heatLossCalculator__field_label}>{dict?.energyCost || "energy cost"}</label>
                <span className={styles.helpText}>{dict?.energyCostDesc || "tariff, currency/kWh"}</span>
                <input
                  type="number"
                  value={localParams.costPerKWh}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocalParams({ ...localParams, costPerKWh: getNumberValue(e) })}
                  className={styles.heatLossCalculator__field_input}
                  min="0"
                  step="0.1"
                />
                <span className={styles.heatLossCalculator__field_unit}>currency/kWh</span>
              </div>
            </div>
          </div>

          { }
          {hasCalculated && (
            <div className={styles.heatLossCalculator__section}>
              <h2 className={styles.heatLossCalculator__section_title}>{dict?.results || "Calculation Results"}</h2>
              <div className={styles.heatLossCalculator__grid}>
                <div className={styles.heatLossCalculator__field}>
                  <label className={styles.heatLossCalculator__field_label}>{dict?.meanLambda || "mean thermal conductivity λ"}</label>
                  <span className={styles.helpText}>{dict?.meanLambdaDesc || "thermal conductivity of insulation material at mean temperature"}</span>
                  <input
                    type="text"
                    value={results.meanLambda.toFixed(4)}
                    readOnly
                    className={`${styles.heatLossCalculator__fieldInput} ${styles.heatLossCalculator__fieldInput}--readonly`}
                  />
                  <span className={styles.heatLossCalculator__field_unit}>W/m·K</span>
                </div>
                <div className={styles.heatLossCalculator__field}>
                  <label className={styles.heatLossCalculator__field_label}>{dict?.thermalTransmittance || "insulation thermal transmittance"}</label>
                  <span className={styles.helpText}>{dict?.thermalTransmittanceDesc || "overall heat transfer coefficient through insulation"}</span>
                  <input
                    type="text"
                    value={results.thermalTransmittance.toFixed(4)}
                    readOnly
                    className={`${styles.heatLossCalculator__fieldInput} ${styles.heatLossCalculator__fieldInput}--readonly`}
                  />
                  <span className={styles.heatLossCalculator__field_unit}>W/(m·K)</span>
                </div>
                <div className={styles.heatLossCalculator__field}>
                  <label className={styles.heatLossCalculator__field_label}>{dict?.heatLoss || "heat loss"}</label>
                  <span className={styles.helpText}>{dict?.heatLossDesc || "heat loss depending on pipe length"}</span>
                  <input
                    type="text"
                    value={results.heatLoss.toFixed(2)}
                    readOnly
                    className={`${styles.heatLossCalculator__fieldInput} ${styles.heatLossCalculator__fieldInput}--readonly`}
                  />
                  <span className={styles.heatLossCalculator__field_unit}>W</span>
                </div>
                <div className={styles.heatLossCalculator__field}>
                  <label className={styles.heatLossCalculator__field_label}>{dict?.heatLossReduction || "heat loss reduction"}</label>
                  <span className={styles.helpText}>{dict?.heatLossReductionDesc || "insulation efficiency relative to uninsulated pipe"}</span>
                  <input
                    type="text"
                    value={results.decrease.toFixed(1)}
                    readOnly
                    className={`${styles.heatLossCalculator__fieldInput} ${styles.heatLossCalculator__fieldInput}--readonly`}
                  />
                  <span className={styles.heatLossCalculator__field_unit}>%</span>
                </div>
                <div className={styles.heatLossCalculator__field}>
                  <label className={styles.heatLossCalculator__field_label}>{dict?.costPerHour || "cost per hour"}</label>
                  <span className={styles.helpText}>{dict?.costPerHourDesc || "costs to compensate for losses at given tariff"}</span>
                  <input
                    type="text"
                    value={results.costPerHour.toFixed(3)}
                    readOnly
                    className={`${styles.heatLossCalculator__fieldInput} ${styles.heatLossCalculator__fieldInput}--readonly`}
                  />
                  <span className={styles.heatLossCalculator__field_unit}>J</span>
                </div>
              </div>
            </div>
          )}

          { }
          <CalculatorControls
            onCalculate={calculateHeatLoss}
            onHelp={handleOpenHelp}
            onBack={handleBack}
            styles={styles}
            calculateLabel={dict?.calculateBtn || "Calculate"}
            helpLabel={dict?.helpBtn || "Help"}
            backLabel={dict?.backBtn || "← Back to Calculators"}
          />
        </div>
      </div>

      { }
      {isModalOpen && (
        <div className={modalStyles.modal}>
          <div className={modalStyles.modal__container}>
            <div className={modalStyles.modal__header}>
              <h1 className={modalStyles.modal__header_title}>{dict?.hModal?.title || "Calculation of Heat Transfer Coefficient h"}</h1>
            </div>

            <div className={modalStyles.modal__content}>
              { }
              <div className={modalStyles.modal__section}>
                <h2 className={modalStyles.modal__section_title}>{dict?.hModal?.calcType || "Calculation Type"}</h2>
                <div className={modalStyles.modal__grid}>
                  <div className={modalStyles.modal__field}>
                    <label className={modalStyles.modal__field_label}>{dict?.hModal?.calcType || "Calculation Type"}</label>
                    <div className={modalStyles.modal__field_radioGroup}>
                      <label className={modalStyles.modal__field_radio}>
                        <input
                          type="radio"
                          name="calculationType"
                          value="inside"
                          checked={modalParams.calculationType === 'inside'}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setModalParams({ ...modalParams, calculationType: e.target.value as 'inside' | 'outside' })}
                          className={modalStyles.modal__field_radio_input}
                        />
                        <span className={modalStyles.modal__field_radio_label}>{dict?.hModal?.inside || "Inside"}</span>
                      </label>
                      <label className={modalStyles.modal__field_radio}>
                        <input
                          type="radio"
                          name="calculationType"
                          value="outside"
                          checked={modalParams.calculationType === 'outside'}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setModalParams({ ...modalParams, calculationType: e.target.value as 'inside' | 'outside' })}
                          className={modalStyles.modal__field_radio_input}
                        />
                        <span className={modalStyles.modal__field_radio_label}>{dict?.hModal?.outside || "Outside"}</span>
                      </label>
                    </div>
                    <span className={modalStyles.helpTextTop}>{dict?.hModal?.calcTypeDesc || "what we calculate: heat released outward or inward"}</span>
                  </div>
                  <div className={modalStyles.modal__field}>
                    <label className={modalStyles.modal__field_label}>{dict?.hModal?.orientation || "Orientation"}</label>
                    <div className={modalStyles.modal__field_radioGroup}>
                      <label className={modalStyles.modal__field_radio}>
                        <input
                          type="radio"
                          name="orientation"
                          value="vertical"
                          checked={modalParams.orientation === 'vertical'}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setModalParams({ ...modalParams, orientation: e.target.value as 'horizontal' | 'vertical' })}
                          className={modalStyles.modal__field_radio_input}
                        />
                        <span className={modalStyles.modal__field_radio_label}>{dict?.hModal?.vertical || "Vertical"}</span>
                      </label>
                      <label className={modalStyles.modal__field_radio}>
                        <input
                          type="radio"
                          name="orientation"
                          value="horizontal"
                          checked={modalParams.orientation === 'horizontal'}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setModalParams({ ...modalParams, orientation: e.target.value as 'horizontal' | 'vertical' })}
                          className={modalStyles.modal__field_radio_input}
                        />
                        <span className={modalStyles.modal__field_radio_label}>{dict?.hModal?.horizontal || "Horizontal"}</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              { }
              <div className={modalStyles.modal__section}>
                <h2 className={modalStyles.modal__section_title}>{dict?.parameters || "Parameters"}</h2>
                <div className={modalStyles.modal__grid}>
                  <div className={modalStyles.modal__field}>
                    <label className={modalStyles.modal__field_label}>{dict?.ambientTemp || "ambient temperature"}</label>
                    <span className={modalStyles.helpText}>{dict?.ambientTempDesc || "air around insulation, °C"}</span>
                    <input
                      type="number"
                      value={ambientTemp}
                      readOnly
                      className={`${modalStyles.modal__field_input} ${modalStyles['modal__field_input_readonly']}`}
                    />
                    <span className={modalStyles.modal__field_unit}>°C</span>
                  </div>
                  <div className={modalStyles.modal__field}>
                    <label className={modalStyles.modal__field_label}>{dict?.mediumTemp || "medium temperature"}</label>
                    <span className={modalStyles.helpText}>{dict?.mediumTempDesc || "heat carrier inside pipe, °C"}</span>
                    <input
                      type="number"
                      value={mediumTemp}
                      readOnly
                      className={`${modalStyles.modal__field_input} ${modalStyles['modal__field_input_readonly']}`}
                    />
                    <span className={modalStyles.modal__field_unit}>°C</span>
                  </div>
                  <div className={modalStyles.modal__field}>
                    <label className={modalStyles.modal__field_label}>{dict?.pipeDiameter || "pipe diameter"}</label>
                    <span className={modalStyles.helpText}>{dict?.pipeDiameterDescH || "outer diameter, mm"}</span>
                    <input
                      type="number"
                      value={tubeDiameter}
                      readOnly
                      className={`${modalStyles.modal__field_input} ${modalStyles['modal__field_input_readonly']}`}
                    />
                    <span className={modalStyles.modal__field_unit}>mm</span>
                  </div>
                  <div className={modalStyles.modal__field}>
                    <label className={modalStyles.modal__field_label}>{dict?.insulationMaterial || "insulation material"}</label>
                    <span className={modalStyles.helpText}>{dict?.insulationMaterialDesc || "sets thermal conductivity λ(T)"}</span>
                    <input
                      type="text"
                      value={material}
                      readOnly
                      className={`${modalStyles.modal__field_input} ${modalStyles['modal__field_input_readonly']}`}
                    />
                  </div>
                </div>
              </div>

              { }
              <div className={modalStyles.modal__section}>
                <h2 className={modalStyles.modal__section_title}>{dict?.hModal?.additionalSettings || "Additional Settings"}</h2>
                <div className={modalStyles.modal__grid}>
                  <div className={modalStyles.modal__field}>
                    <label className={modalStyles.modal__field_label}>{dict?.hModal?.emissivity || "emissivity coefficient (see help)"}</label>
                    <input
                      type="number"
                      value={modalParams.emissivity}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setModalParams({ ...modalParams, emissivity: getNumberValue(e) })}
                      className={modalStyles.modal__field_input}
                      min="0"
                      max="1"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>

              { }
              <div className={modalStyles.modal__controls}>
                <button
                  onClick={calculateH}
                  className={`${modalStyles.modal__button} ${modalStyles['modal__button_primary']}`}
                >
                  {dict?.hModal?.continueBtn || "Continue"}
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className={`${modalStyles.modal__button} ${modalStyles['modal__button_secondary']}`}
                >
                  {dict?.hModal?.cancelBtn || "Cancel"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      { }
      {isHelpModalOpen && (
        <div className={modalStyles.modal}>
          <div className={modalStyles.modal__container}>
            <div className={modalStyles.modal__header}>
              <h1 className={modalStyles.modal__header_title}>{dict?.helpModalHeatLoss?.title || "Help"}</h1>
            </div>

            <div className={modalStyles.modal__content}>
              <div className={modalStyles.modal__section}>
                <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
                  {dict?.helpModalHeatLoss?.p1 || "The calculator calculates heat losses of insulated pipes based on physical laws of heat transfer."}
                </p>
                <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
                  {dict?.helpModalHeatLoss?.p2 || "Enter system parameters: temperatures, pipe dimensions, insulation thickness and material."}
                </p>
                <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
                  {dict?.helpModalHeatLoss?.p3 || "The heat transfer coefficient h is calculated automatically taking into account convective and radiative heat transfer. All calculations are performed according to ISO 12241 standard for thermal insulation."}
                </p>
                <p style={{ lineHeight: '1.6' }}>
                  {dict?.helpModalHeatLoss?.p4 || "The result shows heat losses, their reduction compared to an uninsulated pipe, and economic effect."}
                </p>
                <div style={{ marginTop: '20px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>{dict?.helpModalHeatLoss?.fieldsTitle || "Field Explanations"}</h3>
                  <ul style={{ paddingLeft: '18px', lineHeight: 1.6, margin: 0 }}>
                    <li><strong dangerouslySetInnerHTML={{ __html: dict?.helpModalHeatLoss?.fAmbient || "Ambient temperature — air outside the insulation, °C." }} /></li>
                    <li><strong dangerouslySetInnerHTML={{ __html: dict?.helpModalHeatLoss?.fMedium || "Medium temperature — heat carrier temperature inside the pipe, °C." }} /></li>
                    <li><strong dangerouslySetInnerHTML={{ __html: dict?.helpModalHeatLoss?.fDiameter || "Pipe diameter — outer diameter, mm. The list shows equivalents: Cu — copper, St — steel." }} /></li>
                    <li><strong dangerouslySetInnerHTML={{ __html: dict?.helpModalHeatLoss?.fThickness || "Insulation thickness — selected thermal insulation layer thickness, mm; calculation is performed with this value." }} /></li>
                    <li><strong dangerouslySetInnerHTML={{ __html: dict?.helpModalHeatLoss?.fWall || "Pipe wall thickness — pipe metal thickness, mm; affects heat transfer through the wall." }} /></li>
                    <li><strong dangerouslySetInnerHTML={{ __html: dict?.helpModalHeatLoss?.fLength || "Pipe length — calculation section, m; affects total losses and cost per hour." }} /></li>
                    <li><strong dangerouslySetInnerHTML={{ __html: dict?.helpModalHeatLoss?.fMaterial || "Thermal insulation material — sets thermal conductivity λ(T) for calculation." }} /></li>
                    <li><strong dangerouslySetInnerHTML={{ __html: dict?.helpModalHeatLoss?.fHeatTransfer || "Heat transfer coefficient h — takes into account convection and radiation from the surface; can be calculated using the \"calculate h\" button. Calculations are performed according to ISO 12241 standard." }} /></li>
                    <li><strong dangerouslySetInnerHTML={{ __html: dict?.helpModalHeatLoss?.fEnergyCost || "Energy cost — tariff, J, for cost estimation." }} /></li>
                    <li><strong dangerouslySetInnerHTML={{ __html: dict?.helpModalHeatLoss?.fCalcType || "Calculation Type — select \"inside\" to calculate heat released outward, or \"outside\" to calculate heat released inward." }} /></li>
                    <li><strong dangerouslySetInnerHTML={{ __html: dict?.helpModalHeatLoss?.fOrientation || "Orientation — pipe orientation: \"vertical\" for vertical pipes, \"horizontal\" for horizontal pipes. Affects convective heat transfer." }} /></li>
                    <li><strong dangerouslySetInnerHTML={{ __html: dict?.helpModalHeatLoss?.fEmissivity || "Emissivity coefficient — surface emissivity (0…1), typically 0.93 for most insulation materials. Affects radiative heat transfer." }} /></li>
                  </ul>
                  <p style={{ marginTop: '12px', lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: dict?.helpModalHeatLoss?.results || "<strong>Results:</strong> heat losses (W), reduction (%), cost per hour (J), insulation thermal transmittance (W/(m·K))." }} />
                  <p style={{ marginTop: '8px', lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: dict?.helpModalHeatLoss?.units || "<strong>Units:</strong> mm — millimeters, m — meters, W/m — watts per meter, W/(m·K) — watts per m·K (thermal transmittance per unit length), J — joules." }} />
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

export default HeatLossCalculator;
