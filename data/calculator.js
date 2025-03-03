import {JSDOM} from 'jsdom';
const dom = new JSDOM();
const {document} = dom.window;


export function calculateCarbonFootprint(data) {

  
    const {
        electricBill,
        gasBill,
        oilBill,
        carMileage,
        shortFlights,
        longFlights,
        recycleNewspaper,
        recycleMetal
    } = data;


    const carbonFootprint =
        electricBill * 105 +
        gasBill * 105 +
        oilBill * 113 +
        carMileage * 0.79 +
        shortFlights * 1100 +
        longFlights * 4400 +
        (recycleNewspaper ? 0 : 184) +
        (recycleMetal ? 0 : 166);

    return carbonFootprint;
}

const carbonForm = document.getElementById('carbonForm');

if (carbonForm) {
    const electricBillElement = document.getElementById('electricBill');
    const gasBillElement = document.getElementById('gasBill');
    const oilBillElement = document.getElementById('oilBill');
    const carMileageElement = document.getElementById('carMileage');
    const shortFlightsElement = document.getElementById('shortFlights');
    const longFlightsElement = document.getElementById('longFlights');
    const recycleNewspaperElement = document.getElementById('recycleNewspaper');
    const recycleMetalElement = document.getElementById('recycleMetal');

    const errorContainer = document.getElementById('error-container');
    const errorTextElement =
      errorContainer.getElementsByClassName('text-goes-here')[0];

    const resultContainer = document.getElementById('result-container');
    const resultTextElement =
      resultContainer.getElementsByClassName('text-goes-here')[0];

      carbonForm.addEventListener('submit', (event) => {
        event.preventDefault();

        try {
            // hide containers by default
        errorContainer.classList.add('hidden');
        resultContainer.classList.add('hidden');

        console.log('Electric Bill:', electricBillElement.value);
        console.log('Gas Bill:', gasBillElement.value);
        console.log('Oil Bill:', oilBillElement.value);
        console.log('Car Mileage:', carMileageElement.value);
        console.log('Short Flights:', shortFlightsElement.value);
        console.log('Long Flights:', longFlightsElement.value);
        console.log('Recycle Newspaper:', recycleNewspaperElement.checked);
        console.log('Recycle Metal:', recycleMetalElement.checked);

        const electricBillValue = parseInt(electricBillElement.value);
        const gasBillValue = parseInt(gasBillElement.value);
        const oilBillValue = parseInt(oilBillElement.value);
        const carMileageValue = parseInt(carMileageElement.value);
        const shortFlightsValue = parseInt(shortFlightsElement.value);
        const longFlightsValue = parseInt(longFlightsElement.value);
        const recycleNewspaperValue = recycleNewspaperElement.checked; 
        const recycleMetalValue = recycleMetalElement.checked; 

        const userInput = [
            electricBillValue,
            gasBillValue,
            oilBillValue,
            carMileageValue,
            shortFlightsValue,
            longFlightsValue,
            recycleNewspaperValue,
            recycleMetalValue
        ];
        const carbonFootprint = calculateCarbonFootprint(userInput);
        resultTextElement.textContent = 'Your carbon footprint is ' + carbonFootprint;
        console.log(`${carbonFootprint}`);
        resultContainer.classList.remove('hidden'); // Show the result container
    } catch (e) {
        //const message = typeof e === 'string' ? e : e.message;
        errorTextElement.textContent = e;
        errorContainer.classList.remove('hidden');
    }
});

   
  };

