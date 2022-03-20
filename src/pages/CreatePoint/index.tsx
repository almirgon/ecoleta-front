import React, {useState, useEffect, ChangeEvent, FormEvent} from "react";
import {useHistory} from "react-router-dom";
import styles from "./CreatePoint.module.css";
import Loading from "../../components/Loading";

import {Map, TileLayer, Marker} from "react-leaflet";
import {LeafletMouseEvent} from "leaflet";

import axios from "axios";
import api from "../../services/api";


interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

const CreatePoint = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
  });

  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0, 0,
  ]);

  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedUf, setSelectedUf] = useState("0");
  const [selectedCity, setSelectedCity] = useState("0");
  const [loading,setLoading] = useState<boolean>(false)
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0, 0,
  ]);

  const history = useHistory();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords;

      setInitialPosition([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados",
      )
      .then(response => {
        const ufInitials = response.data.map(uf => uf.sigla);
        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (selectedUf === "0") {
      return;
    }

    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`,
      )
      .then(response => {
        const cityNames = response.data.map(city => city.nome);
        setCities(cityNames);
      });
  }, [selectedUf]);

  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;
    setSelectedUf(uf);
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;
    setSelectedCity(city);
  }

  function handleMapClick(event: LeafletMouseEvent) {
    setSelectedPosition([event.latlng.lat, event.latlng.lng]);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const {name, value} = event.target;

    setFormData({...formData, [name]: value});
  }

  async function handleSubmit(event: FormEvent) {
    setLoading(true)
    event.preventDefault();

    const {name, email, whatsapp} = formData;
    const uf = selectedUf;
    const city = selectedCity;
    const [latitude, longitude] = selectedPosition;

    const data = {
      name,
      email,
      whatsapp,
      uf,
      city,
      latitude,
      longitude,
    };

    

    alert(JSON.stringify(data, null, 2));
    console.log(data)

    history.push("/");
  }

  return (
    <section className={styles.register}>
      {loading ? <Loading/> :  <div className="forms">
        <h1 className="title">Cadastro do ponto de coleta</h1>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input
              type="text"
              className="input"
              name="name"
              id="name"
              onChange={handleInputChange}
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                className="input"
                name="email"
                id="email"
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input
                type="text"
                name="whatsapp"
                className="input"
                id="whatsapp"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <label >Marque o endereço no mapa</label>
          <Map
            style={{height: "45vh"}}
            center={initialPosition}
            zoom={15}
            onClick={handleMapClick}
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={selectedPosition} />
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select
                name="uf"
                className="input"
                id="uf"
                value={selectedUf}
                onChange={handleSelectUf}
              >
                <option value="0">Selecione uma UF</option>

                {ufs.map(uf => (
                  <option key={uf} value={uf}>
                    {uf}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select
                name="city"
                id="city"
                className="input"
                value={selectedCity}
                onChange={handleSelectCity}
              >
                <option value="0">Selecione uma cidade</option>

                {cities.map(city => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button className="button" type="submit">
            Cadastrar ponto de coleta
          </button>
        </form>
      </div>}
     
    </section>
  );
};

export default CreatePoint;