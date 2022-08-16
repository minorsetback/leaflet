import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { icon } from "leaflet"
import { useEffect, useState } from 'react';
import axios from 'axios';
import List from './List';
import { Object } from '../types/types';


const Map = () => {
    const ICON = icon({
        iconUrl: "/marker.png",
        iconSize: [32, 32],
    })

    const [cars, setCars] = useState([])

    useEffect(() => {
        const getCars = async () => {
            const cars = await axios.get("https://raw.githubusercontent.com/waliot/test-tasks/master/assets/data/frontend-1-dataset.json")
            setCars(cars.data)
        }
        getCars()
    }, [])

    return (
        <MapContainer center={[45.438095, 12.319029]} zoom={5} scrollWheelZoom={false}>
            <List cars={cars} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {cars?.map((item: Object) => {
                return (
                    <Marker key={item.id} position={[item.latitude, item.longitude]} icon={ICON}>
                        <Popup>
                            {item.name}
                        </Popup>
                    </Marker>
                )
            })}
        </MapContainer>
    )
}
export default Map