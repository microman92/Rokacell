import { getAirProperties, calculateGrashofNumber, calculateRayleighNumber, calculateNusseltHorizontal, calculateNusseltVertical, calculateConvectiveHeatTransfer, calculateRadiativeHeatTransfer } from '../utils/thermal';
import { calculateHCoefficient } from '../utils/thermal/calculations';
import { calculateAdvancedH, calculateAdvancedH_Sheets } from '../utils/thermal/advanced-algorithm';
import { calculateKFlexH } from '../utils/thermal/kflex-algorithm';

import type { Orientation, CalculationType } from '../types/domain';

export interface ComputeHArgs {
  ambientTemp: number;
  mediumTemp: number;
  tubeDiameter: number; 
  orientation: Orientation;
  emissivity: number;
  calculationType?: CalculationType;
  insulationThickness?: number; 
  windSpeed?: number; 
  useSimplifiedFormula?: boolean; 
  applySafetyFactor?: boolean; 
  useAdvancedAlgorithm?: boolean; 
  useAdvancedSheetsAlgorithm?: boolean; 
  useKFlexAlgorithm?: boolean; 
  forCondensation?: boolean; 
}


export const computeH = ({
  ambientTemp,
  mediumTemp,
  tubeDiameter,
  orientation,
  emissivity,
  calculationType = 'inside',
  insulationThickness,
  windSpeed,
  useSimplifiedFormula = true,
  applySafetyFactor = true,
  useAdvancedAlgorithm = false,
  useAdvancedSheetsAlgorithm = false,
  useKFlexAlgorithm = false,
  forCondensation = false,
}: ComputeHArgs): number => {
  
  if (useKFlexAlgorithm) {
    return calculateKFlexH({
      T_amb: ambientTemp,
      T_medium: mediumTemp,
      epsilon: emissivity,
      orientation,
      tubeDiameter,
      insulationThickness,
      forCondensation,
    });
  }

  
  if (useAdvancedSheetsAlgorithm) {
    return calculateAdvancedH_Sheets({
      T_amb: ambientTemp,
      T_medium: mediumTemp,
      epsilon: emissivity,
      orientation,
      tubeDiameter,
      insulationThickness,
    });
  }

  
  if (useAdvancedAlgorithm) {
    return calculateAdvancedH({
      T_amb: ambientTemp,
      T_medium: mediumTemp,
      epsilon: emissivity,
      orientation,
      tubeDiameter,
      insulationThickness,
    });
  }

  const T_ambient = ambientTemp + 273.15;

  
  
  const effectiveDiameter = insulationThickness
    ? (tubeDiameter + 2 * insulationThickness) / 1000
    : tubeDiameter / 1000;

  const meanTemp = (ambientTemp + mediumTemp) / 2;
  const deltaT_estimate = Math.abs(mediumTemp - ambientTemp);

  
  
  
  
  const T_surface_estimate = T_ambient + 0.3 * (mediumTemp - ambientTemp);

  
  
  if (useSimplifiedFormula) {
    
    
    return calculateHCoefficient({
      T_sup: ambientTemp + 0.3 * (mediumTemp - ambientTemp),
      T_amb: ambientTemp,
      T_medium: mediumTemp, 
      epsilon: emissivity,
      windSpeed,
      orientation,
      calculationType,
      applySafetyFactor, 
    });
  }

  
  const airProps = getAirProperties(meanTemp);
  const grashofNumber = calculateGrashofNumber(
    airProps.thermalExpansion,
    deltaT_estimate,
    effectiveDiameter,
    airProps.kinematicViscosity
  );
  const rayleighNumber = calculateRayleighNumber(grashofNumber, airProps.prandtlNumber);
  const nusseltNumber = orientation === 'horizontal'
    ? calculateNusseltHorizontal(rayleighNumber)
    : calculateNusseltVertical(rayleighNumber);
  const h_conv = calculateConvectiveHeatTransfer(nusseltNumber, airProps.thermalConductivity, effectiveDiameter);
  const h_rad = calculateRadiativeHeatTransfer(emissivity, T_surface_estimate, T_ambient);
  return h_conv + h_rad;
};



