import React from 'react';
import modalStyles from '../Modal.module.scss';
import { Dictionary } from '@/lib/i18n';

type CalculatorDict = NonNullable<Dictionary['calculator']>['calc'];

type HelpModalProps = {
  isOpen: boolean;
  onClose: () => void;
  dict?: CalculatorDict;
};

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose, dict }) => {
  if (!isOpen) return null;

  return (
    <div className={modalStyles.modal}>
      <div className={modalStyles.modal__container}>
        <div className={modalStyles.modal__header}>
          <h1 className={modalStyles.modal__header_title}>{dict?.helpModalCondensation?.title || "Help"}</h1>
        </div>

        <div className={modalStyles.modal__content}>
          <div className={modalStyles.modal__section}>
            <p style={{ marginBottom: '16px', lineHeight: '1.6' }} dangerouslySetInnerHTML={{ __html: dict?.helpModalCondensation?.p1 || "The calculator calculates the minimum insulation thickness to prevent condensation on the surface." }} />
            <p style={{ marginBottom: '16px', lineHeight: '1.6' }} dangerouslySetInnerHTML={{ __html: dict?.helpModalCondensation?.p2 || "Enter the ambient parameters, medium temperature, and relative humidity of the air." }} />
            <p style={{ marginBottom: '16px', lineHeight: '1.6' }} dangerouslySetInnerHTML={{ __html: dict?.helpModalCondensation?.p3 || "The heat transfer coefficient h is calculated automatically taking into account convective and radiative heat transfer. All calculations are performed according to ISO 12241 standard for thermal insulation." }} />
            <p style={{ lineHeight: '1.6' }} dangerouslySetInnerHTML={{ __html: dict?.helpModalCondensation?.p4 || "The result will show the dew point and the recommended insulation thickness from stock." }} />
            <div style={{ marginTop: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>{dict?.helpModalCondensation?.fieldsTitle || "Field Explanations"}</h3>
              <ul style={{ paddingLeft: '18px', lineHeight: 1.6, margin: 0 }}>
                <li dangerouslySetInnerHTML={{ __html: dict?.helpModalCondensation?.fAmbient || "<strong>Ambient temperature</strong> — air outside the insulation, °C." }} />
                <li dangerouslySetInnerHTML={{ __html: dict?.helpModalCondensation?.fMedium || "<strong>Medium temperature</strong> — heat carrier temperature inside the pipe (for pipes) or surface/medium temperature (for sheets), °C." }} />
                <li dangerouslySetInnerHTML={{ __html: dict?.helpModalCondensation?.fDiameter || "<strong>Pipe diameter</strong> — outer diameter, mm. The list shows equivalents: Cu — copper, St — steel. (For sheets, this parameter is not used.)" }} />
                <li dangerouslySetInnerHTML={{ __html: dict?.helpModalCondensation?.fMaterial || "<strong>Thermal insulation material</strong> — sets thermal conductivity λ(T) for calculation." }} />
                <li dangerouslySetInnerHTML={{ __html: dict?.helpModalCondensation?.fHeatTransfer || "<strong>Heat transfer coefficient h</strong> — takes into account convection and radiation from the surface; can be calculated using the \"calculate h\" button." }} />
                <li dangerouslySetInnerHTML={{ __html: dict?.helpModalCondensation?.fRelHumidity || "<strong>Relative humidity (30%-95%)</strong> — used to calculate the dew point using the Magnus formula, %." }} />
                <li dangerouslySetInnerHTML={{ __html: dict?.helpModalCondensation?.fCalcType || "<strong>Calculation Type</strong> — select \"inside\" to calculate heat released outward, or \"outside\" to calculate heat released inward." }} />
                <li dangerouslySetInnerHTML={{ __html: dict?.helpModalCondensation?.fOrientation || "<strong>Orientation</strong> — pipe/sheet orientation: \"vertical\" for vertical orientation, \"horizontal\" for horizontal orientation. Affects convective heat transfer." }} />
                <li dangerouslySetInnerHTML={{ __html: dict?.helpModalCondensation?.fEmissivity || "<strong>Emissivity coefficient</strong> — surface emissivity (0…1), typically 0.93 for most insulation materials. Affects radiative heat transfer." }} />
              </ul>
              <p style={{ marginTop: '12px', lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: dict?.helpModalCondensation?.results || "<strong>Results:</strong> dew point (°C) — condensation start temperature; minimum insulation thickness (mm) — calculated value to prevent condensation; and also <strong>recommended thickness</strong> — recommended insulation thickness from stock (with 20% margin for pipes)." }} />
              <p style={{ marginTop: '8px', lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: dict?.helpModalCondensation?.units || "<strong>Units:</strong> mm — millimeters, °C — degrees Celsius, W/m²K — watts per m²·K, % — percent." }} />
            </div>
          </div>

          <div className={modalStyles.modal__controls}>
            <button
              onClick={onClose}
              className={`${modalStyles.modal__button} ${modalStyles['modal__button_primary']}`}
            >
              {dict?.helpModalCondensation?.closeBtn || "Close"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;


