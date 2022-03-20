import React, {useState, useEffect} from "react";
import styles from "./Home.module.css";
import Loading from "../../components/Loading";
import Card from "../../components/Card";
import {useHistory} from 'react-router-dom'

interface Item {
  name?: string;
  email?: string;
  whatsapp?: string;
  uf?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
}

const Home = () => {

  const [items,setItems] = useState<Item[]>([])
  const [loading,setLoading] = useState<boolean>(false);
  const history = useHistory();

  useEffect(() => {
    setLoading(true)
    const mock = [
      {
        id: 1,
        name: "Coleta de Lixo Eletronico",
        email: "eletronico@gmail.com",
        whatsapp: "83 99999-9999",
        uf: "PB",
        city: "João Pessoa",
        latitude: -7.11532,
        longitude: -34.861,
      },
      {
        id: 2,
        name: "Coleta de Roupas para Desabrigados",
        email: "desabrigadosrj@gmail.com",
        whatsapp: "12 66666-9999",
        uf: "RJ",
        city: "Rio de Janeiro",
        latitude: -22.9035,
        longitude: -43.2096,
      },
      {
        id: 3,
        name: "Coleta de Material Reciclavel",
        email: "reclica_recife@hotmail.com",
        whatsapp: "81 99999-7777",
        uf: "PE",
        city: "Recife",
        latitude: -8.05428,
        longitude: -34.8813,
      },
      {
        id: 4,
        name: "Coleta de Alimentos para atingidos pelas enchentes",
        email: "petropolis@outlook.com",
        whatsapp: "83 88888-6666",
        uf: "RJ",
        city: "Petropolis",
        latitude: -22.5046,
        longitude: -43.1823,
      },
      {
        id: 5,
        name: "Coleta de Sapatos",
        email: "sapatoaqui@gmail.com",
        whatsapp: "23 66655-9856",
        uf: "BA",
        city: "Salvador",
        latitude: -12.9704,
        longitude: -38.5124,
      },
    ];
    setItems(mock)
    setLoading(false)
  }, [])

  const handleClick = (item) => {
    history.push(`/coleta/${item.id}`, {
      state: item
    })
  }

  return (
    <section className={styles.home}>
      {loading ? <Loading/> : <div className="forms">
        <div>
          <h1 className={styles.title}>Seja bem vindo ao Ecoleta</h1>
          <p className={styles.subtitle}>
            Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
          </p>
        </div>
        <div className={styles.cards}>{items.map((item: Item, index) => {
          return (<Card onClick={() => {handleClick(item)}} key={index} item={item}></Card>)
        })}</div>
        
      </div>}
      
    </section>
  );
};

export default Home;
