import { useState } from "react"
import { useMap } from "react-leaflet"
import { Object } from '../types/types';

const List = ({ cars }: any) => {
    const map = useMap()
    const [activeID, setActiveID] = useState(0)
    const [inputValue, setInputValue] = useState("")
    const filteredCars = cars.filter((car: Object) => {
        return car.name.toLowerCase().includes(inputValue.toLowerCase())
    })

    return (
        <div className='list'>
            <input type="text" placeholder="search" onChange={(e) => setInputValue(e.target.value)} />
            {filteredCars?.map((item: Object) => {
                return (
                    <p key={item.id}
                        onClick={() => {
                            map.setView([item?.latitude, item?.longitude], 10)
                            setActiveID(item.id)
                        }}
                        className={activeID === item.id ? "active" : ""}
                    >
                        {item.name}
                    </p>
                )
            })}
        </div>
    )
}
export default List