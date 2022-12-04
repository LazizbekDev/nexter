import React from 'react';

const RealtorsList = ({img, name, sold}) => {
    return (
        <>
            <img className={'realtors__img'} src={img} alt={'nexter by LazizbekDev'} />

            <div className={'realtors__details'}>
                <h4 className={'heading-4 heading-4--light'}>{name}</h4>
                <p className={'realtors__sold'}>{sold} houses sold</p>
            </div>
        </>
    );
};

export default RealtorsList;