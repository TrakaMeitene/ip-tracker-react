import React from "react";
import "./App.css";
import { Map, Overlay } from "pigeon-maps";

class App extends React.Component {
  state = {
    ISP: "SIA Tet",
    asn: 12578,
    timezone: "+2.00",
    location: {
      region: "LV",
      country: "Riga",
      lat: 56.946,
      lng: 24.10589,
    },
    ipAdress: "46.109.132.59",
    inputAdress: "",
  };

  onChange = (e) => {
    this.setState({ inputAdress: e.target.value });
  };

  getData = () => {
    const { inputAdress } = this.state;
   let url = ""
    if (inputAdress.match(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/)) {
   url = "https://geo.ipify.org/api/v2/country,city?apiKey=at_iGIlBISTa3v62WCDLoRZgzSts7JRC&ipAddress="
    } else {
      url = "https://geo.ipify.org/api/v2/country,city?apiKey=at_iGIlBISTa3v62WCDLoRZgzSts7JRC&domain="
    }

    fetch(
      url + inputAdress
    )
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          ipAdress: data.ip,
          ISP: data.isp,
          asn: data.as.asn,
          location: {
            region: data.location.region,
            country: data.location.country,
            lat: data.location.lat,
            lng: data.location.lng,
          },
          timezone: data.location.timezone,
        })
      );
  };

  render() {
    const { ipAdress, ISP, location, timezone, asn } = this.state;

    return (
      <div>
        <div className="header">
          <h1>IP Address Tracker</h1>
          <div className="row">
            <input
              className="ip-adress"
              placeholder="Search for any IP addresses or domain"
              onChange={this.onChange}
            />
            <div className="arrow" onClick={this.getData}></div>
          </div>
        </div>
        <div className="data-window">
          <div className="text">
            <h4>IP ADRESS</h4>
            <p>{ipAdress}</p>
          </div>
          <div className="divider"></div>
          <div className="text">
            <h4>LOCATION</h4>
            <p>
              {location.region},{location.country} {asn}
            </p>
          </div>
          <div className="divider"></div>
          <div className="text">
            <h4>TIME ZONE</h4>
            <p>{timezone !== "" ? "UTC" + " " + timezone : ""}</p>
          </div>
          <div className="divider"></div>
          <div className="text">
            <h4>ISP</h4>
            <p>{ISP}</p>
          </div>
        </div>

        <div className="container">
          <Map height="" center={[location.lat, location.lng]} defaultZoom={13}>
            <Overlay anchor={[location.lat, location.lng]} offset={[22, 60]}>
              <svg xmlns="http://www.w3.org/2000/svg" width="46" height="56">
                <path
                  fill-rule="evenodd"
                  d="M39.263 7.673c8.897 8.812 8.966 23.168.153 32.065l-.153.153L23 56 6.737 39.89C-2.16 31.079-2.23 16.723 6.584 7.826l.153-.152c9.007-8.922 23.52-8.922 32.526 0zM23 14.435c-5.211 0-9.436 4.185-9.436 9.347S17.79 33.128 23 33.128s9.436-4.184 9.436-9.346S28.21 14.435 23 14.435z"
                />
              </svg>
            </Overlay>
          </Map>
        </div>
      </div>
    );
  }
}

export default App;
