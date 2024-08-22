import { useState, useEffect } from "react"
import Header from "../home/Header";
import { useParams } from "react-router-dom"
import { getAllArticles } from "../../services/articles/getAllArticles";

export default function NewsDetails() {
    const [news, setNews] = useState()
    const { id } = useParams()
    const token = localStorage.getItem("token");

    console.log(id)

    useEffect(() => {
        loadNews();
    }, []);
    
    function loadNews() {
        getAllArticles(token)
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
                    <h1 style={{marginTop: '16px', marginBottom: '16px'}}>{news.title}</h1> 
                    <img style={{marginTop: '16px', marginBottom: '16px'}} className="imagem" src={news.image} alt={news.title} />
                    <p style={{whiteSpace: 'pre-line', textAlign: 'justify', textJustify: 'inter-word', fontSize: '18px'}}>
                        {news.text}
                    </p>
                </div>
            : <></> }
        </>
    )
}