import React from 'react'

const PageTitle = ({ title }: { title: string }) => {
    return (
        <div className=" text-center">
            <h1 className="text-3xl py-2">
                <b>{title}</b>
            </h1>
        </div>
    )
}

export default PageTitle