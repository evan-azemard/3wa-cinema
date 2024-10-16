const list = document.querySelector('#list');
const url = "https://data.culture.gouv.fr/api/records/1.0/search/?dataset=etablissements-cinematographiques&rows=20";


// Haversine method
const getDistance = (lat1, lon1, lat2, lon2) => {
	const R = 6371; // Rayon de la Terre en km
	const dLat = (lat2 - lat1) * Math.PI / 180;
	const dLon = (lon2 - lon1) * Math.PI / 180;
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
		Math.sin(dLon / 2) * Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return R * c; // Distance en km
}


fetch(url)
	.then(response => response.json())
	.then(response => {
		list.innerHTML = '';

		response.records
			.sort((a,b) => b.fields.fauteuils - a.fields.fauteuils)
			.forEach(cinema => {
				const li = document.createElement('li');
				const name = cinema.fields.nom;
				const armchair = cinema.fields.fauteuils;
				const adress = cinema.fields.adresse;
				const municipality= cinema.fields.commune;
				console.log(cinema.fields);
				li.textContent = `Le cinéma : ${name} contient ${armchair} place. il se trouve à : ${adress}, ${municipality}`
				list.appendChild(li);
			})
	})





/*
const list = document.querySelector('#list');
const url = "https://data.culture.gouv.fr/api/records/1.0/search/?dataset=etablissements-cinematographiques&rows=20";
const btnLocation = document.querySelector('#sort-location');




// Haversine method
const getDistance = (lat1, lon1, lat2, lon2) => {
	const R = 6371; // Rayon de la Terre en km
	const dLat = (lat2 - lat1) * Math.PI / 180;
	const dLon = (lon2 - lon1) * Math.PI / 180;
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
		Math.sin(dLon / 2) * Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return R * c; // Distance en km
}

const getLocation = () => {
	return new Promise((resolve, reject) => {
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition((position) => {
				const longitude = position.coords.longitude;
				const latitude = position.coords.latitude;
				resolve([longitude,latitude]);
			},(error) => {
				console.log('erreur: '+ error);
				reject(error);
			})
		}else{
			console.log('geolocation non disponible');
			reject('geolocation non disponible')
		}
	})
}


const showCinemas = (location) => {
	fetch(url)
		.then(response => response.json())
		.then(response => {
			list.innerHTML = '';
			console.log(response.records);
			response.records
				.sort((a,b) => {
					const distanceA = getDistance(location[0], location[1],a.fields.latitude,a.fields.longitude);
					const distanceB = getDistance(location[0], location[1], b.fields.latitude,b.fields.longitude);
					distanceA - distanceB
				})
				.sort((a,b) => b.fields.fauteuils - a.fields.fauteuils)
				.forEach(cinema => {
					const li = document.createElement('li');
					const name = cinema.fields.nom;
					const armchair = cinema.fields.fauteuils;
					const adress = cinema.fields.adresse;
					const municipality= cinema.fields.commune;
					console.log(cinema.fields);
					li.textContent = `Le cinéma : ${name} contient ${armchair} place. il se trouve à : ${adress}, ${municipality}`
					list.appendChild(li);
				})
		})
}

btnLocation.addEventListener('click', () => {
	getLocation()
		.then(location => {
			showCinemas(location)
		}).catch(error => {
		console.log("erreur de position " + error);
	})
})*/
