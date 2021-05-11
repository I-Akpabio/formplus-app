import React from 'react'
import { ECOMMERCE_URL } from '../utils/url-constants'

const getImage = (category) => {
	let index = Math.floor(Math.random()*category.length);
  if(category[index] === "Education"){
    return "https://i.pinimg.com/originals/73/62/58/736258aab5aa38c704cee896c09b0f63.jpg"
  } else if(category[index] === "Health") {
    return "https://i.pinimg.com/originals/fc/47/15/fc47159c3fad07de704e8baf407de41c.jpg";
  } else if (category[index] === "E-commerce") {
      return ECOMMERCE_URL;
  }
}

const TemplateList = ({ data }) => {
  return (
    <div className="cards">
      {data.map((item, i) => (
        <div className="card" key={i}>
		      <div className="card__image">
		        <img
		          src={getImage(item.category)}
		          alt="Hello"
		          style={{ width: "100%", height: "100%" }}
		        />
		      </div>
		      <div className="card__content">
		        <div>
		          {item.category.map((cat, j) => (
		           <span className="tag" key={j}>{cat}</span>
		          ))}
		        </div>

		        <h3>{item.name}</h3>
		        <p>{item.description}</p>
		        <p>{new Date(item.created).toDateString()}</p>
		      </div>

		      <div className="card__info">
		        <button className="btn">Use Template</button>
		      </div>
		    </div>
      ))}
    </div>
  );
};

export default  React.memo(TemplateList);
