/*
|--------------------------------------------------------------------------
| Notification Bell and Alert Banner
|--------------------------------------------------------------------------
|
| Created the bell notification 'dot' using JS.
| I used the random math function to generate a number from 1-5, and used this for both the alert banner text
| and the bell notification. 
|
*/

const alertBanner = document.querySelector('#alert');
let randomNumber = Math.floor(Math.random() * 5) + 1;
const loginBell = document.querySelector('.login-bell');
let notification = document.createElement('span');

// create bell notification dot
let number = document.createTextNode(`${randomNumber}`);
notification.appendChild(number);
notification.classList.add('notifications');
loginBell.appendChild(notification);

// create the html for the banner
alertBanner.innerHTML = `<div class="alert-banner">
      <p><strong>Alert:</strong> You have <strong> ${randomNumber} </strong> overdue task(s) to complete</p>
      <p class="alert-banner-close">x</p>
  </div>`;

alertBanner.addEventListener('click', (event) => {
	const element = event.target;
	if (element.classList.contains('alert-banner-close')) {
		alertBanner.style.visibility = 'hidden';
	}
});

/*
|--------------------------------------------------------------------------
| Chart.js
|--------------------------------------------------------------------------
|
| Created 3 charts (line, bar, doughtnut) using supplied data. Adjusted various options like lineTension, point 
| styling, and colour. Reordered the doughnut data to match closer to the mockup. 
|
*/

// traffic chart (line)
let trafficCanvas = document.getElementById('traffic-chart');

let trafficData = {
	labels: [ '16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31' ],
	datasets: [
		{
			data: [ 750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500 ],
			backgroundColor: 'rgba(116, 119, 191, .3)',
			borderColor: 'rgb(116, 119, 191)',
			borderWidth: 1,
			lineTension: 0,
			pointBorderColor: 'rgb(116, 119, 191)',
			pointBackgroundColor: 'white',
			pointBorderWidth: 2,
			pointRadius: 5
		}
	]
};

let trafficOptions = {
	aspectRatio: 2.5,
	animation: { duration: 0 },
	scales: {
		yAxes: [
			{
				ticks: {
					beginAtZero: false,
					stepSize: 500,
					suggestedMin: 500,
					suggestedMax: 2500
				},
				gridLines: {
					offsetGridLines: true
				}
			}
		],
		xAxes: [
			{
				gridLines: {
					offsetGridLines: true
				}
			}
		]
	},
	legend: { display: false }
};

let trafficChart = new Chart(trafficCanvas, {
	type: 'line',
	data: trafficData,
	options: trafficOptions
});

// daily traffic chart (bar)

const dailyCanvas = document.getElementById('daily-chart');

const dailyData = {
	labels: [ 'S', 'M', 'T', 'W', 'T', 'F', 'S' ],
	datasets: [
		{
			label: '# of Hits',
			data: [ 75, 115, 175, 125, 225, 200, 100 ],
			backgroundColor: '#7477BF',
			borderWidth: 1
		}
	]
};
const dailyOptions = {
	scales: {
		yAxes: [
			{
				ticks: {
					beginAtZero: false,
					stepSize: 50,
					suggestedMin: 50,
					suggestedMax: 250
				}
			}
		]
	},
	legend: {
		display: false
	}
};

let dailyChart = new Chart(dailyCanvas, {
	type: 'bar',
	data: dailyData,
	options: dailyOptions
});

// mobile users chart (doughnut)

const mobileCanvas = document.getElementById('mobile-chart');

const mobileData = {
	labels: [ 'Phones', 'Tablet', 'Desktop' ],
	datasets: [
		{
			label: '# of Users',
			data: [ 500, 550, 2000 ],
			borderWidth: 0,
			backgroundColor: [ '#51B6C8', '#78CF82', '#7477BF' ]
		}
	]
};

const mobileOptions = {
	legend: {
		position: 'right',
		labels: {
			boxWidth: 15,
			fontStyle: 'normal',
			fontSize: 18,
			padding: 20
		}
	}
};

let mobileChart = new Chart(mobileCanvas, {
	type: 'doughnut',
	data: mobileData,
	options: mobileOptions
});

/*
|--------------------------------------------------------------------------
| Message & Settings Sections
|--------------------------------------------------------------------------
|
|Control buttons (cancel) on settings section works to restore Message section as well.
|
*/

let messageSection = document.querySelector('.message');
let messageForm = document.getElementById('userForm');
let nameInput = document.getElementById('userField');
let textMessage = document.getElementById('messageField');
let sendBtn = document.getElementById('send');
let selectTimezone = document.getElementById('timezone');

sendBtn.addEventListener('click', function(event) {
	if (nameInput.value != '' && textMessage.value.length >= 1) {
		let confirmMsg = document.createElement('P');
		confirmMsg.innerText = 'Your message has been sent!';
		confirmMsg.className = 'confirmation';
		messageSection.appendChild(confirmMsg);
		messageForm.style.display = 'none';
	}

	if (nameInput.value === '') {
		event.preventDefault();
		nameInput.className = 'error';
		nameInput.placeholder = 'ERROR: Name Required';
	}
	else if (nameInput.value !== '') {
		nameInput.className = 'success';
	}

	if (textMessage.value.length == '') {
		event.preventDefault();
		textMessage.className = 'error';
		textMessage.placeholder = 'ERROR: Message required';
	}
	else if (textMessage.value.length !== '') {
		textMessage.className = 'success';
	}
});

function resetForm() {
	document.getElementById('userForm').reset();
	selectTimezone.selectedIndex = 0;
	textMessage.className = 'form-field';
	textMessage.placeholder = 'Message for user';
	nameInput.className = 'form-field';
	nameInput.placeholder = 'Search for user';
	document.getElementsByClassName('toggle')[0].checked = false;
	document.getElementsByClassName('toggle')[1].checked = false;
	messageForm.style.display = 'grid';
	let confirm = document.querySelector('.confirmation');
	messageSection.removeChild(confirm);
}

/*
|--------------------------------------------------------------------------
| Icon Notification Alert/Menu
|--------------------------------------------------------------------------
|
*/

let iconBell = document.querySelector('.login-bell');
let notificationDot = document.querySelector('.notifications');

function dropList() {
	document.querySelector('.notify-container').classList.toggle('show');
	notificationDot.style.display = 'none';
	alertBanner.style.visibility = 'hidden';
}

iconBell.addEventListener('click', function() {
	let notificationContainer = document.createElement('DIV');
	notificationContainer.className = 'notify-container';
	iconBell.appendChild(notificationContainer);

	for (let i = 1; i <= `${randomNumber}`; i++) {
		let link = document.createElement('A');
		link.className = 'drop-link';
		link.innerText = 'New Task';
		notificationContainer.appendChild(link);
	}

	dropList();
});

// this part doesn't work...going to continue trying things....
// if target clicked is not notificationContainer AND notificationContainer contains .show class
// remove .show class from notificationContainer

// document.addEventListener('click', (event) => {
// 	let notificationContainer = document.querySelector('.notify-container');
// 	let clicked = event.target;
// 	if (clicked !== notificationContainer  && notificationContainer.classList.contains('show')) {
// 		notificationContainer.classList.remove('show');
// 	}

// });

/*
|--------------------------------------------------------------------------
| Search Autocomplete
|--------------------------------------------------------------------------
|
*/

let memberNames = [
	{ name: 'Victoria Chambers' },
	{ name: 'Dale Byrd' },
	{ name: 'Dawn Wood' },
	{ name: 'Dan Oliver' }
];

let searchField = document.querySelector('#userField');
let suggestionsContainer = document.querySelector('.suggestions');

searchField.addEventListener('keyup', function() {
	let searchInput = searchField.value;
	suggestionsContainer.innerHTML = '';
	let suggestions = memberNames.filter(function(member) {
		return member.name.toLowerCase().startsWith(searchInput);
	});

	suggestions.forEach(function(suggested) {
		const nameSuggestion = document.createElement('A');
		nameSuggestion.innerHTML = suggested.name;
		suggestionsContainer.appendChild(nameSuggestion);
	});

	if (searchInput === '') {
		suggestionsContainer.innerHTML = '';
	}
});
