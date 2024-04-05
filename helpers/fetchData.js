export default async function fetchJson(url) {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
        return response.json();
	}
	catch (error) {
		console.error('Error fetching data:', error);
		throw error;
	}
}