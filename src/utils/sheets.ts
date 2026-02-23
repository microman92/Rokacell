import { SHEET_MATERIALS } from './constants';

export const interpolateSheetLambda = (temp: number, material: string): number => {
  const materialData = SHEET_MATERIALS[material as keyof typeof SHEET_MATERIALS] as any;
  if (!materialData) return 0.036;
  const lambdaData = materialData.lambda as Record<string, number>;
  const temps = Object.keys(lambdaData).map(Number).sort((a, b) => a - b);

  if (String(temp) in lambdaData) return lambdaData[String(temp)] ?? 0.036;
  let lambda = lambdaData[String(temps[0] ?? 0)] ?? 0.036;
  for (let i = 0; i < temps.length - 1; i++) {
    const t0 = temps[i] ?? 0;
    const t1 = temps[i + 1] ?? 0;
    if (temp >= t0 && temp <= t1) {
      const l0 = lambdaData[String(t0)] ?? 0.036;
      const l1 = lambdaData[String(t1)] ?? 0.036;
      lambda = l0 + (l1 - l0) * (temp - t0) / (t1 - t0);
      break;
    }
  }
  return lambda;
};


export const getFlatU = (h: number, thicknessMm: number, lambda: number): number => {

  if (h <= 0) {
    throw new Error('Коэффициент теплопередачи h должен быть положительным');
  }
  if (thicknessMm <= 0) {
    throw new Error('Толщина изоляции должна быть положительной');
  }
  if (lambda <= 0) {
    throw new Error('Теплопроводность lambda должна быть положительной');
  }


  const R_conv = 1 / h;



  const R_ins = (thicknessMm / 1000) / lambda;


  const R_total = R_conv + R_ins;


  return 1 / R_total;
};


export const computeSheetHeatLoss = (
  ambientTemp: number,
  mediumTemp: number,
  thicknessMm: number,
  areaM2: number,
  material: string,
  h: number,
  costPerKWh: number
) => {

  if (areaM2 <= 0) {
    throw new Error('Площадь поверхности должна быть положительной');
  }
  if (thicknessMm <= 0) {
    throw new Error('Толщина изоляции должна быть положительной');
  }
  if (h <= 0) {
    throw new Error('Коэффициент теплопередачи h должен быть положительным');
  }





  const lambdaTemp = ambientTemp + 5;
  const lambda = interpolateSheetLambda(lambdaTemp, material);


  const U = getFlatU(h, thicknessMm, lambda);


  const deltaT = Math.abs(mediumTemp - ambientTemp);



  const Q = U * areaM2 * deltaT;






  const deltaT_for_h = Math.abs(mediumTemp - ambientTemp);
  const alpha_conv_raw = 1.32 * Math.pow(deltaT_for_h, 0.33);
  const alpha_conv = Math.max(alpha_conv_raw, 1 / 0.13);




  const epsilon = 0.93;
  const alpha_rad_q0 = epsilon * 1.428;
  const h0 = alpha_conv + alpha_rad_q0;
  const U0 = h0;
  const Q0 = U0 * areaM2 * deltaT;


  const decrease = ((Q0 - Q) / Q0) * 100;


  const costPerHour = (Q / 1000) * costPerKWh;

  return { meanLambda: lambda, U, Q, decrease, costPerHour };
};

export const getRecommendedSheetThickness = (
  ambientTemp: number,
  mediumTemp: number,
  _areaM2: number,
  material: string,
  h: number,
  targetHeatFluxWPerM2 = 15
) => {
  const candidates = [6, 9, 10, 13, 19, 25, 32, 40, 50];

  const lambda = interpolateSheetLambda(ambientTemp, material);
  const deltaT = Math.abs(mediumTemp - ambientTemp);
  for (const t of candidates) {
    const U = getFlatU(h, t, lambda);
    const q = U * deltaT;
    if (q <= targetHeatFluxWPerM2) return t;
  }
  return candidates[candidates.length - 1] ?? 50;
};




export const calculateMinimumSheetThickness = (
  ambientTemp: number,
  mediumTemp: number,
  dewPoint: number,
  material: string,
  h: number,
  safetyMarginC: number = 0.3
): number => {

  if (h <= 0) {
    throw new Error('Коэффициент теплопередачи h должен быть положительным');
  }


  if (dewPoint >= ambientTemp) {
    throw new Error(`Точка росы (${dewPoint.toFixed(1)}°C) не может быть выше или равна температуре окружающей среды (${ambientTemp.toFixed(1)}°C). Проверьте параметры влажности.`);
  }

  const targetSurfaceTemp = dewPoint + safetyMarginC;



  if (targetSurfaceTemp > ambientTemp) {
    throw new Error(`Невозможно предотвратить конденсацию: требуемая температура поверхности (${targetSurfaceTemp.toFixed(1)}°C) выше температуры окружающей среды (${ambientTemp.toFixed(1)}°C). Уменьшите влажность или увеличьте температуру окружающей среды.`);
  }



  const meanTemp = (ambientTemp + mediumTemp) / 2;
  const lambda = interpolateSheetLambda(meanTemp, material);

  for (let thickness = 0.01; thickness <= 100; thickness += 0.01) {
    const R_ins = (thickness / 1000) / lambda;
    const R_conv = 1 / h;
    const R_total = R_ins + R_conv;
    const q = (mediumTemp - ambientTemp) / R_total;
    const surfaceTemp = ambientTemp + q * R_conv;
    if (surfaceTemp >= targetSurfaceTemp) return thickness;
  }
  return 50;
};

export const getNominalSheetThicknessRecommendation = (minimumThickness: number): number => {

  if (minimumThickness > 37.99) return 50;
  if (minimumThickness > 29.99) return 40;
  if (minimumThickness > 22.99) return 32;
  if (minimumThickness > 16.99) return 25;
  if (minimumThickness > 10.99) return 19;
  if (minimumThickness > 7) return 13;
  if (minimumThickness > 4.99) return 9;

  return 6;
};



