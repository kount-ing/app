import { z } from 'zod';

const schema = z.object({
	type: z.string().default('number of times'),
	phrase: z.string().min(1, 'What do you want us to count?'),
	link: z.string().cuid2()
});

export default schema;
