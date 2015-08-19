// import React from 'react';

import style from './boilerplate.css';

// var Boilerplate = React.createClass({
//     render: function() {
//         return (
//             <div>
//                 <h1 className={style.title}>react-boilerplate</h1>
//                 <p className={style.description}>
//                     A React and Webpack boilerplate.
//                 </p>
//                 <div className={style.logo}></div>
//             </div>
//         );
//     }
// });

function Boilerplate() {

}

Boilerplate.prototype.sum = function doSomething(a, b) {
    return a + b;
};

export default Boilerplate;
