// results.js
const params = new URLSearchParams(window.location.search);
const reportVehicle = document.getElementById('reportVehicle');
const reportDistance = document.getElementById('reportDistance');
const reportEmissions = document.getElementById('reportEmissions');
const reportDate = document.getElementById('reportDate');
const backButton = document.getElementById('backButton');
const printButton = document.getElementById('printButton');
const downloadButton = document.getElementById('downloadButton');

const vehicle = params.get('vehicle');
const distance = params.get('distance');
const emissions = params.get('emissions');
const date = params.get('date');

const createReportText = () => {
  return [
    'Carbon Emissions Report',
    '=========================',
    `Vehicle type: ${vehicle ?? 'N/A'}`,
    `Distance traveled: ${distance ?? 'N/A'} km`,
    `Estimated CO₂ emissions: ${emissions ?? 'N/A'} kg CO₂e`,
    `Generated: ${date ?? new Date().toLocaleString()}`,
    '',
    'Note: This report uses average emission factors for the selected transport mode.',
    'Choose cleaner travel options to reduce your carbon footprint.',
  ].join('\n');
};

if (!vehicle || !distance || !emissions) {
  reportVehicle.textContent = 'No report data found';
  reportDistance.textContent = '—';
  reportEmissions.textContent = '—';
  reportDate.textContent = '—';
  printButton.disabled = true;
  downloadButton.disabled = true;
} else {
  reportVehicle.textContent = vehicle;
  reportDistance.textContent = `${distance} km`;
  reportEmissions.textContent = `${emissions} kg CO₂e`;
  reportDate.textContent = date || new Date().toLocaleString();
}

backButton.addEventListener('click', () => {
  window.location.href = 'carbon_footprint_calculator.html';
});

printButton.addEventListener('click', () => {
  window.print();
});

downloadButton.addEventListener('click', () => {
  const text = createReportText();
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'carbon-emissions-report.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
});
