import React from 'react';
import modalStyles from '../Modal.module.scss';
import { CLADDING_OPTIONS } from '../../../utils/constants';
import { Dictionary } from '@/lib/i18n';
import { getNumberValue } from '@/utils/formUtils';

type CalculatorDict = NonNullable<Dictionary['calculator']>['calc'];

type ModalParams = {
  calculationType: 'inside' | 'outside';
  orientation: 'horizontal' | 'vertical';
  emissivity: number;
  sheetHeightM: number;
  cladding?: string;
};

type CalculateHModalProps = {
  isOpen: boolean;
  onClose: () => void;
  ambientTemp: number;
  mediumTemp: number;
  material: string;
  modalParams: ModalParams;
  setModalParams: React.Dispatch<React.SetStateAction<ModalParams>>;
  onCalculate: () => void;
  applySafetyFactor?: boolean;
  setApplySafetyFactor?: (value: boolean) => void;
  useAdvancedAlgorithm?: boolean;
  setUseAdvancedAlgorithm?: (value: boolean) => void;
  useAdvancedSheetsAlgorithm?: boolean;
  setUseAdvancedSheetsAlgorithm?: (value: boolean) => void;
  relativeHumidity?: number;
  dict?: CalculatorDict;
};

const CalculateHModal: React.FC<CalculateHModalProps> = ({
  isOpen,
  onClose,
  ambientTemp,
  mediumTemp,
  material,
  modalParams,
  setModalParams,
  onCalculate,
  relativeHumidity,
  dict,
}) => {
  if (!isOpen) return null;

  return (
    <div className={modalStyles.modal}>
      <div className={modalStyles.modal__container}>
        <div className={modalStyles.modal__header}>
          <h1 className={modalStyles.modal__header_title}>{dict?.hModal?.title || "Calculation of Heat Transfer Coefficient h"}</h1>
        </div>

        <div className={modalStyles.modal__content}>
          <div className={modalStyles.modal__section}>
            <h2 className={modalStyles.modal__section_title}>{dict?.hModal?.calcType || "Calculation Type"}</h2>
            <div className={modalStyles.modal__field}>
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
            </div>
          </div>

          <div className={modalStyles.modal__section}>
            <h2 className={modalStyles.modal__section_title}>{dict?.parameters || "Parameters"}</h2>
            <div className={modalStyles.modal__grid}>
              <div className={modalStyles.modal__field}>
                <label className={modalStyles.modal__field_label}>{dict?.ambientTemp || "ambient temperature"}</label>
                <input type="number" value={ambientTemp.toFixed(2)} readOnly className={`${modalStyles.modal__field_input} ${modalStyles['modal__field_input_readonly']}`} />
                <span className={modalStyles.modal__field_unit}>°C</span>
              </div>
              <div className={modalStyles.modal__field}>
                <label className={modalStyles.modal__field_label}>{dict?.mediumTemp || "medium temperature"}</label>
                <input type="number" value={mediumTemp.toFixed(2)} readOnly className={`${modalStyles.modal__field_input} ${modalStyles['modal__field_input_readonly']}`} />
                <span className={modalStyles.modal__field_unit}>°C</span>
              </div>
              <div className={modalStyles.modal__field}>
                <label className={modalStyles.modal__field_label}>{dict?.insulationMaterial || "insulation material"}</label>
                <input type="text" value={material} readOnly className={`${modalStyles.modal__field_input} ${modalStyles['modal__field_input_readonly']}`} />
              </div>
              {relativeHumidity !== undefined && (
                <div className={modalStyles.modal__field}>
                  <label className={modalStyles.modal__field_label}>{dict?.hModal?.relHumidity || "rel. humidity (30%-95%)"}</label>
                  <input
                    type="number"
                    value={relativeHumidity.toFixed(2)}
                    readOnly
                    className={`${modalStyles.modal__field_input} ${modalStyles['modal__field_input_readonly']}`}
                    min="30"
                    max="95"
                    step="0.1"
                  />
                  <span className={modalStyles.modal__field_unit}>%</span>
                </div>
              )}
            </div>
          </div>

          <div className={modalStyles.modal__section}>
            <h2 className={modalStyles.modal__section_title}>{dict?.hModal?.additionalSettings || "Additional Settings"}</h2>
            <div className={modalStyles.modal__grid}>
              <div className={modalStyles.modal__field}>
                <label className={modalStyles.modal__field_label}>{dict?.hModal?.emissivity || "emission coefficient (see help)"}</label>
                <input
                  type="number"
                  min="0" max="1" step="0.01"
                  value={modalParams.emissivity}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setModalParams({ ...modalParams, emissivity: getNumberValue(e) })}
                  className={modalStyles.modal__field_input}
                />
              </div>
              <div className={modalStyles.modal__field}>
                <label className={modalStyles.modal__field_label}>{dict?.hModal?.sheetHeightM || "sheet height (m)"}</label>
                <input
                  type="number"
                  min="0.01" step="0.01"
                  value={modalParams.sheetHeightM.toFixed(2)}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setModalParams({ ...modalParams, sheetHeightM: getNumberValue(e) })}
                  className={modalStyles.modal__field_input}
                />
              </div>
              <div className={modalStyles.modal__field}>
                <label className={modalStyles.modal__field_label}>{dict?.hModal?.typeOfCladding || "type of cladding"}</label>
                <select
                  className={modalStyles.modal__field_input}
                  value={modalParams.cladding ?? ''}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setModalParams({ ...modalParams, cladding: e.target.value })}
                >
                  <option value="">{dict?.hModal?.select || "select"}</option>
                  {CLADDING_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          { }
          <div style={{ display: 'none' }}>
            { }
            <div className={modalStyles.modal__field}>
              <label className={modalStyles.modal__field_label}>sheet orientation</label>
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
                  <span className={modalStyles.modal__field_radio_label}>vertical</span>
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
                  <span className={modalStyles.modal__field_radio_label}>horizontal</span>
                </label>
              </div>
            </div>
          </div>

          <div className={modalStyles.modal__controls}>
            <button onClick={onCalculate} className={`${modalStyles.modal__button} ${modalStyles['modal__button_primary']}`}>{dict?.hModal?.continueBtn || "Continue"}</button>
            <button onClick={onClose} className={`${modalStyles.modal__button} ${modalStyles['modal__button_secondary']}`}>{dict?.hModal?.cancelBtn || "Cancel"}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculateHModal;


