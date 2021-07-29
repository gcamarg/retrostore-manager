import React, { useState } from 'react'
import "./style.css";
export default function Form(){
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
    const [clientPhone, setClientPhone] = useState("");
    const [clientBD, setClientBD] = useState("");
    const [clientZipCode, setClientZipCode] = useState("");
    const [clientState, setClientState] = useState("");
    const [clientCity, setClientCity] = useState("");
    const [clientStreet, setClientStreet] = useState("");
    const [clientHouseNumber, setClientHouseNumber] = useState("");
  
    function handleSubmitClick(e) {
    e.preventDefault();
      let clientList = localStorage.getItem("clientList");
      if (clientList !== null) {
        clientList = JSON.parse(clientList);
        if(clientList.find(client=>client.email===clientEmail) !== undefined){
            alert("Email já foi utilizado!")
            return
        };
    
        clientList.push({name: clientName,
            email: clientEmail,
            phone: clientPhone,
            birthday: clientBD,
            address: {
              zipCode: clientZipCode,
              state: clientState,
              city: clientCity,
              street: clientStreet,
              houseNumber: clientHouseNumber
            }
          });
      } else {
        clientList = [{name: clientName,
          email: clientEmail,
          phone: clientPhone,
          birthday: clientBD,
          address: {
            zipCode: clientZipCode,
            state: clientState,
            city: clientCity,
            street: clientStreet,
            houseNumber: clientHouseNumber
          }
        }];
      }
      localStorage.setItem("clientList", JSON.stringify(clientList));
      alert(`Pronto ${clientName}! Fique atento que vem coisa boa por aí!`)
      setClientEmail('');
      setClientName('');
    }
    // function _onFocus(e){
    //   console.log(e.target.attributes.type.value='date');
    // }
    return(
        <section className="formContainer">
        <p className='p-text'>Cadastre-se agora e receba as melhores ofertas!</p>
        <form onSubmit={handleSubmitClick}>
        <input
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          placeholder="Nome"
          className="input-std"
          required
        />
         <input
          type="email"
          value={clientEmail}
          onChange={(e) => setClientEmail(e.target.value)}
          placeholder="email@email.com"
          className="input-std"
          required
        />
         <input
          type="tel"
          value={clientPhone}
          onChange={(e) => setClientPhone(e.target.value)}
          placeholder="(xx) xxxx-xxxx"
          className="input-std"
          required
        />
         <input
          type="text"
          value={clientBD}
          // onFocus={_onFocus}
          onChange={(e) => setClientBD(e.target.value)}
          placeholder="dd/mm/aa"
          className="input-std"
          required
        />
         <input
          type="email"
          value={clientZipCode}
          name="address[zipCode]"
          type="text" inputMode="numeric"
          onChange={(e) => setClientZipCode(e.target.value)}
          placeholder="XXXXX-XXX"
          maxLength="9"
          className="input-std"
          required
        />
        <div id="state-city">
         <input
          type="text"
          value={clientState}
          onChange={(e) => setClientState(e.target.value)}
          placeholder="UF"
          className="input-std"
          id="state"
          required
          />
         <input
          type="text"
          value={clientCity}
          onChange={(e) => setClientCity(e.target.value)}
          placeholder="Cidade"
          className="input-std"
          id= "city"
          required
          />
          </div>
         <input
          type="text"
          value={clientStreet}
          onChange={(e) => setClientStreet(e.target.value)}
          placeholder="Logradouro"
          name="address[streetName]"
          className="input-std"
          required
        />
         <input
          type="text" inputMode="numeric"
          value={clientHouseNumber}
          onChange={(e) => setClientHouseNumber(e.target.value)}
          placeholder="Núm"
          name="address[streetNumber]" 
          className="input-std"
          required
        />
        <button
          type="submit"
          className="submit-button"
          >
          Cadastrar
        </button>
      </form>
      </section>
    )
}