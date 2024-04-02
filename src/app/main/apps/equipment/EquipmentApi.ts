import apiService from 'app/store/apiService';
import { PartialDeep } from 'type-fest';
import { showMessage } from '@fuse/core/FuseMessage/fuseMessageSlice';

export const addTagTypes = ['mn_machines', 'mn_machine'] as const;

const EquipmentApi = apiService.enhanceEndpoints({ addTagTypes }).injectEndpoints({
	endpoints: (build) => ({
		getMachines: build.query<GetMachinesApiResponse, GetMachinesApiArg>({
			query: () => ({ url: 'machines/all' }),
			providesTags: ['mn_machines']
		}),
		getMachine: build.query<GetEquipmentApiResponse, GetEquipmentApiArg>({
			query: (queryArg) => ({
				url: `machine/${queryArg.machineId}`
			}),
			providesTags: ['mn_machine']
		}),
		updateMachine: build.mutation<UpdateEquipmentApiResponse, UpdateEquipmentApiArg>({
			query: (queryArg) => ({
				url: `machine/${queryArg.machineId}`,
				method: 'PUT',
				data: queryArg.data
			}),
			async onQueryStarted(id, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(showMessage({ messsage: 'Machine Saved' }));
				} catch (error) {
					dispatch(showMessage({ message: 'Error saving the machine' }));
				}
			},
			invalidatesTags: ['mn_machines', 'mn_machine']
		})
	}),
	overrideExisting: false
});

export default EquipmentApi;
export type GetMachinesApiResponse = /** status 200 OK */ Machine[];
export type GetMachinesApiArg = void;
export type GetEquipmentApiResponse = /** status 200 OK */ Machine;
export type GetEquipmentApiArg = {
	machineId: string;
};

export type UpdateEquipmentApiResponse = unknown;
export type UpdateEquipmentApiArg = {
	machineId: string;
	data: PartialDeep<Machine>;
};

export type Machine = {
	id: number;
	code: string;
	name: string;
	remark: string;
	powerHp: string | null;
	sectionId: number;
	comCode: string;
};

export const { useGetMachinesQuery, useGetMachineQuery, useUpdateMachineMutation } = EquipmentApi;
