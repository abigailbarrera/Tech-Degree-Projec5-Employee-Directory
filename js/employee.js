let employees = [];


function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


function addEmployees(employees) {
	var directoryHTML = '<ul class="directory">';
	$.each( employees, function(i, employee) {
		var firstName = capitalize(employee.name.first);
		var lastName = capitalize(employee.name.last);
		var city = capitalize(employee.location.city);
		directoryHTML += '<li id=" '+ i + ' ">';
		directoryHTML += '<a><img src=" ' + employee.picture.large + ' "></a>';
		directoryHTML += '<p><strong>' + firstName + ' ' + lastName + '</strong><br>';
		directoryHTML += employee.email + '<br>';
		directoryHTML += city + '</p></li>';
	});
	directoryHTML += '</ul>';
	$('#employee-directory').html(directoryHTML);
}


 function employeeClickEvent() {
   $('li').click(function() {
     var id = $(this).attr('id');
     var idNumber = parseInt(id, 10);
     employeeModal(idNumber);
   })
 }

 function formatDateOfBirth(string) {
 	var date = new Date(Date.parse(string));
 	var month = date.getMonth() + 1;
 	var day = date.getDate();
 	var year = date.getYear();
 	var dateOfBirth = month + '/' + day + '/' + year;
 	return dateOfBirth;
 }

 function formatAddress(employee) {
 	var city = capitalize(employee.location.city);
 	var state = capitalize(employee.location.state);
 	let address = employee.location.street + '<br>';
 	address += city + ', ' + state;
 	address += ', ' + employee.location.postcode + ', ';
 	address += employee.nat + '<br>';
 	return address;
 }

function employeeModal(index) {
	let employee = employees[index];
	var firstName = capitalize(employee.name.first);
  	var lastName = capitalize(employee.name.last);
	let adress = formatAddress(employee);
	var dateOfBirth = formatDateOfBirth(employee.dob);
	let modalContent = '<div class="modal-content">';
	modalContent += '<span class="close">&times;</span>';
	modalContent += '<img src="' + employee.picture.large + ' ">';
	modalContent += '<p><strong>' + firstName + ' ' + lastName + '</strong><br>';
	modalContent += '<br>' + employee.login.username + '<br>' + employee.email + '<br>';
	modalContent += '<br><hr><br>' + employee.cell + '<br><br>';
	modalContent += adress + '<br>';
	modalContent += 'Birthday: ' + dateOfBirth + '</p>';
	modalContent += '<span class="buttons">';
	modalContent += '<button class="back">Back</button>';
	modalContent += '<button class="next">Next</button></span>';
	modalContent += '</div>';
	$('#employee-modal').append(modalContent);
	$('.modal').css('display', 'block');
	modalEventListener(index);
}

function modalEventListener(idNumber) {
	$('.close').click(function() {
		$('.modal').css('display', 'none');
		$('.modal-content').remove();
	})

	$('.back').click(function() {
		var last = idNumber - 1;
		if (idNumber > 0 ) {
			$('.modal-content').remove();
			employeeModal(last);
		}
	})

	$('.next').click(function() {
		var next = idNumber + 1;
		if (idNumber < 11) {
			$('.modal-content').remove();
			employeeModal(next);
		}
	})
}

function employeeSearch(input) {
	let searchContent = input.toLowerCase();
	var $employees = $('p:contains(' + searchContent + ')').closest('li');
	$('li').hide();
	$employees.show();
}

$('#search').keyup(function() {
	let searchContent = $('#search').val();
	employeeSearch(searchContent);
})

$.ajax({
	url: 'https://randomuser.me/api/?results=12&nat=us',
	dataType: 'json',
	success: function(data) {
		employees = data.results;
		addEmployees(employees);
		employeeClickEvent();
	}
});
