import { Locale } from '@/lib/locales';

export interface LocaleProps {
    locale: Locale;
}


export interface AirProperties {
    kinematicViscosity: number; 
    thermalConductivity: number; 
    prandtlNumber: number; 
    thermalExpansion: number; 
}


export interface CalculationParams {
    ambientTemp: number; 
    mediumTemp: number; 
    tubeDiameter: number; 
    insulationThickness: number; 
    pipeWallThickness?: number; 
    pipeLength: number; 
    material: import('../utils/constants').AnyMaterialKey; 
    h: number; 
    costPerKWh: number; 
    
    recommendByHeatLoss?: boolean; 
    targetHeatLossWPerM?: number; 
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


export interface CondensationParams {
    ambientTemp: number; 
    mediumTemp: number; 
    tubeDiameter: number; 
    material: import('../utils/constants').AnyMaterialKey; 
    h: number; 
    relativeHumidity: number; 
}


export interface CondensationResults {
    dewpointTemperature: number; 
    minimumThickness: number; 
    nominalThickness: string; 
}


export interface ModalParams {
    calculationType?: 'inside' | 'outside'; 
    orientation: import('./domain').Orientation; 
    emissivity: number; 
}


export interface CondensationModalParams {
    calculationType: 'inside' | 'outside'; 
    orientation: import('./domain').Orientation; 
    emissivity: number; 
}