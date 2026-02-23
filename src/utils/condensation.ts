import { interpolateLambda } from './thermal';
import { calculateDewPoint as calculateDewPointMagnus } from './thermal/calculations';


export const calculateDewPoint = (temperature: number, relativeHumidity: number): number => {
  return calculateDewPointMagnus({ T: temperature, UR: relativeHumidity });
};


export const calculateMinimumThickness = (
  tubeDiameter: number,
  ambientTemp: number,
  mediumTemp: number,
  dewPoint: number,
  material: string,
  h: number
): number => {
  
  if (tubeDiameter <= 0) {
    throw new Error('Диаметр трубы должен быть положительным');
  }
  if (h <= 0) {
    throw new Error('Коэффициент теплопередачи h должен быть положительным');
  }

  
  if (dewPoint >= ambientTemp) {
    throw new Error(`Точка росы (${dewPoint.toFixed(1)}°C) не может быть выше или равна температуре окружающей среды (${ambientTemp.toFixed(1)}°C). Проверьте параметры влажности.`);
  }

  
  
  
  
  const safetyMargin = 0.4;
  const targetSurfaceTemp = dewPoint + safetyMargin; 

  
  
  if (targetSurfaceTemp > ambientTemp) {
    throw new Error(`Невозможно предотвратить конденсацию: требуемая температура поверхности (${targetSurfaceTemp.toFixed(1)}°C) выше температуры окружающей среды (${ambientTemp.toFixed(1)}°C). Уменьшите влажность или увеличьте температуру окружающей среды.`);
  }

  
  const meanTemp = (ambientTemp + mediumTemp) / 2;
  const lambda = interpolateLambda(meanTemp, material); 

  
  const ri = tubeDiameter / 2 / 1000;

  
  
  for (let thickness = 0.1; thickness <= 100; thickness += 0.1) {
    
    const ro = ri + thickness / 1000;

    
    
    const R_ins = Math.log(ro / ri) / (2 * Math.PI * lambda);

    
    const R_conv = 1 / (h * 2 * Math.PI * ro);

    
    const R_total = R_ins + R_conv;

    
    const deltaT = mediumTemp - ambientTemp;

    
    
    const heatFlow = deltaT / R_total;

    
    
    
    const surfaceTemp = mediumTemp - heatFlow * R_ins;

    
    if (surfaceTemp >= targetSurfaceTemp) {
      return thickness;
    }
  }

  
  return 50;
};



