import React from "react";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import axios from "axios";
import {Route} from 'react-router-dom'
import AppContext from "./context";
import Info from "./components/info";

import Home from "./components/Home";
import Favorites from "./components/Favorites";
import Orders from "./components/Orders";


function App() {
  const [items, setItems] = React.useState ([])
  const [cartItems, setCartItems] = React.useState ([])
  const [favorites, setFavorites] = React.useState ([])
  const [searchValue, setSearchValue] = React.useState ('')
  const [cartOpened, setCartOpened] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      const itemsResponse = await axios.get('https://60d8c024eec56d00174774c1.mockapi.io/items')
      const cartResponse = await axios.get('https://60d8c024eec56d00174774c1.mockapi.io/cart')
      const favoritesResponse = await axios.get('https://60d8c024eec56d00174774c1.mockapi.io/favorites')

      setIsLoading(false)

      setCartItems(cartResponse.data)
      setFavorites(favoritesResponse.data)
      setItems(itemsResponse.data)

    }

    fetchData()
  },[])

    const toggleCart = () => {
      setCartOpened(prev => !prev);
      axios.get('https://60d8c024eec56d00174774c1.mockapi.io/cart').then(res => {
          setCartItems(res.data)
      })
    }

    const onAddToCart = (obj) => {
      if (cartItems.find(item => Number(item.id) === Number(obj.id))) {
        axios.delete(`https://60d8c024eec56d00174774c1.mockapi.io/cart/${obj.id}`)
        setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
    } else {
        axios.post('https://60d8c024eec56d00174774c1.mockapi.io/cart', obj);
            setCartItems(prev => [...prev, obj])
      }
    }

    const onRemoveItem = (id) => {
        axios.delete(`https://60d8c024eec56d00174774c1.mockapi.io/cart/${id}`)
        // console.log(id)
        setCartItems((prev) => prev.filter(item => item.id !== id ))
    }

    const onAddToFavorite = async (obj) => {
      try {
        if (favorites.find(favObj => favObj.id === obj.id)) {
          axios.delete(`https://60d8c024eec56d00174774c1.mockapi.io/favorites/${obj.id}`)
        } else {
          const { data } = await axios.post(`https://60d8c024eec56d00174774c1.mockapi.io/favorites`, obj)

          setFavorites(prev => [...prev, data])
        }
      } catch (error){
        alert('Не удалось добавить в фавориты')
      }
    }

    const onChangeSearchInput = (event) => {
      setSearchValue(event.target.value)
    }

    const isItemAdded = (id) => {
      return cartItems.some(obj => Number(obj.id) === Number(id))
    }

  return (
    <AppContext.Provider
      value={{items, cartItems, favorites, isItemAdded, onAddToFavorite, setCartOpened, setCartItems}}
    >
      <div className='wrapper clear'>

        <Header onClickCart={toggleCart} />

        <Route path="/" exact>
          <Home
            items={items}
            cartItems={cartItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToFavorite={onAddToFavorite}
            onAddToCart={onAddToCart}
            isLoading={isLoading}
          />
        </Route>

        <Route path="/favorites" exact>
          <Favorites
            items={favorites}
            onAddToFavorite={onAddToFavorite}
          />
        </Route>

        <Route path="/orders" exact>
          <Orders/>
        </Route>


        {cartOpened? <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}/> : null}
      </div>
    </AppContext.Provider>
  )
}

export default App;
