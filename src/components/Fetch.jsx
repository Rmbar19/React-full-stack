import { useEffect, useState } from 'react';
let listItem ='';
export const Fetch = ({ url, updates }) => {
        const [fetcher, setFetcher] = useState([]);
        let [newItem, setNewItem] = useState([]);
        useEffect(() => {
                fetch('http://localhost:4001/aoe')

                        .then(res => res.json())
                        .then(data => {

                                setFetcher(data.structures)
                        }
                        )
        }, []);

        return (
                <div className="objects">
                        {/* {console.log(fetcher.structures, "fetcher.structures")} */}
                        {fetcher.map((building) => {
                                return (
                                        <div className="building">
                                                <h2 onClick={() => {
                                                        updates(building.name)
                                                        fetch('http://localhost:4001/build', {
                                                                method: 'POST',
                                                                headers: {
                                                                        'Content-Type': 'application/json'
                                                                },
                                                                body: JSON.stringify({
                                                                        name: building.name
                                                                })
                                                        }
                                                        )
                                                                .then((res) => res.json())
                                                }

                                                }>{building.name}</h2>
                                                <div>Age: {building.age}</div>
                                                <div>Build time: {building.build_time}</div>
                                                {/* <div>{building.cost}</div> */}
                                                <div>HP: {building.hit_points}</div>
                                                <div>Armor: {building.armor}</div>
                                                <div>Line of Sight: {building.line_of_sight}</div>
                                        </div>
                                        //  cost, line of sight

                                )
                        }
                        )}

                </div>
        )




}









