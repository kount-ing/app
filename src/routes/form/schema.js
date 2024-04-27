import { z } from 'zod';

const schema = z
	.object({
		name: z.string().min(1, 'This field is required'),
		type: z.string().min(1, 'This field is required'),
		kountStart: z.number().optional(),
		kountDate: z.string().optional()
	})
	.refine(
		(data) => {
			// Check if type is 'Kountdown' and ensure kountDate is not empty
			if (data.type === 'Kountdown') {
				return !!data.kountDate && data.kountDate.trim().length > 0;
			}
			// No additional conditions need to be checked for 'Kountdown'
			return true;
		},
		{
			message: "Kount Date is required when the type is 'Kountdown'",
			path: ['kountDate'] // Pointing the error to 'kountDate' field
		}
	)
	.refine(
		(data) => {
			// Check if type is 'Number of times' and ensure kountStart is a number
			if (data.type === 'Number of times') {
				return typeof data.kountStart === 'number';
			}
			// No additional conditions need to be checked for 'Number of times'
			return true;
		},
		{
			message: "Kount Start is required when the type is 'Number of times'",
			path: ['kountStart'] // Pointing the error to 'kountStart' field
		}
	);

export default schema;
