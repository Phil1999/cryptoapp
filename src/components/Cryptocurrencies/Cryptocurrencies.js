import React, { useState, useEffect } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'

import { useGetCryptosQuery } from '../../services/cryptoApi'

import Loader from '../Loader'

const Cryptocurrencies = ({ simplified }) => {
    const count = simplified ? 10: 100; // Display 10 or 100 results depending on simplified view
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count)
    const [cryptos, setCryptos] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        
        const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
        setCryptos(filteredData)
    }, [cryptosList, searchTerm]) // useEffect will fire when one of those parameters are changed

    if (isFetching) {
        return <Loader />
    }
    
    return (
        <>
            {!simplified && (
                <div className = "search-crypto">
                    <Input placeholder = "Search Cryptocurrency" onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
            )}
            
            <Row gutter={[32, 32]} className = "crypto-card-container">
                {cryptos?.map((currency) => (
                    // For mobile devices
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
                        <Link to = {`/crypto/${currency.id}`}>
                            <Card 
                                title = {`${currency.rank}. ${currency.name}`}
                                extra= {<img className ="crypto-image" src = {currency.iconUrl} alt = "cryptocurrency" />}
                                hoverable
                            >
                                <p> Price: {millify(currency.price)}</p>
                                <p> Market Cap: {millify(currency.marketCap)}</p>
                                
                                { currency.change < 0 ? (
                                    <p>Daily Change: <span style={{color: "red", fontWeight: "bolder"}}>{millify(currency.change)}%</span></p>
                                    ) : (
                                    <p>Daily Change: <span style={{color: "green", fontWeight: "bolder"}}>{millify(currency.change)}%</span></p>
                                )}
                            </Card>
                        </Link>
                    
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Cryptocurrencies
