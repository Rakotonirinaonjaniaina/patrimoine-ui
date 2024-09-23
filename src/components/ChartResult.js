import React from 'react';
import { Line } from 'react-chartjs-2';

const ChartResult = ({ dataChart, options, loading, errorMessage, fluxPossible }) => (
  <div>
    {loading && <p>Chargement en cours...</p>}
    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    {!fluxPossible && <p style={{ color: 'red' }}>Le flux est impossible.</p>}
    {dataChart && fluxPossible && (
      <div>
        <h2>Résultat de la simulation :</h2>
        <div style={{ height: '400px', width: '100%', border: '2px solid #000', borderRadius: '8px', padding: '10px', boxSizing: 'border-box' }}>
          <Line data={dataChart} options={options} />
        </div>
      </div>
    )}
  </div>
);

export default ChartResult;
