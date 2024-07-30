let original_data = [];
let search_data = [];

function clickalam(){
alert("알림 받기 완료!")
}

function clicklike(){
    alert("좋아요 완료!")
}

//커서 깜빡이는 기능 추가
const searchInput = document.querySelector("#searchbox");
searchInput.focus();


// function clickbtn(){
    //String.match(new RegExp(searchVariable, "i")); 대소문자 구분없는 코드
    // 1. 인풋창에 입력된 텍스트를 가져올것
    // 2. 대소문자를 전부 소문자로 바꿔서 검색 준비
    // 3, original_data에서 검색한 결과를 search_data filter 함수를 사용해서

const getInputValue = () => {
    // 1. 인풋창에 입력된 텍스트를 가져옴
    const query = document.getElementById("searchbox").value;

    //대문자도 모두 소문자로 구분
    const lowerCaseQuery = query.toLowerCase();
    // 3. original_data에서 검색한 결과를 search_data filter 함수를 사용해서 필터링
    search_data = original_data.filter(movie => movie.title.toLowerCase().includes(lowerCaseQuery));
    console.log(search_data)
    displayMovies();
};

// 특정 클래스 이름을 가진 모든 요소를 삭제하는 함수
const removeElementsByClass = (className) => {
    const elements = document.querySelectorAll(`.${className}`);
    elements.forEach(element => {
        element.remove();
    });
};

function displayMovies(){

    // const removeChildPostBox = document.getElementsByClassName("postbox");
    // removeChildPostBox.re
    removeElementsByClass("postbox")
      
       // 검색된 모든 영화를 화면에 그려줌
      for(let i=0; i<search_data.length; i++){
        const parentDiv = document.getElementById("postBoxtParent");
        console.log(search_data[i])


         // 새로 추가할 요소를 만들어줌
        const postbox = document.createElement("div");
        postbox.className = "postbox";

        const img = document.createElement("img");
        img.className = "childImg";
        img.src = "https://image.tmdb.org/t/p/w500" + search_data[i].poster_path;
        img.onclick = function(){
             alert("id= " + search_data[i].id)
        }
        // img.onclick = childImg()
        postbox.appendChild(img);

        const title = document.createElement("span");
        title.className = "childSpan";
        title.textContent = search_data[i].title
        postbox.appendChild(title);

        const description = document.createElement("p");
        description.className = "childP";
        description.textContent = search_data[i].overview;
        postbox.appendChild(description);

        const tags = document.createElement('p');
        tags.className = "childdate";
        tags.textContent = search_data[i].release_date;
        postbox.appendChild(tags);

           // 새로 만든 요소를 화면에 추가
        parentDiv.appendChild(postbox);
        
        
    }
}


window.onload = function() {
    console.log("...")
        const options = {
        method: "GET",
        headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMDM0YmQ0YjdiMTY0MDI4MmIzYTMwNWQ2ZTk4ZjhkMyIsIm5iZiI6MTcyMjE3MTUxNy45MzQ2NTgsInN1YiI6IjY2YTYzZWM3N2NlMWExNjM4YTYwMzUzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.inp6mZsQrRhtx3qJRuT79ooWvuiCLodsBGRV6HnXacw"
        }
    };
  
    fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options)
    .then(response => response.json())
    .then(response => {
        console.log(response.results)
        original_data = response.results;    
        search_data = response.results;


        // const data = response.results;
        for(let i=0; i<search_data.length; i++){
            const parentDiv = document.getElementById("postBoxtParent");


            const postbox = document.createElement("div");
            postbox.className = "postbox";

            const img = document.createElement("img");
            img.className = "childImg";
            img.src = "https://image.tmdb.org/t/p/w500" + search_data[i].poster_path;
            img.onclick = function(){
                 alert("id= " + search_data[i].id)
            }
            // img.onclick = childImg()
            postbox.appendChild(img);

            const title = document.createElement("span");
            title.className = "childSpan";
            title.textContent = search_data[i].title
            postbox.appendChild(title);

            const description = document.createElement("p");
            description.className = "childP";
            description.textContent = search_data[i].overview;
            postbox.appendChild(description);

            const tags = document.createElement("p");
            tags.className = "childdate";
            tags.textContent = search_data[i].release_date; 
            postbox.appendChild(tags);

            parentDiv.appendChild(postbox);
            
            
        }
    })
    .catch(err => console.error(err));
}
