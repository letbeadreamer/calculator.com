// calc.js
let history = JSON.parse(localStorage.getItem('calculatorHistory')) || [];

document.addEventListener('DOMContentLoaded', function () {
    updateHistoryList();
});

function clearDisplay() {
    document.forms[0].display.value = '';
}

function deleteLast() {
    document.forms[0].display.value = document.forms[0].display.value.slice(0, -1);
}

function appendToDisplay(value) {
    document.forms[0].display.value += value;
}


function calculateAndSave() {
    try {
        const calculation = document.forms[0].display.value;
        const result = eval(calculation);

        if (!isNaN(result) && calculation !== '') {
            document.forms[0].display.value = result; // Set the result to the display
        } else {
            throw new Error('Invalid calculation');
        }
    } catch (error) {
        console.error('Error calculating result:', error.message);
    }
}

function saveToHistory() {
    const calculationName = document.getElementById('calculationName').value;
    const calculation = document.forms[0].display.value;

    if (calculationName && calculation) {
        const existingIndex = history.findIndex(item => item.calculation === calculation);

        if (existingIndex !== -1) {
            // Update existing entry if the calculation already exists
            history[existingIndex] = {
                name: calculationName,
                calculation: calculation,
                result: eval(calculation)
            };
        } else {
            // Add a new entry if the calculation does not exist
            const historyItem = {
                name: calculationName,
                calculation: calculation,
                result: eval(calculation)
            };
            history.unshift(historyItem); // Add to the beginning of the array
        }

        updateHistoryList();
        clearDisplay();
        saveHistoryToLocalStorage();
    }
}


function updateHistoryList() {
    const historyList = document.getElementById('historyList');

    if (historyList) {
        historyList.innerHTML = '';

        history.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${item.name}:</strong><br>Calculation: ${item.calculation}<br>Value: ${item.result}`;
            historyList.appendChild(listItem);
        });
    }
}

function saveHistoryToLocalStorage() {
    localStorage.setItem('calculatorHistory', JSON.stringify(history));
}

function clearHistory() {
    history = [];
    updateHistoryList();
    saveHistoryToLocalStorage();
}
function goToHistoryPage() {
    calculateAndSave(); // Ensure the current calculation is saved before navigating
    window.location.href = 'history.html';
}

function goToCalculatorPage() {
    window.location.href = 'index.html';
}
