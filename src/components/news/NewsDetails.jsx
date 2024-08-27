import { useState, useEffect } from "react"
import Header from "../home/Header";
import { useParams } from "react-router-dom"
import { getAllArticles } from "../../services/articles/getAllArticles";
import { deleteArticle } from "../../services/articles/deleteArticle";
import { useNavigate } from "react-router-dom";
import ReactPlayer from 'react-player'
import TextToSpeech from '../TextToSpeech';

export default function NewsDetails() {
    const [news, setNews] = useState()
    const { id } = useParams()
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin") == "true";
    const navigate = useNavigate();

    useEffect(() => {
        loadNews();
    }, []);
    
    function loadNews() {
        getAllArticles(token)
        .then((data) => {
            data.forEach(element => {
                if (element._id == id) {
                    setNews(element)
                }
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    function handleDeleteNews() {
        deleteArticle(news._id, token)
        .then((data) => {
            console.log(data)
            alert("Noticia deletada com sucesso!")
            navigate("/")
        })
        .catch((error) => {
            console.log(error)
        })
    }

    function handleEditNews() {
        navigate(`/admin/update-news/${news._id}`)
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
                    <div className='player-wrapper' style={{marginTop: '16px', marginBottom: '16px'}}>
                        {news.video ? <ReactPlayer url={news.video} controls={true} />: null}
                    </div>

                    <TextToSpeech title={news.title} text={news.text}/>

                    {isAdmin ?
                        <>
                            <button onClick={handleEditNews}>Editar notícia</button>
                            <button onClick={handleDeleteNews}>Apagar notícia</button>
                        </>
                    : <></> 
                    }
                </div>
            : <></> }
        </>
    )
}