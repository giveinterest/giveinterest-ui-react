import React from 'react'
import Header from "../Header"
import NewFundPageBody from "../newfund/NewFundPageBody"

const NewFundPage = () => {
    return (
        <div>
            <Header hideCreateLink={true}/>
            <br/>
            <NewFundPageBody/>
        </div>
    )
}

export default NewFundPage
