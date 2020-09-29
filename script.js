var titleBox = document.getElementById('add-title');
var descBox = document.getElementById('add-desc');
var buttonDiv = document.getElementById('button-div');
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

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});




function onLoad(){
	var loginRespnse = fetch(`https://flutter.smarttersstudio.com/test/profile.php?id=209`);
}

