import type { Load } from '@sveltejs/kit';
import type { mdData, mdDatas } from '$lib/types';

export const load: Load = async () => {
	//get all files from lib/directions/* using glob
	//for each file, compile it using mdsvex
	//return an array of objects with the compiled mdsvex and the filename

	const markdownFiles = import.meta.glob('/src/lib/regex/*.md');
	const markdownFilesArray = Object.entries(markdownFiles);



	const markdownCompiled = await Promise.all(
		markdownFilesArray.map(async ([path, resolver]) => {
			const resolvedDescription: any = await resolver();
			const { html } = resolvedDescription.default.render();
			const meta = resolvedDescription.metadata;
			const tags = meta?.tags?.split(',').map((tag: string) => tag.trim()) || [];
			return {
				fileName: path.split('/').pop()?.slice(0, -3),
				compiled: html,
				metadata: {
					title: meta?.title,
					description: meta?.description,
					tags: tags,
					regex: meta?.regex,
					testString: meta?.testString
				}
			}

		})
	);

	//map a number to each file
	const markdown = markdownCompiled.map((md, id) => {
		return { id, md } as mdData;
	});


	return { markdown } as unknown as mdDatas;
};
