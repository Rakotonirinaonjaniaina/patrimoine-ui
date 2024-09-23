import React, {useState} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import SimulationForm from './components/SimulationForm';
import ChartResult from './components/ChartResult';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

function App() {
  const [patrimoine, setPatrimoine] = useState('Crésus');
  const [checked, setChecked] = useState({ tresorerie: false, immobilisations: false, obligations: false });
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [dataChart, setDataChart] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [fluxPossible, setFluxPossible] = useState(true);

  const validateDates = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return start < end ? null : "La date de début doit être avant la date de fin.";
  };

  const simulateFlux = () => checked.tresorerie || checked.immobilisations || checked.obligations;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateDates(dateDebut, dateFin);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }
    setErrorMessage('');
    setLoading(true);
    const flux = simulateFlux();
    setFluxPossible(flux);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (flux) {
      const labels = generateDateLabels(dateDebut, dateFin);
      const datasets = generateDatasets(labels);
      setDataChart({ labels, datasets });
    }
    setLoading(false);
  };

  const generateDateLabels = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const labels = [];
    for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
      labels.push(new Date(d).toISOString().split('T')[0]);
    }
    return labels;
  };

  const generateDatasets = (labels) => {
    const datasets = [];
    const styles = {
      tresorerie: { borderDash: [], pointStyle: 'circle' },
      immobilisations: { borderDash: [5, 5], pointStyle: 'rect' },
      obligations: { borderDash: [10, 5], pointStyle: 'triangle' },
    };

    for (const [key, value] of Object.entries(checked)) {
      if (value) {
        const data = [0];
        for (let i = 1; i < labels.length; i++) {
          const previousValue = data[i - 1];
          const change = Math.floor(Math.random() * 20) - 10;
          data.push(previousValue + change);
        }
        datasets.push({
          label: key.replace(/([A-Z])/g, ' $1').trim(),
          data,
          borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
          borderWidth: 2,
          borderDash: styles[key].borderDash,
          fill: false,
          pointStyle: styles[key].pointStyle,
          pointRadius: 5,
        });
      }
    }
    return datasets;
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right' },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: { ticks: { autoSkip: true, maxTicksLimit: 10 } },
      y: {
        min: -100,
        beginAtZero: true,
        title: { display: true, text: 'Valeurs' },
      },
    },
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Application de Gestion du Patrimoine</h1>
      <SimulationForm
        patrimoine={patrimoine}
        setPatrimoine={setPatrimoine}
        checked={checked}
        setChecked={setChecked}
        dateDebut={dateDebut}
        setDateDebut={setDateDebut}
        dateFin={dateFin}
        setDateFin={setDateFin}
        onSubmit={handleSubmit}
      />
      <ChartResult
        dataChart={dataChart}
        options={options}
        loading={loading}
        errorMessage={errorMessage}
        fluxPossible={fluxPossible}
      />
    </div>
  );
}

export default App;
