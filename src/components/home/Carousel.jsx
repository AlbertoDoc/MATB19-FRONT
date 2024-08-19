import React from "react";

/**
 * Componente Carousel
 *
 * Este componente representa o Carousel exibido na página Places.
 *
 */

export default function Carousel({ newsList }) {

  return (
    <section className="carousel slide" id="carousel">
      <div className="carousel-inner">
        {newsList !== undefined &&
          newsList.map((news, index) => (
            <div
              key={index}
              className={
                "carousel-item section" + (index == 0 ? " active" : "")
              }
            >
              <h1 className="mainTitle">{news.name}</h1>
              <div className="container-carousel">
                <img className="imagem" src={news.image} alt={news.name} />
                <p className="descricao">{news.description}</p>
              </div>
            </div>
          ))}

        <button
          className="carousel-control-prev"
          data-bs-target="#carousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button
          className="carousel-control-next"
          data-bs-target="#carousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon icon"></span>
        </button>
      </div>
    </section>
  );
}
