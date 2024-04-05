export default function mergeData(sourceData, joinData, sourceKey, joinKey, mapColumns = {}) {
	return sourceData.map(source => {
		const join = joinData.find(join => join[joinKey] === source[sourceKey]);
		if (join) {
			if (mapColumns) {
				Object.keys(mapColumns).forEach(key => {
					if (join[mapColumns[key]]) {
						source[key] = join[mapColumns[key]];
					}
				});
			}
			return {
				...source,
				...join,
			};
		}
		else {
			return source;
		}
	});
}