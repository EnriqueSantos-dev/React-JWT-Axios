/**
 * @param T type value cookie
 */

export function getLocalStorageItem<T = any>(key: string): T | undefined {
	const item = localStorage.getItem(key);

	try {
		if (item) return JSON.parse(item) as T;
	} catch (e) {
		return item as T;
	}

	return undefined;
}

export function setLocalStorageItem(key: string, value: string) {
	localStorage.setItem(key, value);
}

export function deleteKey(key: string) {
	localStorage.removeItem(key);
}
