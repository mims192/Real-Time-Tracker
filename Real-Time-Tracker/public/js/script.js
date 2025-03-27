const socket=io()  //this send a connection request to backend

if(navigator.geolocation){  //navigator is inbuilt in window obj
    navigator.geolocation.watchPosition((position)=>{                //whenver guy moves watch its position  //position is what is the actul value of its position(lat)
        const {latitude,longitude}=position.coords;              //extract position coords and send in backend
        socket.emit("send-location",{latitude,longitude})       //an event??
    },(error)=>{
        console.log(error)
    },{
        enableHighAccuracy:true,  //true means it will give you the exact location
        maximumAge:0, //no caching of the guy //dont give saved data ,actual real time data dena hai
        timeout:5000   //recheck after every 5 sec location
    })        

}

const map=L.map("map").setView([0,0],10)      //L.map is give your loaction access,(0,0 ) map is centered at this by setting coordinates(lat,long) of earth and 10 is zoom level

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "openstreetmap"
}).addTo(map)

const markers={};

socket.on("recieved-location", (data) => {   // we got location again now from backend
    const { id, latitude, longitude } = data;   //extract data
    map.setView([latitude, longitude], 16);          //it will like centre the map to that lat/lang with zoom level 16
    if (markers[id]) {                                //if the user with this id already exists then update its lat/lang
        markers[id].setLatLng([latitude, longitude]);
    }
    else {
        markers[id] = L.marker([latitude, longitude]).addTo(map);    //else set a new marker at that lat/lang and add map is adding to map
    }
});

socket.on("user-disconnected", (id) => {
    if (markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id];
    }
});

