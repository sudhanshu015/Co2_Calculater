// script.js
const vehicleSelect = document.getElementById('vehicle');
const distanceInput = document.getElementById('distance');
const calculateButton = document.getElementById('calculateButton');
const feedback = document.getElementById('feedback');

const buildQuery = (params) => {
  return Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
};

const displayFeedback = (message, isError = false) => {
  feedback.textContent = message;
  feedback.classList.toggle('error', isError);
};

const calculateEmissions = () => {
  const emissionFactor = parseFloat(vehicleSelect.value);
  const distance = parseFloat(distanceInput.value);
  const vehicleLabel = vehicleSelect.options[vehicleSelect.selectedIndex].text;

  displayFeedback('');

  if (Number.isNaN(distance) || distance <= 0) {
    displayFeedback('Please enter a valid distance greater than zero.', true);
    return;
  }

  const emissions = emissionFactor * distance;
  const query = buildQuery({
    vehicle: vehicleLabel,
    distance: distance.toString(),
    emissions: emissions.toFixed(2),
    date: new Date().toLocaleString(),
  });

  window.location.href = `results.html?${query}`;
};

calculateButton.addEventListener('click', calculateEmissions);
distanceInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    calculateEmissions();
  }
});
