import {openCageKey} from "./settings.js"


let out = {}
const message = document.querySelector('#message');
const btn = document.querySelector('#show');
const successfulLookup = position => {
    const { latitude, longitude } = position.coords;
    return fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${openCageKey}`)
        .then(response => response.json())
        .then(console.log, "line 8")
        .then(res => out=res);
}
export const useOut = () =>{
    return {...out}
}
export const getZip = () => {

    // check if the Geolocation API is supported
    if (!navigator.geolocation) {
        message.textContent = `Your browser doesn't support Geolocation`;
        message.classList.add('error');
        return;
    }
}
// handle click event
btn.addEventListener('click', function () {
    // get the current position
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    console.log(useOut())
});


// handle success case
const  onSuccess= (position) =>{
    const {
        latitude,
        longitude
    } = position.coords;
    let output = successfulLookup(position).results
    message.classList.add('success');
    message.textContent = `Your location: (${latitude},${longitude})`;
    console.log(output, "out put")
    return output
}

// handle error case
const onError = () => {
    message.classList.add('error');
    message.textContent = `Failed to get your location!`;
}