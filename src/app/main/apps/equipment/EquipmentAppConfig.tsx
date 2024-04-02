import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const EquipmentApp = lazy(() => import('./EquipmentApp'));
const Machines = lazy(() => import('./machines/Machines'));

const EquipmentAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/equipment',
			element: <EquipmentApp />,
			children: [
				{
					path: '',
					element: <Navigate to="/apps/equipment/machines" />
				},
				{
					path: 'machines',
					element: <Machines />
				}
			]
		}
	]
};

export default EquipmentAppConfig;
