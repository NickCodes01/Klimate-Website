import { Router } from 'express';
const router = Router();
import { calculateCarbonFootprint } from '../data/calculator.js';

router.get('/', (req, res) => {
    res.render('calculator', {partial: 'static_script'});
});

// POST route for calculating carbon footprint
router.post('/', (req, res) => {
    let electricBill = parseInt(req.body.electricBill);
    let gasBill = parseInt(req.body.gasBill);
    let oilBill = parseInt(req.body.oilBill);
    let carMileage = parseInt(req.body.carMileage);
    let shortFlights = parseInt(req.body.shortFlights);
    let longFlights = parseInt(req.body.longFlights);
    let recycleNewspaper = req.body.recycleNewspaper === 'true';
    let recycleMetal = req.body.recycleMetal === 'true';

    let carbonFootprint;
    

    try {
        const userInput = ({
            electricBill: electricBill,
            gasBill: gasBill,
            oilBill: oilBill,
            carMileage: carMileage,
            shortFlights: shortFlights,
            longFlights: longFlights,
            recycleNewspaper: recycleNewspaper,
            recycleMetal: recycleMetal
        })

        carbonFootprint = calculateCarbonFootprint(userInput);
        return res.render('calculator', { 
            electricBill: electricBill,
            gasBill: gasBill,
            oilBill: oilBill,
            carMileage: carMileage,
            shortFlights: shortFlights,
            longFlights: longFlights,
            recycleNewspaper: recycleNewspaper,
            recycleMetal: recycleMetal,
            result: carbonFootprint,
            partial: 'static_script'
         });
     
    } catch (e) {
        return res.status(400).render('calculator', {
            electricBill: electricBill,
            gasBill: gasBill,
            oilBill: oilBill,
            carMileage: carMileage,
            shortFlights: shortFlights,
            longFlights: longFlights,
            recycleNewspaper: recycleNewspaper,
            recycleMetal: recycleMetal,
            error: e,
            result: carbonFootprint,
            partial: 'static_script'
          });
        }

        
    });   

   

export default router;
