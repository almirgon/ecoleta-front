import React, {useState, useEffect} from "react";
import styles from "./Collect.module.css";
import {useLocation} from "react-router-dom";
import {Map, TileLayer, Marker, Popup} from "react-leaflet";
import moment from 'moment'

const Collect = () => {
  const location = useLocation();
  const [collectItem, setCollectItem] = useState<any>({});
  useEffect(() => {setCollectItem({...location.state})},[location.state])
  return (
    <div>
      <>
        {Object.values(collectItem).map((item: any, index) => {
          return <div key={index}>
            <div className={styles.infoHeader}>  <h1>{item?.name}</h1>
            <p>{item?.email}</p>
            <p>{item?.whatsapp}</p>
            <p>{item?.city} - {item?.uf}</p>
            <p>Postado em {moment(item?.createdDate).format('DD/MM/YYYY, h:mm a')}</p>
            </div>
          
            <Map
            style={{height: "80vh"}}
            center={[item?.latitude, item?.longitude]}
            zoom={15}
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[item?.latitude, item?.longitude]} > <Popup>
            {item?.name}
        </Popup> </Marker>
          </Map>
          </div>;
        })}
      </>
    </div>
  );
};

export default Collect;
