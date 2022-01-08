import { transitions, positions, Provider as AlertProvider } from 'react-alert';


const options = {
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '30px',
    transition: transitions.SCALE,
};
const AlertTemplate = ({ options, message }) => {
    return (
        <div className='mb-4 p-3.5 w-max flex justify-between rounded bg-black'>
            {options.type === 'error' && <img className='w-4' src="images/alert/error.svg" />}
            {options.type === 'success' && <img className='w-4' src="images/alert/success.svg" />}
            {options.type === 'info' && <img className='w-4' src="images/alert/success.svg" />}
            <div className='ml-4 text-white text-base font-josefin'>{message}</div>
        </div>
    )
}


export { options, AlertTemplate, AlertProvider }