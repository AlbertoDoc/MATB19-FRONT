import { useState, useEffect } from "react"
import Header from "../home/Header";
import { useParams } from "react-router-dom"
import { getAllPlaces } from "../../services/places/getAllPlaces";

export default function NewsDetails() {
    const [news, setNews] = useState()
    const { id } = useParams()
    const token = localStorage.getItem("token");

    console.log(id)

    useEffect(() => {
        loadNews();
    }, []);
    
    function loadNews() {
        getAllPlaces(token)
        .then((data) => {
            console.log(data);
            data.forEach(element => {
                if (element._id == id) {
                    setNews(element)
                    console.log(element)
                }
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <>
            <Header />
            { news ?
                <div style={{ marginLeft: '16px', marginRight: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h1 style={{marginTop: '16px', marginBottom: '16px'}}>{news.name}</h1> 
                    <img style={{marginTop: '16px', marginBottom: '16px'}} className="imagem" src={news.image} alt={news.name} />
                    <p style={{whiteSpace: 'pre-line', textAlign: 'justify', textJustify: 'inter-word', fontSize: '18px'}}>
                        {news.description}
                    </p>
                </div>
            : <></> }
        </>
    )
}