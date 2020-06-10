import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";

import api from "../../services/api";
import axios from "axios";

import Logo from "../../assets/logo.svg";
import "./styles.css";

// array ou objeto: sempre que for eles temos que informar o tipo manualmente;

interface Items {
  id: number;
  title: string;
  image: string;
}

interface IBGEUFResults {
  sigla: string;
}

interface IBGECityResults {
  nome: string;
}

const CreatePoints: React.FC = () => {

  const [items, setItems] = useState<Items[]>([]);
	const [ufs, setUfs] = useState<string[]>([]);
	const [cities, setCities] = useState<string[]>([]);

	const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		whatsapp: '',
	});

	const [selectedUf, setSelectedUf] = useState('0');
	const [selectedCity, setSelectedCity] = useState('0');
	const [selectedItem, setSelectedItem] = useState<number[]>([]);
	const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);


  useEffect(() => {
    api.get("items").then((results) => {
      setItems(results.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get<IBGEUFResults[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados`
      )
      .then((results) => {
        const UfsIntitial = results.data.map((uf) => uf.sigla);

        setUfs(UfsIntitial);
      });
  }, []);

  useEffect(() => {
		axios
			.get<IBGECityResults[]>(
				`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
			)
			.then((results) => {
        const citiesName = results.data.map((city) => city.nome);

        setCities(citiesName);
			});
	}, [selectedUf]);


  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    });
  }, []);

  const history = useHistory();

  // ouvindo mudança do select
  function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;

    setSelectedUf(uf);
  }

  function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;

    setSelectedCity(city);
  }

  function handleMapClick(event: LeafletMouseEvent) {
    setSelectedPosition([event.latlng.lat, event.latlng.lng]);
  }

  function handleSelectedItems(id: number) {
    const alreadySelected = selectedItem.findIndex((item) => item === id);

    if (alreadySelected >= 0) {
      // se passar por essa condição que dizer que esta clicando pela segunda vez no mesmo item , portando ele desmarcou a opção;
      const filteredItems = selectedItem.filter((item) => item !== id);

      setSelectedItem(filteredItems);
    } else {
      setSelectedItem([...selectedItem, id]);
    }
  }

  // ouvindo o que estamos escrevendo e passando para um estado;
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event: FormEvent) {
      event.preventDefault();

      const { name, email, whatsapp } = formData;
      const city = selectedCity;
      const uf = selectedUf;
      const item = selectedItem;
      const [latitude, longitude] = selectedPosition;

      const data = {
        name,
        email,
        whatsapp,
        city,
        uf,
        latitude,
        longitude,
        item,
      };

      await api.post("points", data);

      alert("Funcionou malandro");

      history.push("/");
  }

  return (
    <div id="page-create-point">
      <header>
        <img src={Logo} alt="Ecoleta" />

        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </header>

      <form onSubmit={handleSubmit}>
        <h1>
          Cadastro de <br /> ponto de coleta
        </h1>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleInputChange}
            />
          </div>

          <div className="field-group ">
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input
                type="text"
                name="whatsapp"
                id="whatsapp"
                onChange={handleInputChange}
              />
            </div>

            <div className="field">
              <label htmlFor="email">email</label>
              <input
                type="text"
                name="email"
                id="email"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>

            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={selectedPosition} />
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado(uf)</label>
              <select
                name="uf"
                id="uf"
                value={selectedUf}
                onChange={handleSelectedUf}
              >
                <option value="0">Selecione o endereço no mapa</option>

                {ufs.map((uf) => (
                  <option value={uf} key={uf}>
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
                value={selectedCity}
                onChange={handleSelectedCity}
              >
                <option value="0">Selecione uma cidade</option>

                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Ítens de coleta</h2>

            <span>Selecione um ou mais itens abaixo</span>
          </legend>

          <ul className="items-grid">
            {items.map((item) => (
              <li
                key={item.id}
                onClick={() => {
                  handleSelectedItems(item.id);
                }}
                className={selectedItem.includes(item.id) ? "selected" : ""}
              >
                <img src={item.image} alt={item.title} />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </fieldset>

        <button type="submit">Criar ponto de coleta</button>
      </form>
    </div>
  );
};

export default CreatePoints;
