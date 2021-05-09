const Card1 = ({ item, i }) => {
  return (
    <div className="card" key={i}>
      <div className="card__image">
        <img
          src="https://thumbs.dreamstime.com/b/farm-graphic-black-white-landscape-sketch-vector-farmer-looking-field-illustration-124654842.jpg"
          alt=""
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
      </div>

      <div className="card__info">
        <button className="btn">Use Template</button>
      </div>
    </div>
  );
};

const TemplateList = ({ data }) => {
  return (
    <div className="cards">
      {data.map((item, i) => (
        <Card1 item={item} i={i} />
      ))}
    </div>
  );
};

export default TemplateList;
