import React from "react";
import Card from "./Card/Card";


function Orders ( {onAddToFavorite} ){
  return (
    <div className="content p-40">
      <div className='d-flex align-center mb-40 justify-between' >
        <h1>Мои заказы</h1>
      </div>

      <div className="d-flex flex-wrap">
        {[]
          .map((item, index) => (
            <Card />
          ))}
      </div>
    </div>
  )
}
export default Orders