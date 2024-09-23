import React from 'react';
import Checkbox from './Checkbox';
import DateInput from './DateInput';

const SimulationForm = ({ patrimoine, setPatrimoine, checked, setChecked, dateDebut, setDateDebut, dateFin, setDateFin, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <div>
      <label>
        Choix de patrimoine :
        <select value={patrimoine} onChange={(e) => setPatrimoine(e.target.value)}>
          <option value="Crésus">Crésus</option>
          <option value="Autre">Autre</option>
        </select>
      </label>
    </div>
    <Checkbox label="Trésorerie" checked={checked.tresorerie} onChange={(e) => setChecked({ ...checked, tresorerie: e.target.checked })} />
    <Checkbox label="Immobilisations" checked={checked.immobilisations} onChange={(e) => setChecked({ ...checked, immobilisations: e.target.checked })} />
    <Checkbox label="Obligations" checked={checked.obligations} onChange={(e) => setChecked({ ...checked, obligations: e.target.checked })} />
    <DateInput label="Date de simulation de" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} />
    <DateInput label="à" value={dateFin} onChange={(e) => setDateFin(e.target.value)} />
    <button type="submit">Simuler</button>
  </form>
);

export default SimulationForm;
