import {motion} from 'framer-motion';

const RealtorsList = ({img, name, sold, delay}) => {
    return (
        <>
            <motion.img
                initial={{y: "-100%", opacity: 0}}
                whileInView={{y: "0%", opacity: 1}}
                transition={{duration: 0.5, delay: delay}}
                className={'realtors__img'} src={img} alt={'nexter by LazizbekDev'} />

            <motion.div
                initial={{y: "-100%", opacity: 0}}
                whileInView={{y: "0%", opacity: 1}}
                transition={{duration: 0.5, delay: 0.3}}
                className={'realtors__details'}>
                <h4 className={'heading-4 heading-4--light'}>{name}</h4>
                <p className={'realtors__sold'}>{sold} houses sold</p>
            </motion.div>
        </>
    );
};

export default RealtorsList;