


export interface AdvancedHParams {
  
  T_amb: number;
  
  T_medium: number;
  
  epsilon: number;
  
  orientation?: 'horizontal' | 'vertical';
  
  tubeDiameter?: number;
  
  insulationThickness?: number;
}


export function calculateAdvancedH(params: AdvancedHParams): number {
  const { T_amb, T_medium, epsilon, orientation = 'horizontal', tubeDiameter, insulationThickness } = params;

  
  if (epsilon < 0 || epsilon > 1) {
    throw new Error('Коэффициент излучения epsilon должен быть в диапазоне [0, 1]');
  }

  
  
  const deltaT_conv = Math.max(Math.abs(T_medium - T_amb), 1);

  
  
  
  
  let alpha_conv: number;

  
  let baseCoeff: number;
  let power: number;
  if (orientation === 'horizontal') {
    baseCoeff = 1.646;
    power = 0.33;
  } else {
    baseCoeff = 1.8;
    power = 0.25;
  }

  const alpha_conv_base = baseCoeff * Math.pow(deltaT_conv, power);

  
  
  if (tubeDiameter !== undefined && insulationThickness !== undefined && tubeDiameter > 0 && insulationThickness >= 0) {
    
    const D_outer = (tubeDiameter + 2 * insulationThickness) / 1000;

    
    
    
    
    const D_ref = 0.000955 * tubeDiameter + 0.0244; 

    
    
    
    const diameterCorrection = Math.pow(D_ref / D_outer, 0.474);

    alpha_conv = alpha_conv_base * diameterCorrection;
  } else {
    
    alpha_conv = alpha_conv_base;
  }

  
  alpha_conv = Math.ceil(alpha_conv * 1000) / 1000;

  
  
  
  const T_mean = (T_amb + T_medium) / 2;
  const T_rad = T_mean + 0.75; 
  const T_rad_K = T_rad + 273.15;

  
  const sigma = 5.67e-8; 
  const alpha_rad = 4 * epsilon * sigma * Math.pow(T_rad_K, 3);

  
  

  
  const h = alpha_conv + alpha_rad;

  
  return Math.round(h * 1000) / 1000;
}


export function calculateAdvancedH_Sheets(params: AdvancedHParams): number {
  const { T_amb, T_medium, epsilon } = params;

  
  if (epsilon < 0 || epsilon > 1) {
    throw new Error('Коэффициент излучения epsilon должен быть в диапазоне [0, 1]');
  }

  
  const deltaT_conv = Math.max(Math.abs(T_medium - T_amb), 1);

  
  
  
  
  let alpha_conv_raw: number;
  if (T_amb >= 20) {
    
    alpha_conv_raw = 1.32 * Math.pow(deltaT_conv, 0.33);
  } else {
    
    
    const convCoeff = 1.32 - 0.017 * (20 - T_amb);
    alpha_conv_raw = convCoeff * Math.pow(deltaT_conv, 0.33);
  }
  const alpha_conv = Math.max(alpha_conv_raw, 1 / 0.13);

  
  
  
  
  
  
  const T_mean = (T_amb + T_medium) / 2;
  
  const radCoeff = T_mean >= 10
    ? 2.628 - 0.0295 * (25 - T_mean)  
    : 1.4; 
  const alpha_rad = epsilon * Math.max(radCoeff, 1.4);

  
  const h_raw = alpha_conv + alpha_rad;

  
  const h_final = h_raw * 0.75;

  
  return Math.round(h_final * 1000) / 1000;
}


export function calculateAdvancedH_Variant2(params: AdvancedHParams): number {
  const { T_amb, T_medium, epsilon, orientation = 'horizontal' } = params;

  if (epsilon < 0 || epsilon > 1) {
    throw new Error('Коэффициент излучения epsilon должен быть в диапазоне [0, 1]');
  }

  
  const T_mean = (T_amb + T_medium) / 2;
  const deltaT = Math.max(Math.abs(T_medium - T_amb), 1);

  
  let alpha_conv: number;
  if (orientation === 'horizontal') {
    const alpha_conv_raw = 1.0 * Math.pow(deltaT, 0.33);
    alpha_conv = Math.max(alpha_conv_raw, 1 / 0.13);
  } else {
    const alpha_conv_raw = 1.2 * Math.pow(deltaT, 0.25);
    alpha_conv = Math.max(alpha_conv_raw, 1 / 0.13);
  }

  
  const sigma = 5.67e-8;
  const T_mean_K = T_mean + 273.15;

  
  const alpha_rad = 4 * epsilon * sigma * Math.pow(T_mean_K, 3);

  const h = alpha_conv + alpha_rad;
  return Math.round(h * 1000) / 1000;
}


export function calculateAdvancedH_Variant3(params: AdvancedHParams): number {
  const { T_amb, T_medium, epsilon, orientation = 'horizontal' } = params;

  if (epsilon < 0 || epsilon > 1) {
    throw new Error('Коэффициент излучения epsilon должен быть в диапазоне [0, 1]');
  }

  const deltaT = Math.max(Math.abs(T_medium - T_amb), 1);

  
  let alpha_conv: number;
  if (orientation === 'horizontal') {
    const alpha_conv_raw = 1.0 * Math.pow(deltaT, 0.33);
    alpha_conv = Math.max(alpha_conv_raw, 1 / 0.13);
  } else {
    const alpha_conv_raw = 1.2 * Math.pow(deltaT, 0.25);
    alpha_conv = Math.max(alpha_conv_raw, 1 / 0.13);
  }

  
  const sigma = 5.67e-8;
  const T_amb_K = T_amb + 273.15;

  
  
  const alpha_rad = 4 * epsilon * sigma * Math.pow(T_amb_K, 3);

  const h = alpha_conv + alpha_rad;
  return Math.round(h * 1000) / 1000;
}

