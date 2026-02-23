

export type Orientation = 'horizontal' | 'vertical';

export interface KFlexHParams {
  
  T_amb: number;
  
  T_medium: number;
  
  epsilon: number;
  
  orientation?: Orientation;
  
  tubeDiameter?: number;
  
  insulationThickness?: number;
}


export function calculateKFlexH(params: KFlexHParams & { forCondensation?: boolean }): number {
  const {
    T_amb,
    T_medium,
    epsilon,
    orientation = 'horizontal',
    tubeDiameter,
    insulationThickness,
    forCondensation = false,
  } = params;

  if (epsilon < 0 || epsilon > 1) {
    throw new Error('Эмиссивность должна быть в диапазоне [0, 1]');
  }

  const deltaT = Math.max(Math.abs(T_medium - T_amb), 1);

  
  
  
  
  
  
  let baseCoeff: number;
  if (forCondensation) {
    
    const deltaFrom30 = deltaT - 30;
    const adaptiveCoeff = orientation === 'horizontal'
      ? 1.646 - 0.0057 * deltaFrom30  
      : 1.8 - 0.0063 * deltaFrom30;
    
    baseCoeff = Math.max(adaptiveCoeff, orientation === 'horizontal' ? 1.44 : 1.58);
  } else {
    baseCoeff = orientation === 'horizontal' ? 1.646 : 1.8;
  }
  const power = orientation === 'horizontal' ? 0.33 : 0.25;
  const alphaConvBase = baseCoeff * Math.pow(deltaT, power);

  let alphaConv = alphaConvBase;

  if (
    typeof tubeDiameter === 'number' &&
    typeof insulationThickness === 'number' &&
    tubeDiameter > 0 &&
    insulationThickness >= 0
  ) {
    
    const D_outer = (tubeDiameter + 2 * insulationThickness) / 1000;

    
    const D_ref = 0.043; 

    
    
    const powerCorrection = forCondensation ? 0.15 : 0.1;
    const correction = Math.pow(D_ref / D_outer, powerCorrection);
    alphaConv = alphaConvBase * correction;
  }

  
  const sigma = 5.67e-8;
  const T_meanK = (T_amb + T_medium) / 2 + 273.15;
  const alphaRad = 4 * epsilon * sigma * Math.pow(T_meanK, 3);

  const h = alphaConv + alphaRad;

  return Math.round(h * 1000) / 1000;
}


