
export interface CalculationParams {
  insulationThickness: number;
  pipeWallThickness?: number;
  pipeLength: number;
  costPerKWh: number;
}

export interface CalculationResults {
  meanLambda: number;
  thermalTransmittance: number;
  heatLoss: number;
  decrease: number;
  costPerHour: number;
  rokaflexDimension: number;
  recommendedThicknessMm?: number;
}

export interface ModalParams {
  calculationType: 'inside' | 'outside';
  orientation: 'vertical' | 'horizontal';
  emissivity: number;
}

export interface CondensationResults {
  dewpointTemperature: number;
  minimumThickness: number;
  nominalThickness: string;
}

export interface CondensationModalParams {
  calculationType: 'inside' | 'outside';
  orientation: 'vertical' | 'horizontal';
  emissivity: number;
}
