import update from 'immutability-helper';

update.extend('$auto', (value, object) => ((object) 
	? update(object, value)
	: update({}, value))
);

update.set = (obj, path, value) => {

	const pathMap = {};
	let pathPointer = pathMap;

	const pathArray = path.split('.');

	pathArray.forEach((item, idx) => {
		if (idx === pathArray.length - 1) {
			pathPointer['$auto'] = { [item]: { $set: value } };
		}
		else {
			const temp = {};
			pathPointer['$auto'] = { [item]: temp };
			pathPointer = temp;
		}
	});

	return update(obj, pathMap);
};

export default update;