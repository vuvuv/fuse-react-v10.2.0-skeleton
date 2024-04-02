import FusePageSimple from '@fuse/core/FusePageSimple';
import FuseLoading from '@fuse/core/FuseLoading';
import { useThemeMediaQuery } from '@fuse/hooks';
import { ChangeEvent, useEffect, useState } from 'react';
import { Box, Typography, Theme, TextField } from '@mui/material';
import { motion } from 'framer-motion';
import _ from 'lodash';

import { Machine, useGetMachinesQuery } from '../EquipmentApi';

function Machines() {
	const { data: machines, isLoading } = useGetMachinesQuery();

	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	const [filterData, setFilterData] = useState<Machine[]>(machines);
	const [searchText, setSearchText] = useState('');

	useEffect(() => {
		function getFilteredArray() {
			if (machines && searchText.length === 0) {
				return machines;
			}

			return _.filter(machines, (item) => {
				return item.name.toLowerCase().includes(searchText.toLowerCase());
			});
		}

		if (machines) {
			setFilterData(getFilteredArray());
		}
	}, [machines]);

	function handleSearchText(event: ChangeEvent<HTMLInputElement>) {
		setSearchText(event.target.value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	return (
		<FusePageSimple
			header={
				<Box
					className="relative overflow-hidden flex shrink-0 items-center justify-center px-16 py-32 md:p-64"
					sx={{
						backgroundColor: 'primary.main',
						color: (theme: Theme) => theme.palette.getContrastText(theme.palette.primary.main)
					}}
				>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{
							opacity: 1,
							transition: {
								delay: 0
							}
						}}
					>
						<div className="flex flex-col items-center justify-center  mx-auto w-full">
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1, transition: { delay: 0 } }}
							>
								<Typography
									color="inherit"
									className="text-18 font-semibold"
								>
									Equipment
								</Typography>
							</motion.div>
						</div>
					</motion.div>
				</Box>
			}
			content={
				<div className="flex flex-col flex-1 w-full mx-auto px-24 pt-24 sm:p-40">
					<div className="flex flex-col shrink-0 sm:flex-row items-center justify-between space-y-16 sm:space-y-0">
						<div className="flex flex-col sm:flex-row w-full sm:w-auto items-center space-y-16 sm:space-y-0 sm:space-x-16">
							<TextField
								label="Search for a course"
								placeholder="Enter a keyword..."
								className="flex w-full sm:w-256 mx-8"
								value={searchText}
								inputProps={{
									'aria-label': 'Search'
								}}
								onChange={handleSearchText}
								variant="outlined"
								InputLabelProps={{
									shrink: true
								}}
							/>
						</div>
						{filterData &&
							(filterData.length > 0 ? (
								<div>
									{filterData.map((item) => {
										return <div key={item.id}>{item.name} </div>;
									})}
								</div>
							) : (
								<div className="flex flex-1 items-center justify-center">
									<Typography
										color="text.secondary"
										className="text-24 my-24"
									>
										No machines found!
									</Typography>
								</div>
							))}
					</div>
				</div>
			}
			scroll={isMobile ? 'normal' : 'page'}
		/>
	);
}

export default Machines;
