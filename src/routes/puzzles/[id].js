export const get = async ({ params: { id } }) => {
	try {
		const { default: body } = await import(`../../puzzles/${id}.json`);
		return { body };
	} catch (e) {
		return { status: 404 };
	}
};
