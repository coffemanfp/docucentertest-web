import React, { useState } from 'react'
import './Dashboard.scss'
import Search from '../_components/Search/Search'
import ProductBuilder from '../_components/ProductBuilder/ProductBuilder'
import Product from '../_components/Product/Product'
import { useLoaderData, useNavigate } from 'react-router-dom'

export default function Dashboard() {
    const [products, setProducts] = useState(useLoaderData())
    let content = []
    const orderedProducts = products.slice().sort((a, b) => new Date(b.joined_at) - new Date(a.joined_at))
    orderedProducts.map(t => {
        content.push(<Product key={t.id} product={t}></Product>)
    })
    const navigate = useNavigate()
    const logOut = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <div className="dashboard">
            <header className="dashboard__header">
                <Search className={"dashboard__search"} setProducts={setProducts} />
            </header>
            <div className="dashboard__container">
                <aside className="dashboard__aside">
                    {<ProductBuilder />}
                </aside>
                <main className="dashboard__main">
                    <div className="dashboard__products">
                        {content}
                    </div>
                </main>
            </div>
            <footer className="dashboard__footer">
                <button className="dashboard__button dashboard__button--log-out" onClick={() => logOut()}>Log out</button>
            </footer>
        </div>
    )
}
