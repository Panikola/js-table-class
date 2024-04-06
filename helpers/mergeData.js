export default function mergeData(sourceData, joinData, sourceKey, joinKey, mapColumns = {}) {
	// Объект для сопоставления
	const joinDataMap = joinData.reduce((acc, item) => {
		acc[item[joinKey]] = item;
		return acc;
	}, {});

	return sourceData.map(sourceItem => {
		const joinItem = joinDataMap[sourceItem[sourceKey]];

		if (joinItem) {
			// Если есть сопоставление, объединяем данные
			const mergedItem = {
                ...sourceItem,
                ...joinItem,
            };
			// Применяем mapColumns, если указаны
			if (Object.keys(mapColumns).length) {
				Object.keys(mapColumns).forEach(key => {
					if (joinItem[mapColumns[key]]) {
						mergedItem[key] = joinItem[mapColumns[key]];
					}
				});
			}

			return mergedItem;
		}
		else {
			return sourceItem;
		}
	});
}