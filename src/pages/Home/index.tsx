import React, {useState, useEffect} from "react";
import styles from "./Home.module.css";
import Loading from "../../components/Loading";
import Card from "../../components/Card";
import {useHistory} from 'react-router-dom'
import api from '../../services/api'

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
    api.get('/all').then(({data,status}) => {if(status === 200){
      setItems(data.response)
      setLoading(false)
    }})
    
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
          <h1 className={styles.title}>Seja bem vindo ao Donate</h1>
          <p className={styles.subtitle}>
            Ajudamos pessoas a encontrarem pontos de doação de forma eficiente.
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
