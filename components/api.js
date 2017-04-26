var api = {
	getRovers() {
		var url = 'http://grouprestapi.com/api/getGroups';
		return fetch(url).then((res) => res.json());
	}
};

module.exports = api;