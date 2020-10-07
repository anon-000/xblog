var titleBox = document.getElementById('add-title');
var descBox = document.getElementById('add-desc');
var buttonDiv = document.getElementById('button-div');
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
var loginMailField = document.getElementById('login-mail');
var loginPasswordField = document.getElementById('login-password');
var loginButtonDiv = document.getElementById('login-button');
var signUpButtonDiv = document.getElementById('signup-button');
var signUpNameField = document.getElementById('signup-name');
var signUpEmailField = document.getElementById('signup-mail');
var signupPasswordField = document.getElementById('signup-password');
var signupPhoneField = document.getElementById('signup-phone');
var genderRadioButtons = document.getElementsByName("gender");



function onLoad(){
	var data = localStorage.getItem('userResponse');
	if(data){
		var userResponse = JSON.parse(data.toString());
		if(userResponse.accessToken != ''){
		//    window.location.assign('my_posts.html'); 
		}
	}
}

var col = 1;
var ro = 1;
var column = 1;
var row = 1;

function goBack() {
	window.history.back();
  }

function timeAgo( previous) {
	var current = Date.now();
	var msPerMinute = 60 * 1000;
	var msPerHour = msPerMinute * 60;
	var msPerDay = msPerHour * 24;
	var msPerMonth = msPerDay * 30;
	var msPerYear = msPerDay * 365;
	const prev = new Date(previous).getTime();
	var elapsed = current - prev;


	if (elapsed < msPerMinute) {
		return Math.round(elapsed/1000) + ' seconds ago';   
	}

	else if (elapsed < msPerHour) {
		return Math.round(elapsed/msPerMinute) + ' minutes ago';   
	}

	else if (elapsed < msPerDay ) {
		return Math.round(elapsed/msPerHour ) + ' hours ago';   
	}

	else if (elapsed < msPerMonth) {
		return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
	}

	else if (elapsed < msPerYear) {
		return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
	}

	else {
		return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
	}
	}

	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	  }

function onPostsLoad(){
	console.log('load shimmer');
	var postBody = document.getElementById('posts');
	var postLayout = '';
	[0,1,2,3,5,6,7,8,9,10,11,12,].forEach((element, i)=>{
		postLayout += `<div id="shimmer" class="shine" style="grid-row: ${ro}; grid-column:${col}>
		<box class="shine" ></box>
		</div>`;
		if ((i + 1) % 4 == 0) {
			col = 1;
			ro++;
		 } else col++;
		 postBody.innerHTML = postLayout;
	});

	fetch(`https://flutter.smarttersstudio.com/test/getAllPosts.php?id=209`)
            .then(
                (res) => {
                    res.text().then(
                        response => {
                            var data = JSON.parse(response);
                            postLayout = '';
                            for (let i = 0; i < data.length; i++) {
								var {title, name, description, timestamp} = data[i];
								var tempString = description.length > 220 ? description.substring(0,220)+'...' : description;
								postLayout += `<div id="post-card" style="grid-row: ${row}; grid-column:${column}; overflow: hidden; padding:0px; margin: 20px 30px;">
								  <div style="display:flex; flex-direction:column;">
									<div id="row">
									<div id="row" class="name-row">
									<img class="avatar" src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" >
										<h2 id="name-text">${name}</br> <span style="font-size: 10px; font-family: monospace; ">|| Blogger at xBlog ||</span></h2>
										</div>
									</div>
									<div id="content" >
										<h2 id="title-text">${title}</h2>
									<p id="time-text">${timeAgo(timestamp)}</p>
									<p id="desc-text">${tempString}</p>
									</div>
								  </div>
								</div>`;
									if ((i + 1) % 4 == 0) {
										column = 1;
										row++;
									 } else column++;
								// await sleep(100);
								}
								postBody.innerHTML = postLayout;
                        }
                    )
                }
            ).catch(
                e => body.innerHTML = e.toString()
            )
}


function onProfileLoad(){
	var nameBody = document.getElementById('name');
	var genderBody = document.getElementById('gender');
	var emailBody = document.getElementById('mail');
	var numberBody = document.getElementById('phone');

	var loginRespnse = fetch(`https://flutter.smarttersstudio.com/test/profile.php?id=209`);

	loginRespnse.then(response=>{
		response.text().then(
			text => {
				var jsonFormattedData = JSON.parse(text);
				var {name , email , phone, gender} = jsonFormattedData ;
				nameBody.innerHTML = name;
				genderBody.innerHTML = gender==1 ? 'Male' : gender==2 ?'Female' :'Others'; 
				emailBody.innerHTML = email;
				numberBody.innerHTML = phone;
			}
		)
	}).catch(
		error=>{

		}
	).finally(()=>{

	});
}


function uploadPost(){
	var title = titleBox.value;
	var description = descBox.value;
	if(title === ''){

	}else if(description === ''){

	}else{
		buttonDiv.innerHTML = `<div class="loader"></div>`;
		fetch(`https://flutter.smarttersstudio.com/test/addPost.php?id=209&title=${title}&body=${description}`)
                    .then(
                        e => {
                            console.log('Post added Successfully');
                        }
                    ).finally(
                        ()=> buttonDiv.innerHTML = `<button id="post-submit" onclick="uploadPost()">Submit</button>`
                    );
	}
	
}


function login(){
	var mail = loginMailField.value;
	var password = loginPasswordField.value;
	if(mail === ''){

	}else if(password === ''){

	}else{
		loginButtonDiv.innerHTML = `<div class="loader"></div>`;
		var loginResponse = axios.post('http://localhost:3030/authentication', {
			"strategy":"local",
			"email": mail,
			"password": password
		});
		loginResponse.then(response=>{
			console.log(response);
			var {data : {accessToken, user}} = response ;
			console.log("accesstoken :", accessToken);
			localStorage.setItem('userResponse', JSON.stringify(response.data));
			window.location.assign('my_posts.html');
			// response.text().then(
			// 	text => {
			// 		console.log("success");
			// 		var jsonFormattedData = JSON.parse(text);
			// 		console.log(jsonFormattedData);
			// 		var {result , reason , id} = jsonFormattedData ; 
			// 		console.log("success");
			// 		if(result){
			// 			localStorage.setItem('userId',id);
			// 			window.location.assign('my_posts.html');
			// 		}else{
			// 			console.log('errrrr');
			// 		}
			// 	}
			// )
		}).catch(error=>{
			console.log('login error',error);
		}).finally(()=>{
			loginButtonDiv.innerHTML = `<button onclick="login()">Sign In</button>`;
		});
	}
}

function onSignUp(){
	var name = signUpNameField.value;
	var mail = signUpEmailField.value;
	var password = signupPasswordField.value;
	var phone = signupPhoneField.value;
	var gender ;
    genderRadioButtons.forEach((radioButton) =>{
        if(radioButton.checked)
            gender = radioButton.value;
	});
	console.log("sign up func");
	console.log(name,mail,password,phone, gender);
	if (name === '') {
		
	}else if (mail === '') {
		
	}else if (password === '') {
		
	}else if (phone === '') {
		
	}else if (!gender) {
		
	}else{
		signUpButtonDiv.innerHTML = `<div class="loader"></div>`;
		
		var signUpResponse = axios.post('http://localhost:3030/user', {
			"name": name,
			"email": mail,
			"password": password,
			"phone": phone,
			"gender": gender
		});
		signUpResponse.then(response=>{
			console.log("sign up sucessfull.");
			console.log(response);
			var {data : {accessToken}} = response ;
			console.log("accesstoken :", accessToken);
			localStorage.setItem('userResponse', JSON.stringify(data));
			window.location.assign('my_posts.html');
		}).catch(error=>{
			console.log('sign up error',error, error.message);
		}).finally(()=>{
			signUpButtonDiv.innerHTML = `<button onclick="signUp()">Sign Up</button>`;
		});

	}
}



signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});




function ongLoad(){
	var loginRespnse = fetch(`https://flutter.smarttersstudio.com/test/profile.php?id=209`);
}
