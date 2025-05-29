import React from 'react'

export default function ProgressBar({ completed }) {
    const containerStyles = {
        height: 20,
        width: '100%',
        backgroundColor: "#e0e0de",
        border: 0,
        borderRadius: "5px",
        marginTop: '10px'
    };

    const fillerStyles = {
        height: '100%',
        width: `${completed}%`,
        backgroundColor: "#404040",
        border: 0,
        borderRadius: '4px',
        textAlign: 'right',
        transition: 'width 0.5s ease-in-out'
    };

    const labelStyles = {
        padding: 5,
        color: 'white',
        fontWeight: 'bold'
    };

    return (
        <div style={containerStyles}>
            <div style={fillerStyles}>
                <span style={labelStyles}>{`${completed}%`}</span>
            </div>
        </div>
    );
}
