


export interface HeatLossPipeParams {
  
  Ti: number;
  
  Te: number;
  
  d: number;
  
  D: number;
  
  L: number;
  
  lambda: number;
  
  h: number;
  
  alpha?: number;
}


export interface HeatLossSheetParams {
  
  Ti: number;
  
  Te: number;
  
  A: number;
  
  s: number;
  
  lambda: number;
  
  h: number;
  
  alpha?: number;
}


export interface HCoefficientParams {
  
  T_sup: number;
  
  T_amb: number;
  
  epsilon: number;
  
  windSpeed?: number;
  
  orientation?: 'horizontal' | 'vertical';
  
  calculationType?: 'inside' | 'outside';
  
  applySafetyFactor?: boolean;
}


export interface DewPointParams {
  
  T: number;
  
  UR: number;
}


export interface SurfaceTemperatureParams {
  
  T_amb: number;
  
  Q: number;
  
  h: number;
  
  A?: number;
  
  D?: number;
  
  L?: number;
}


export interface FlowingFluidTemperatureParams {
  
  Ti: number;
  
  Te: number;
  
  k: number;
  
  L: number;
  
  Cp: number;
  
  rho: number;
  
  v?: number;
  
  d?: number;
}


export interface StaticFluidTemperatureParams {
  
  Ti: number;
  
  Te: number;
  
  k: number;
  
  L: number;
  
  t: number;
  
  Cp: number;
  
  m: number;
}


export interface FreezingTimeParams {
  
  Ti: number;
  
  Te: number;
  
  T_cong: number;
  
  k: number;
  
  L: number;
  
  m: number;
  
  Cp: number;
  
  Q: number;
  
  x: number;
  
  deltaH_fus: number;
}


export interface AntiCondensationParams {
  
  Ti: number;
  
  Te: number;
  
  T_amb: number;
  
  UR: number;
  
  d: number;
  
  lambda: number;
  
  h: number;
  
  minThickness?: number;
  
  maxThickness?: number;
  
  step?: number;
  
  alpha?: number;
}


export interface AntiCondensationResult {
  
  thickness: number;
  
  D: number;
  
  T_sup: number;
  
  T_dew: number;
}


export function calculateHeatLossPipe(params: HeatLossPipeParams): number {
  const { Ti, Te, d, D, L, lambda, h, alpha } = params;

  
  if (D <= d) {
    throw new Error('Наружный диаметр D должен быть больше внутреннего диаметра d');
  }
  if (L <= 0) {
    throw new Error('Длина трубы L должна быть положительной');
  }
  if (lambda <= 0) {
    throw new Error('Теплопроводность lambda должна быть положительной');
  }
  if (h <= 0) {
    throw new Error('Коэффициент теплопередачи h должен быть положительным');
  }
  if (alpha !== undefined && alpha <= 0) {
    throw new Error('Внутренний коэффициент теплопередачи alpha должен быть положительным');
  }

  const deltaT = Ti - Te; 

  
  const R_alpha = alpha ? 1 / (alpha * Math.PI * d * L) : 0;

  
  
  const R_ins = Math.log(D / d) / (2 * Math.PI * lambda * L);

  
  const R_conv = 1 / (h * Math.PI * D * L);

  
  const R_total = R_alpha + R_ins + R_conv;

  
  const Q = deltaT / R_total;

  return Q;
}


export function calculateHeatLossSheet(params: HeatLossSheetParams): number {
  const { Ti, Te, A, s, lambda, h, alpha } = params;

  
  if (A <= 0) {
    throw new Error('Площадь поверхности A должна быть положительной');
  }
  if (s <= 0) {
    throw new Error('Толщина изоляции s должна быть положительной');
  }
  if (lambda <= 0) {
    throw new Error('Теплопроводность lambda должна быть положительной');
  }
  if (h <= 0) {
    throw new Error('Коэффициент теплопередачи h должен быть положительным');
  }
  if (alpha !== undefined && alpha <= 0) {
    throw new Error('Внутренний коэффициент теплопередачи alpha должен быть положительным');
  }

  const deltaT = Ti - Te; 

  
  const R_alpha = alpha ? 1 / (alpha * A) : 0;

  
  
  const R_ins = s / (lambda * A);

  
  const R_conv = 1 / (h * A);

  
  const R_total = R_alpha + R_ins + R_conv;

  
  const Q = deltaT / R_total;

  return Q;
}


export function calculateHCoefficient(params: HCoefficientParams & { T_medium?: number }): number {
  const { T_sup, T_amb, epsilon, applySafetyFactor = true, T_medium } = params;

  
  if (epsilon < 0 || epsilon > 1) {
    throw new Error('Коэффициент излучения epsilon должен быть в диапазоне [0, 1]');
  }
  if (Math.abs(T_sup - T_amb) > 500) {
    console.warn(`Большая разница температур: ${Math.abs(T_sup - T_amb)}°C. Проверьте корректность входных данных.`);
  }

  
  const T_sup_K = T_sup + 273.15;
  const T_amb_K = T_amb + 273.15;

  
  
  
  const deltaT = T_medium !== undefined
    ? Math.max(Math.abs(T_medium - T_amb), 1)
    : Math.max(Math.abs(T_sup - T_amb), 1);

  
  const alpha_conv_raw = 1.32 * Math.pow(deltaT, 0.33);

  
  const alpha_conv = Math.max(alpha_conv_raw, 1 / 0.13);

  
  
  const sigma = 5.67e-8; 
  const T_sup4 = Math.pow(T_sup_K, 4);
  const T_amb4 = Math.pow(T_amb_K, 4);
  const deltaT_K = T_sup_K - T_amb_K;

  
  let alpha_rad: number;
  if (Math.abs(deltaT_K) < 0.01) {
    
    const T_mean = (T_sup_K + T_amb_K) / 2;
    alpha_rad = 4 * epsilon * sigma * Math.pow(T_mean, 3);
  } else {
    
    alpha_rad = (epsilon * sigma * (T_sup4 - T_amb4)) / deltaT_K;
  }

  
  alpha_rad = Math.min(alpha_rad, 6.5);

  
  const h_raw = alpha_conv + alpha_rad;

  
  
  
  const safetyFactor = applySafetyFactor ? 0.75 : 1.0;
  const h_final = h_raw * safetyFactor;

  
  return Math.round(h_final * 1000) / 1000;
}


export function calculateDewPoint(params: DewPointParams): number {
  const { T, UR } = params;

  const gamma = Math.log(UR / 100) + (17.62 * T) / (243.12 + T);
  const T_dew = (243.12 * gamma) / (17.62 - gamma);

  return T_dew;
}


export function calculateSurfaceTemperature(params: SurfaceTemperatureParams): number {
  const { T_amb, Q, h, A, D, L } = params;

  let surfaceArea: number;

  if (D !== undefined && L !== undefined) {
    
    surfaceArea = Math.PI * D * L;
  } else if (A !== undefined) {
    
    surfaceArea = A;
  } else {
    throw new Error('Необходимо указать либо (D, L) для трубы, либо A для листа');
  }

  const T_sup = T_amb + Q / (h * surfaceArea);

  return T_sup;
}


export function calculateThermalTransmittancePipe(
  Q: number,
  L: number,
  Ti: number,
  Te: number
): number {
  const deltaT = Ti - Te;
  if (Math.abs(deltaT) < 1e-10 || L <= 0) {
    return 0;
  }
  return Q / (L * deltaT);
}


export function calculateThermalTransmittanceSheet(
  Q: number,
  A: number,
  Ti: number,
  Te: number
): number {
  const deltaT = Ti - Te;
  if (Math.abs(deltaT) < 1e-10 || A <= 0) {
    return 0;
  }
  return Q / (A * deltaT);
}


export function calculateMeanTemperature(T_int: number, T_ext: number): number {
  return (T_int + T_ext) / 2;
}


export function calculateFlowingFluidTemperature(params: FlowingFluidTemperatureParams): number {
  const { Ti, Te, k, L, Cp, rho, v, d } = params;

  if (v === undefined || d === undefined) {
    throw new Error('Для расчёта текущей жидкости необходимо указать скорость v и диаметр d');
  }

  
  const massFlowRate = rho * v * Math.PI * Math.pow(d, 2) / 4;

  
  const exponent = -k * L / (Cp * massFlowRate);

  const T_f = Te + (Ti - Te) * Math.exp(exponent);

  return T_f;
}


export function calculateStaticFluidTemperature(params: StaticFluidTemperatureParams): number {
  const { Ti, Te, k, L, t, Cp, m } = params;

  
  const exponent = -k * L * t / (Cp * m);

  const T_f = Te + (Ti - Te) * Math.exp(exponent);

  return T_f;
}


export function calculateFreezingTime(params: FreezingTimeParams): number {
  const { Ti, Te, T_cong, k, L, m, Cp, Q, x, deltaH_fus } = params;

  
  const t_cooling = (m * Cp * (Ti - T_cong)) / (k * L * (T_cong - Te));

  
  const t_freezing_phase = (x * m * deltaH_fus) / Q;

  
  const t_total_seconds = t_cooling + t_freezing_phase;
  const t_total_hours = t_total_seconds / 3600;

  return t_total_hours;
}


export function findMinimalAntiCondensationThickness(
  params: AntiCondensationParams
): AntiCondensationResult | null {
  const {
    Ti,
    Te,
    T_amb,
    UR,
    d,
    lambda,
    h,
    minThickness = 0.001,
    maxThickness = 0.1,
    step = 0.001,
    alpha,
  } = params;

  
  const T_dew = calculateDewPoint({ T: T_amb, UR });

  
  for (let s = minThickness; s <= maxThickness; s += step) {
    
    const D = d + 2 * s;

    
    const Q = calculateHeatLossPipe({
      Ti,
      Te,
      d,
      D,
      L: 1, 
      lambda,
      h,
      alpha,
    });

    
    const T_sup = calculateSurfaceTemperature({
      T_amb,
      Q,
      h,
      D,
      L: 1,
    });

    
    if (T_sup > T_dew) {
      return {
        thickness: s,
        D,
        T_sup,
        T_dew,
      };
    }
  }

  
  return null;
}

