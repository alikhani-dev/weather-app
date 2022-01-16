import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Error = ({ message, removeError }) => {
	toast.error(message, {
		position: 'bottom-right',
		autoClose: 3000,
		hideProgressBar: false,
		progress: undefined,
		toastId: 1,
		onClose: removeError,
	})

	return <ToastContainer />
}

export default Error
