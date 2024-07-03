import { useAuthStore } from '../../hooks';

import { Online, Offline } from 'react-detect-offline';

export const Navbar = () => {
	const { startLogout, user } = useAuthStore();

	return (
		<div className="navbar navbar-dark bg-dark mb-4 px-4">
			<span className="navbar-brand">
				<i className="fas fa-calendar-alt"></i>
				&nbsp;
				{user.name}
			</span>

			<Online>
				<span className="text-success">Online</span>
			</Online>
			<Offline>
				<span className="text-danger"> Offline - Las peticiones serán guardadas</span>
			</Offline>

			<button className="btn btn-outline-danger" onClick={startLogout}>
				<i className="fas fa-sign-out-alt"></i>
				&nbsp;
				<span>Salir</span>
			</button>
		</div>
	);
};
