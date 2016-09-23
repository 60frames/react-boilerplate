'use strict';

const express = require('express');
const router = express.Router();

const QUOTES = [
    'If you want to keep a secret, you must also hide it from yourself.',
    'He who controls the past controls the future. He who controls the present controls the past.',
    'If you want a picture of the future, imagine a boot stamping on a human face—forever.',
    'War is peace. Freedom is slavery.  Ignorance is strength.',
    'Big Brother is Watching You.',
    'Doublethink means the power of holding two contradictory beliefs in one’s mind simultaneously, and accepting both of them.',
    'Until they became conscious they will never rebel, and until after they have rebelled they cannot become conscious.',
    'The choice for mankind lies between freedom and happiness and for the great bulk of mankind, happiness is better.',
    'The Party seeks power entirely for its own sake. We are not interested in the good of others; we are interested solely in power, pure power.',
    'Power is in tearing human minds to pieces and putting them together again in new shapes of your own choosing.',
    'Orthodoxy means not thinking–not needing to think. Orthodoxy is unconsciousness.',
    'For, after all, how do we know that two and two make four? Or that the force of gravity works? Or that the past is unchangeable? If both the past and the external world exist only in the mind, and if the mind itself is controllable – what then?',
    'Power is not a means; it is an end. One does not establish a dictatorship in order to safeguard a revolution; one makes the revolution in order to establish the dictatorship. The object of persecution is persecution. The object of torture is torture. The object of power is power'
];

router.get('/quote', (req, res) => {
    res.json({
        quote: QUOTES[Math.floor(Math.random() * QUOTES.length)]
    });
});

module.exports = router;
